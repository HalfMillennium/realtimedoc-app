import { configureStore } from '@reduxjs/toolkit';
import { Conversation, conversationsReducer } from './conversations/conversationsSlice';
import { datasetsReducer } from './datasets/datasetsSlice';
import { membershipReducer } from './membership/membershipSlice';
import { userReducer } from './user/userSlice';

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    membership: membershipReducer,
    user: userReducer,
    datasets: datasetsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
