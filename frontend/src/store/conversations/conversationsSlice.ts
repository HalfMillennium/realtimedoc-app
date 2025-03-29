import { useAuth } from '@clerk/clerk-react';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  conversationsMapFromArray
} from '@/pages/researcher/components/utils';
import { setToken } from '../user/userSlice';
import { setError } from '../error/errorSlice';
import { getQuotaDetails } from '../quota/quotaSlice';

const EXPRESS_API_URL = import.meta.env.EXPRESS_API_URL;

export interface Message {
  id: string;
  userName: string;
  content: string;
  timestamp: string;
  tag?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export interface ConversationMap {
  [key: string]: Conversation;
}

export const uploadFileAndCreateConversation = createAsyncThunk<
  any,
  { authToken: string; formData: FormData; userId: string; }
>(
  'conversations/uploadFileAndCreateConversation',
  async ({ authToken, formData, userId }, thunkAPI) => {
    const response = await fetch(`${EXPRESS_API_URL}/api/create-convo/${userId}`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
        mode: 'cors',
      },
    }).catch((error) => console.error('Failed to uploadFileAndCreateConversation:', error));
    if (!!response) {
      const result = await response.text();
      thunkAPI.dispatch(getQuotaDetails({ userId }));
      if(!!JSON.parse(result).error) {
        thunkAPI.dispatch(setError({
          errorTitle: 'Failed to create conversation', errorMessage: result
        }));
        thunkAPI.dispatch(setIsDailyLimitExceeded(true));
      } else {
        console.log('type of result:', typeof result);
      }
      return result;
    }
  }
);

export const getNewChatResponse = createAsyncThunk<
  any,
  {
    authToken: string;
    conversationId: string;
    message: string;
    selectedDataSetId: string | undefined;
  }
>(
  'conversations/getNewChatResponse',
  async ({ authToken, conversationId, message, selectedDataSetId }, thunkAPI) => {
    console.log('selectedDataSetId passed to API:', selectedDataSetId);
    const response = await fetch(`${EXPRESS_API_URL}/api/new-message/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify({
        queryText: message,
        dataSetId: selectedDataSetId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        mode: 'cors',
      },
    }).catch((error) => console.error('Failed to getNewChatResponse:', error));
    try {
      let result = response!.text();
      return result
    } catch(error) {
      console.error('Failed to parse get new chat conversations response:', error);
      return 
    }
  }
);

export const loadUserConversations = createAsyncThunk<
  any,
  {
    authToken: string;
    userId: string;
  }
>(
  'conversations/loadUserConversations',
  async ({ authToken, userId }, thunkAPI) => {
    const response = await fetch(`${EXPRESS_API_URL}/api/conversations/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        mode: 'cors',
      }
    }).catch((error) => console.error('Failed to load user conversations:', error));
    try {
      let result = response!.text();
      return result
    } catch(error) {
      thunkAPI.dispatch(setError({
        errorTitle: 'Failed to load conversations', errorMessage: error?.toString()
      }));
      console.error('Failed to parse load user conversations response:', error);
      return 
    }
  }
);

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    conversations: {} as ConversationMap,
    currentConversation: null as Conversation | null,
    isLoadingNewMessage: false,
    isLoadingNewConversation: false,
    hasFailedToLoadNewMessage: false,
    isDailyLimitExceeded: false,
  },
  reducers: {
    updateConversation: (
      state,
      action: PayloadAction<{ conversationId: string; message: Message }>
    ) => {
      if (!!state.conversations) {
        const conversation: Conversation = state.conversations[action.payload.conversationId];
        if (conversation?.messages) {
          conversation.messages.push(action.payload.message);
          return;
        }
        conversation.messages = [action.payload.message];
      } else {
        console.error('Could not update conversation - No conversations found');
      }
    },
    setIsDailyLimitExceeded: (state, action: PayloadAction<boolean>) => {
      state.isDailyLimitExceeded = action.payload;
    },
    setCurrentConversation: (state, action: PayloadAction<{ conversationId: string }>) => {
      if (!!state.conversations) {
        const conversation = state.conversations[action.payload.conversationId];
        if (conversation) {
          state.currentConversation = conversation;
        }
      } else {
        console.error('Could not set current conversation - No conversations found');
      }
    },
    deleteConversation: (state, action: PayloadAction<{ conversationId: string }>) => {
      if (!!state.conversations) {
        delete state.conversations[action.payload.conversationId];
      } else {
        console.error('Could not delete conversation - No conversations found');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadFileAndCreateConversation.pending, (state) => {
      state.isLoadingNewConversation = true;
    }),
      builder.addCase(uploadFileAndCreateConversation.fulfilled, (state, action) => {
        const payloadResponse = JSON.parse(JSON.parse(JSON.parse(action.payload)));
        if (payloadResponse.message.includes("'daily_limit_remaining': 'None'")) {
          state.isLoadingNewConversation = false;
          state.isDailyLimitExceeded = true;
          return;
        }
        state.isDailyLimitExceeded = false;
        if(!!state.conversations && state.conversations !== undefined) {
          const conversationId = payloadResponse.conversation_id;
          state.conversations[payloadResponse.conversation_id] = {
            id: conversationId,
            title: payloadResponse.conversation_title,
            messages: [
              {
                id: Math.random().toString(16).slice(2),
                userName: 'RealTimeDoc AI',
                content: payloadResponse.message,
                timestamp: new Date().toLocaleTimeString(),
              },
            ],
          };
          state.currentConversation = state.conversations[payloadResponse.conversation_id];
        } else {
          console.log('Could not create new conversation - No conversations found');
        }
        state.isLoadingNewConversation = false;
      }),
      builder.addCase(getNewChatResponse.pending, (state) => {
        state.hasFailedToLoadNewMessage = false;
        state.isLoadingNewMessage = true;
      }),
      builder.addCase(getNewChatResponse.rejected, (state) => {
        state.isLoadingNewMessage = false;
        state.hasFailedToLoadNewMessage = true;
      }),
      builder.addCase(getNewChatResponse.fulfilled, (state, action) => {
        if (typeof action.payload === 'string' && action.payload.charAt(0) === '<') {
          getNewChatResponse(action.meta.arg);
          return;
        }
        const payloadResponse = JSON.parse(JSON.parse(JSON.parse(action.payload)));
        const newMessage: Message = {
          id: Math.random().toString(16).slice(2),
          userName: 'RealTimeDoc AI',
          content: payloadResponse.message,
          timestamp: new Date().toLocaleTimeString(),
          tag: 'Doc Bot Message',
        };
        state.isLoadingNewMessage = false;
        state.conversations[payloadResponse.conversation_id].messages.push(newMessage);
        state.currentConversation = state.conversations[payloadResponse.conversation_id];
      }),
      builder.addCase(loadUserConversations.fulfilled, (state, action) => {
        const payloadResponse = JSON.parse(JSON.parse(action.payload));
        state.isDailyLimitExceeded = false;
        if (!!payloadResponse && typeof payloadResponse !== 'string') {
          let camelCasedPayload = toCamelCase(payloadResponse);
          let cleanedConversations = []
          for(const convo of camelCasedPayload) {
            cleanedConversations.push({
              ...convo,
              messages: convo.messages.map((msg: any[]) => {
                return {
                  id: msg[0],
                  content: msg[1],
                  userId: msg[2],
                  userName: msg[3],
                  timestamp: msg[4],
                  metadata: msg[msg.length - 1],
                  tag: msg[3] === 'RealTimeDoc AI' ? 'Doc Bot Message' : undefined,
                }
              })
            })
          }
          state.conversations = conversationsMapFromArray(cleanedConversations);
          state.currentConversation = cleanedConversations[0];
        }
      });
  },
});

function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
}

// Action creators are generated for each case reducer function
export const { updateConversation, setCurrentConversation, deleteConversation, setIsDailyLimitExceeded } =
  conversationsSlice.actions;

export const conversationsReducer = conversationsSlice.reducer;
