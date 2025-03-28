import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { setError } from '../error/errorSlice';

interface QuotaState {
    quotaDetails: {
        admissionDate: string;
        dailyCounter: number;
        dailyMax: number;
    };
    isLoading: boolean;
    lastUpdated: number | null;
}

const initialState: QuotaState = {
    quotaDetails: {
        admissionDate: '',
        dailyCounter: 0,
        dailyMax: 0
    },
    isLoading: false,
    lastUpdated: null
};

export const getQuotaDetails = createAsyncThunk<any, { userId: string }>(
    'quotas/getQuotaDetails',
    async ({ userId }, thunkAPI) => {
        try {
            const response = await fetch(`/api/quotas/${userId}`);
            const userQuotas = await response.json();
            console.log(`Quotas result ${userQuotas}`);
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
    initialState,
    reducers: {
        setQuotaDetails: (state, action) => {
            state.quotaDetails = action.payload;
            state.lastUpdated = Date.now();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuotaDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQuotaDetails.fulfilled, (state, action) => {
                let data = JSON.parse(action.payload);
                const response = data.quotas;
                state.quotaDetails = {
                    admissionDate: response[1],
                    dailyCounter: response[2],
                    dailyMax: response[3]
                };
                state.isLoading = false;
                state.lastUpdated = Date.now();
            })
            .addCase(getQuotaDetails.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

// Memoized selectors
export const selectQuotaDetails = createSelector(
    [(state: { quotas: QuotaState }) => state.quotas],
    (quotas) => ({
        ...quotas.quotaDetails,
        lastUpdated: quotas.lastUpdated
    })
);

export const selectIsLoading = (state: { quotas: QuotaState }) => state.quotas.isLoading;

export const { setQuotaDetails } = quotaSlice.actions;
export const quotaReducer = quotaSlice.reducer;