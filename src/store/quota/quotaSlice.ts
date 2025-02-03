import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setError } from '../error/errorSlice';

interface QuotaState {
    admission_date: string;
    daily_counter: number;
    daily_max: number;
}

export const getQuotaDetails = createAsyncThunk<any, { userEmail: string }>(
    'quotas/getQuotaDetails',
    async ({ userEmail }, thunkAPI) => {
        try {
            const response = await fetch(`/api/quotas/${userEmail}`);
            const userQuotas = await response.json();
            return userQuotas;
        } catch (error) {
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
            state.quotaDetails = {
                admission_date: response.admission_date,
                daily_counter: response.daily_counter,
                daily_max: response.daily_max
            }
        });
    }
})

export const { setQuotaDetails } = quotaSlice.actions;
export const quotaReducer = quotaSlice.reducer;