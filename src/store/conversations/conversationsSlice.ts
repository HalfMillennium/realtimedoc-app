import { useAuth } from '@clerk/clerk-react';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EXAMPLE_CONVERSATIONS,
  EXAMPLE_CONVERSATIONS_MAP,
} from '@/pages/researcher/components/utils';
import { setToken } from '../user/userSlice';

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
  embeddingId: string;
  messages: Message[];
}

export interface ConversationMap {
  [key: string]: Conversation;
}

export const uploadFileAndCreateConversation = createAsyncThunk<
  any,
  { authToken: string; formData: FormData; userId: string }
>(
  'conversations/uploadFileAndCreateConversation',
  async ({ authToken, formData, userId }, thunkAPI) => {
    const response = await fetch(`/api/create-convo/${userId}`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
        mode: 'cors',
      },
    }).catch((error) => console.error('Failed to uploadFileAndCreateConversation:', error));
    if (!!response) {
      return await response.text();
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
    const response = await fetch(`/api/new-message/${conversationId}`, {
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
    if (!!response) {
      return await response.text();
    }
  }
);

export const loadUserConversations = createAsyncThunk<
  any,
  {
    authToken: string;
    conversationId: string;
    message: string;
    selectedDataSetId: string | undefined;
  }
>(
  'conversations/loadUserConversations',
  async ({ authToken, conversationId, message, selectedDataSetId }, thunkAPI) => {
    const response = await fetch(`/api/new-message/${conversationId}`, {
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
    if (!!response) {
      return response.text();
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
          state.conversations[payloadResponse.conversationId] = {
            id: payloadResponse.conversationId,
            title: payloadResponse.conversationTitle,
            embeddingId: payloadResponse.embeddingId,
            messages: [
              {
                id: Math.random().toString(16).slice(2),
                userName: 'RealTimeDoc AI',
                content: payloadResponse.message,
                timestamp: new Date().toLocaleTimeString(),
              },
            ],
          };
          state.isLoadingNewConversation = false;
          state.currentConversation = state.conversations[payloadResponse.conversationId];
        }
      }),
      builder.addCase(getNewChatResponse.pending, (state) => {
        state.isLoadingNewMessage = true;
      }),
      builder.addCase(getNewChatResponse.fulfilled, (state, action) => {
        if (typeof action.payload === 'string' && action.payload.charAt(0) === '<') {
          // Token may have expired, so we need to refresh it
          getNewChatResponse(action.meta.arg);
          return;
        } else {
          console.log(`PAYLOAD PRECISE: ||${action.payload}`);
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
        console.log('Current conversation:', state.conversations[payloadResponse.conversationId]);
        state.conversations[payloadResponse.conversationId].messages.push(newMessage);
        state.currentConversation = state.conversations[payloadResponse.conversationId];
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateConversation, setCurrentConversation, deleteConversation } =
  conversationsSlice.actions;

export const conversationsReducer = conversationsSlice.reducer;
