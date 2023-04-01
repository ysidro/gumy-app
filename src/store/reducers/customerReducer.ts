import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Customer {}

interface CustomersState {
  customers: Customer | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomersState = {
  customers: null,
  loading: false,
  error: null
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    getCustomersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCustomersSuccess(state, action: PayloadAction<Customer>) {
      state.customers = action.payload;
      state.loading = false;
    },
    getCustomersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { getCustomersStart, getCustomersSuccess, getCustomersFailure } = customersSlice.actions;

export default customersSlice.reducer;
