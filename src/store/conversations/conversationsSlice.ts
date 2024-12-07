import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { createAction } from '@reduxjs/toolkit';

// Remove the duplicate declaration of 'updateConversation'
export const setCurrentConversation = createAction<{ conversationId: string }>('conversations/setCurrentConversation');
export const deleteConversation = createAction<{ conversationId: string }>('conversations/deleteConversation');


export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  embeddingId: string;
  messages: Message[];
}

export const uploadFileAndCreateConversation = createAsyncThunk(
    'conversations/uploadFileAndCreateConversation',
    async (formData: FormData, thunkAPI) => {
      const response = await fetch('http://localhost:8000/create-convo', {
        method: 'POST',
        body: formData,
      })
      .catch((error) => console.error('Error:', error))
      if(!!response) {
        return response.json();
      }
    },
  )

export const conversationsSlice = createSlice({
    name: 'counter',
    initialState: {
        conversations: new Map<string, Conversation>(),
        currentConversation: {} as Conversation,
    },
    reducers: {
        updateConversation: (state, action: PayloadAction<{ conversationId: string, message: Message }>) => {
            const conversation = state.conversations.get(action.payload.conversationId);
            if (conversation) {
                conversation.messages.push(action.payload.message);
            }
        },
        setCurrentConversation: (state, action: PayloadAction<{ conversationId: string }>) => {  
            const conversation = state.conversations.get(action.payload.conversationId);
            if (conversation) {
                state.currentConversation = conversation;
            }
        },
        deleteConversation: (state, action: PayloadAction<{ conversationId: string }>) => {
            state.conversations.delete(action.payload.conversationId);
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(uploadFileAndCreateConversation.fulfilled, (state, action) => {
          // Add user to the state array
          state.conversations.set(action.payload.id, action.payload);
        })
    },
});

// Action creators are generated for each case reducer function
export const { updateConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
