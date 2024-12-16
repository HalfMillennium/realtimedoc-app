import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export interface UserState {
  id: string;
  name: string;
  email: string;
  memberSince: string;
}

export const DEFAULT_USER: UserState = {
  id: crypto.randomUUID(),
  name: 'Arbitrary Robert',
  email: 'arbo22@gmail.com',
  memberSince: moment().format('MMM Do, YYYY HH:mm:ss A'),
};

const initialState: UserState = DEFAULT_USER;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.memberSince = action.payload.email;
    },
    clearUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.memberSince = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
