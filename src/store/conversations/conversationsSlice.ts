import { useAuth } from '@clerk/clerk-react';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EXAMPLE_CONVERSATIONS,
  EXAMPLE_CONVERSATIONS_MAP,
} from '@/pages/researcher/components/utils';
import { setToken } from '../user/userSlice';

export interface Message {
  id: string;
  author: string;
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
      return response.json();
    }
  }
);

export const getNewChatResponse = createAsyncThunk<
  any,
  {
    authToken: string;
    conversationId: string;
    message: string;
    selectedDatasetName: string | undefined;
  }
>(
  'conversations/getNewChatResponse',
  async ({ authToken, conversationId, message, selectedDatasetName }, thunkAPI) => {
    const response = await fetch(`/api/new-message/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify({
        queryText: message,
        datasetName: selectedDatasetName,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        mode: 'cors',
      },
    }).catch((error) => console.error('Failed to getNewChatResponse:', error));
    if (!!response) {
      return response.json();
    }
  }
);

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    conversations: {} as ConversationMap,
    currentConversation: {} as Conversation,
    isLoadingNewMessage: false,
    isLoadingNewConversation: false,
  },
  reducers: {
    updateConversation: (
      state,
      action: PayloadAction<{ conversationId: string; message: Message }>
    ) => {
      const conversation = state.conversations[action.payload.conversationId];
      if (conversation) {
        if (!!conversation.messages) {
          conversation.messages.push(action.payload.message);
          return;
        }
        conversation['messages'] = [action.payload.message];
      }
    },
    setCurrentConversation: (state, action: PayloadAction<{ conversationId: string }>) => {
      const conversation = state.conversations[action.payload.conversationId];
      if (conversation) {
        state.currentConversation = conversation;
      }
    },
    deleteConversation: (state, action: PayloadAction<{ conversationId: string }>) => {
      delete state.conversations[action.payload.conversationId];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadFileAndCreateConversation.pending, (state) => {
      state.isLoadingNewConversation = true;
    }),
      builder.addCase(uploadFileAndCreateConversation.fulfilled, (state, action) => {
        // Add user to the state array
        state.conversations[action.payload.conversationId] = {
          id: action.payload.conversationId,
          title: action.payload.conversationTitle,
          embeddingId: action.payload.embeddingId,
          messages: [
            {
              id: Math.random().toString(16).slice(2),
              author: 'RealTimeDoc AI',
              content: action.payload.message,
              timestamp: new Date().toLocaleTimeString(),
            },
          ],
        };
        state.isLoadingNewConversation = false;
        state.currentConversation = state.conversations[action.payload.conversationId];
      }),
      builder.addCase(getNewChatResponse.pending, (state) => {
        state.isLoadingNewMessage = true;
      }),
      builder.addCase(getNewChatResponse.fulfilled, (state, action) => {
        const payloadResponse = JSON.parse(action.payload);
        const newMessage: Message = {
          id: Math.random().toString(16).slice(2),
          author: 'RealTimeDoc AI',
          content: payloadResponse.message,
          timestamp: new Date().toLocaleTimeString(),
          tag: 'Doc Bot Message',
        };
        state.isLoadingNewMessage = false;
        console.log('Currenct conversationId:', payloadResponse.conversationId);
        state.conversations[payloadResponse.conversationId].messages.push(newMessage);
        state.currentConversation = state.conversations[payloadResponse.conversationId];
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateConversation, setCurrentConversation, deleteConversation } =
  conversationsSlice.actions;

export const conversationsReducer = conversationsSlice.reducer;
