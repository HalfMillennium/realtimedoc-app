import { configureStore } from '@reduxjs/toolkit';
import { Conversation, conversationsReducer } from './conversations/conversationsSlice';
import { dataSetsReducer } from './datasets/dataSetsSlice';
import { homePageActivityReducer } from './homePageActivity/homePageActivitySlice';
import { membershipReducer } from './membership/membershipSlice';
import { userReducer } from './user/userSlice';

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    membership: membershipReducer,
    user: userReducer,
    dataSets: dataSetsReducer,
    homePageActivity: homePageActivityReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
