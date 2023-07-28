import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authState: 'signIn',
    userToken: null,
    isLoading: true,
    isSignOut: false,
  };
  


  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      restoreToken: (state, action) => {
        state.userToken = action.payload;
        state.isLoading = false;
      },
      signIn: (state, action) => {
        state.isSignOut = false;
        state.userToken = action.payload;
      },
      signOut: state => {
        state.isSignOut = true;
        state.authState = 'signIn',
        state.userToken = null;
      },
      setAuthState: (state, action) => {
        state.authState = action.payload;
      },
    },
  });


export const { restoreToken, signIn, signOut, setAuthState } = authSlice.actions;
export default authSlice.reducer;