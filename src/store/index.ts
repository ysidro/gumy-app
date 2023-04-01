import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import saleReducer from './reducers/saleReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sale: saleReducer
    // Add more reducers here
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
