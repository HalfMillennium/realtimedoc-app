import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Stripe from 'stripe';
import { setError } from '../error/errorSlice';

export const STRIPE_PRODUCT_IDS = {
  RESEARCHER_LITE: 'prod_RYxGo5f1mjy7Q6',
  RESEARCHER_PRO: 'prod_RYxJXeQ0LKIXLb',
};

export const getUserSubscriptions = createAsyncThunk<any, { userEmail: string }>(
  'subscriptions/getUserSubscription',
  async ({ userEmail }, thunkAPI) => {
    try {
      const response = await fetch(`/api/subscriptions/${userEmail}`);
      const userSubscriptions = await response.json();
      return userSubscriptions;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          errorTitle: 'Failed to get user subscriptions',
          errorMessage: error?.toString(),
        })
      );
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptions: [] as Stripe.Subscription[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserSubscriptions.fulfilled, (state, action) => {
      state.subscriptions = JSON.parse(action.payload.userSubscriptions);
    });
  },
});

export const subscriptionsReducer = subscriptionsSlice.reducer;
