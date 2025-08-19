import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: number;
  name: string;
  email: string;
};

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  lastSignInAt: number | null;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  lastSignInAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.lastSignInAt = Date.now();
    },
    signOut: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.lastSignInAt = null;
    },
  },
});

export const { signInSuccess, signOut } = authSlice.actions;
export default authSlice.reducer;
