import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EXAMPLE_CONVERSATIONS,
  EXAMPLE_CONVERSATIONS_MAP,
} from '@/pages/researcher/components/utils';

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

export const uploadFileAndCreateConversation = createAsyncThunk(
  'conversations/uploadFileAndCreateConversation',
  async (formData: FormData, thunkAPI) => {
    const response = await fetch('http://localhost:8000/create-convo', {
      method: 'POST',
      body: formData,
    }).catch((error) => console.error('Error:', error));
    if (!!response) {
      return response.json();
    }
  }
);

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    conversations: EXAMPLE_CONVERSATIONS_MAP,
    currentConversation: EXAMPLE_CONVERSATIONS[0],
  },
  reducers: {
    updateConversation: (
      state,
      action: PayloadAction<{ conversationId: string; message: Message }>
    ) => {
      const conversation = state.conversations[action.payload.conversationId];
      if (conversation) {
        conversation.messages.push(action.payload.message);
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
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(uploadFileAndCreateConversation.fulfilled, (state, action) => {
      // Add user to the state array
      state.conversations[action.payload.conversationId] = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateConversation, setCurrentConversation, deleteConversation } =
  conversationsSlice.actions;

export const conversationsReducer = conversationsSlice.reducer;
