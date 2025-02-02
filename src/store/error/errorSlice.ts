import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
    errorTitle: string | undefined;
    errorMessage: string | undefined;
}

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        error: undefined as ErrorState | undefined,
    },
    reducers: {
        setError: (state, action: PayloadAction<ErrorState>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = undefined;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;