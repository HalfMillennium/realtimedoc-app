import { configureStore } from '@reduxjs/toolkit';
import { Conversation, conversationsReducer } from './conversations/conversationsSlice';
import { dataSetsReducer } from './datasets/dataSetsSlice';
import { homePageActivityReducer } from './homePageActivity/homePageActivitySlice';
import { userReducer } from './user/userSlice';
import { subscriptionsReducer } from './subscriptions/subscriptionsSlice';
import { quotaReducer } from './quota/quotaSlice';

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    user: userReducer,
    subscriptions: subscriptionsReducer,
    dataSets: dataSetsReducer,
    homePageActivity: homePageActivityReducer,
    quotas: quotaReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
