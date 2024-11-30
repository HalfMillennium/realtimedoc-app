import { createSlice } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  text: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  messages: Message[];
}

export const conversationsSlice = createSlice({
    name: 'counter',
    initialState: {
        conversations: new Map<string, Conversation>(),
    },
    reducers: {
        createConversation: (state, action) => {
            // TODO: Async create & save embedding from uploaded file
            state.conversations.set(action.payload.id, action.payload.message);
        },
        updateConversation: (state, action) => {
            const conversation = state.conversations.get(action.payload.conversationId);
            if (conversation) {
                conversation.messages.push(action.payload.message);
            }
        },
        deleteConversation: (state, action) => {
            state.conversations.delete(action.payload.conversationId);
        },
    },
});

// Action creators are generated for each case reducer function
export const { createConversation, updateConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
