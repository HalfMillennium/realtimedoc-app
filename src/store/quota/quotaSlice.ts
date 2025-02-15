import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setError } from '../error/errorSlice';

interface QuotaState {
    admission_date: string;
    daily_counter: number;
    daily_max: number;
}

export const getQuotaDetails = createAsyncThunk<any, { userId: string }>(
    'quotas/getQuotaDetails',
    async ({ userId }, thunkAPI) => {
        try {
            const response = await fetch(`/api/quotas/${userId}`);
            const userQuotas = await response.json();
            console.log(`userQuotas ${JSON.stringify(userQuotas)}`);
            return userQuotas;
        } catch (error) {
            console.log(`Get quota details error ${error}`);
            thunkAPI.dispatch(
                setError({
                    errorTitle: 'Failed to get user quotas',
                    errorMessage: error?.toString(),
                })
            );
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const quotaSlice = createSlice({
    name: 'quotas',
    initialState: {
        quotaDetails: {} as QuotaState
    },
    reducers: {
        setQuotaDetails: (state, action) => {
            state.quotaDetails = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuotaDetails.fulfilled, (state, action) => {
            const response = action.payload.userQuota;
            /**
             *  db schema:
             *             
             *  user_id,
                admission_date,
                daily_counter,
                daily_max,
                total_counter
             */
            state.quotaDetails = {
                admission_date: response[1],
                daily_counter: response[2],
                daily_max: response[3]
            }
        });
    }
})

export const { setQuotaDetails } = quotaSlice.actions;
export const quotaReducer = quotaSlice.reducer;