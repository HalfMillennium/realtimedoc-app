import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MembershipType } from "../membership/membershipSlice";
import { createSlice} from '@reduxjs/toolkit';

export const getUserSubscriptions = createAsyncThunk(
  'subscriptions/getUserSubscription',
  async (userId: string, thunkAPI) => {
    try {
      const subscriptions = await fetch(`/api/subscriptions/${userId}`);
      return subscriptions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState: {
        stripeCustomerId: undefined as string | undefined,
        subscriptionTier: MembershipType.BASIC
    },
    reducers: {
        setCustomerId: (state, action: PayloadAction<{customerId: string}>) => {
            state.stripeCustomerId = action.payload.customerId;
        },
        updateSubscriptionTier: (state, action: PayloadAction<{subscriptionTier: MembershipType}>) => {
            state.subscriptionTier = action.payload.subscriptionTier;
        }
    }
});

export const subscriptionsReducer = subscriptionsSlice.reducer;
export const { setCustomerId, updateSubscriptionTier } = subscriptionsSlice.actions;