import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import saleReducer from './reducers/saleReducer';
import customerReducer from './reducers/customerReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sale: saleReducer,
    customers: customerReducer
    // Add more reducers here
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
