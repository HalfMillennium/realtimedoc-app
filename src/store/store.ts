import { configureStore } from '@reduxjs/toolkit';
import { Conversation, conversationsReducer } from './conversations/conversationsSlice';
import { membershipReducer } from './membership/membershipSlice';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    membership: membershipReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
