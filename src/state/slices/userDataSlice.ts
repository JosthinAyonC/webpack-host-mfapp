import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserState = {
  username: string | null;
  userBirthDate: string | null;
};

const initialState: UserState = {
  username: null,
  userBirthDate: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; userBirthDate: string }>) => {
      state.username = action.payload.username;
      state.userBirthDate = action.payload.userBirthDate;
    },
    clearUser: (state) => {
      state.username = null;
      state.userBirthDate = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
