import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AuthReducer from './modules/Auth'

const rootReducer = combineReducers({
    userAuth: AuthReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
