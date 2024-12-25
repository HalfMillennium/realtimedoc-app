import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export interface UserState {
  token: string|undefined;
}

export const DEFAULT_USER: UserState = {
  token: undefined
};

const initialState: UserState = DEFAULT_USER;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
    },
    clearToken: (state) => {
      state.token = undefined;
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;

export const userReducer = userSlice.reducer;
