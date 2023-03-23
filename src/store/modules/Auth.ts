import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
    email: string;
}

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null
}


const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            console.log({ action });

            // state.email = action.payload.email
            // state.isLoggedIn
        },
        setSignOut: (state) => {
            state.email = null;
            state.userName = null;
            state.isLoggedIn = false;
        }
    }

})

export const { setSignIn, setSignOut } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;

export default authSlice.reducer;