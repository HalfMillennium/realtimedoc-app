import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Stripe from 'stripe';
import { setError } from '../error/errorSlice';
import { LoadingStatus } from '../utils';

export const STRIPE_PRODUCT_IDS = {
  RESEARCHER_LITE: 'prod_RYxGo5f1mjy7Q6',
  RESEARCHER_PRO: 'prod_RYxJXeQ0LKIXLb',
};

export const getSubscriptionType = (subscription: Stripe.Subscription|undefined) => {
  return subscription?.items.data[0].plan.product;
}

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

export const cancelSubscription = createAsyncThunk<any, { subscriptionId: string, authToken: string }>(
  'subscriptions/cancelSubscription',
  async ({ subscriptionId, authToken }, thunkAPI) => {
    console.log('reached cancelSubscription thunk');
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
          mode: 'cors',
        },
      });
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
    cancelSubscriptionStatus: LoadingStatus.IDLE,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserSubscriptions.fulfilled, (state, action) => {
      state.subscriptions = JSON.parse(action.payload.userSubscriptions);
    });
    builder.addCase(cancelSubscription.pending, (state) => {
      state.cancelSubscriptionStatus = LoadingStatus.LOADING;
    });
    builder.addCase(cancelSubscription.fulfilled, (state, action) => {
      state.subscriptions = state.subscriptions.filter((subscription) => subscription.id !== action.meta.arg.subscriptionId);
      state.cancelSubscriptionStatus = LoadingStatus.SUCCEEDED;
    });
    builder.addCase(cancelSubscription.rejected, (state) => {
      state.cancelSubscriptionStatus = LoadingStatus.FAILED;
    });
  },
});

export const subscriptionsReducer = subscriptionsSlice.reducer;
