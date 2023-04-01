import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  userToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userToken: null,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.userToken = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.userToken = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.userToken = null;
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const { setLoading, loginSuccess, loginFailed, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
