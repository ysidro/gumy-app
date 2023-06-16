import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth"
import user from "../features/user/user"
import createOrderSlice from "../redux/FormSlice"
export const store = configureStore({
    reducer: {
        auth:authReducer,
        form: createOrderSlice,
        user: user,
    }
})