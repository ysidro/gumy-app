import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Sale {
  P1: number;
  P2: number;
  P3: number;
  P4: number;
  P5: number;
  P6: number;
  P7: number;
  P8: number;
  P9: number;
  P10: number;
  P11: number;
  P12: number;
}

interface SalesState {
  sales: Sale | null;
  loading: boolean;
  error: string | null;
}

const initialState: SalesState = {
  sales: null,
  loading: false,
  error: null
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    getSalesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getSalesSuccess(state, action: PayloadAction<Sale>) {
      state.sales = action.payload;
      state.loading = false;
    },
    getSalesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { getSalesStart, getSalesSuccess, getSalesFailure } = salesSlice.actions;

export default salesSlice.reducer;
