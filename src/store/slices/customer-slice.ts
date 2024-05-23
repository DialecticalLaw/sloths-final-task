import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Customer } from '@commercetools/platform-sdk';
import { reloginCustomer } from '../../api/customers/reloginCustomer';
export interface customerSliceState {
  customerId: null | string;
  customerName: null | string;
  isUnknownStatus: boolean;
  isCustomerLoading: boolean;
}
const initialState: customerSliceState = {
  customerId: null,
  customerName: null,
  isUnknownStatus: true,
  isCustomerLoading: false
};
export const customerSlice = createSlice({
  name: 'customer_slice',
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customerId = action.payload.id;
      state.customerName = action.payload.firstName || null;
      state.isCustomerLoading = false;
      state.isUnknownStatus = false;
    },
    deleteCustomer(state) {
      state.customerId = null;
      state.customerName = null;
      state.isCustomerLoading = false;
      state.isUnknownStatus = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(reloginCustomer.pending, (state: customerSliceState) => {
        state.isCustomerLoading = true;
      })
      .addCase(reloginCustomer.fulfilled, (state: customerSliceState, action) => {
        state.customerId = action.payload.id;
        state.customerName = action.payload.firstName || '';
        state.isCustomerLoading = false;
        state.isUnknownStatus = false;
      })
      .addCase(reloginCustomer.rejected, (state: customerSliceState) => {
        state.isCustomerLoading = false;
        state.isUnknownStatus = false;
      });
  }
});

export const setCustomer = customerSlice.actions.setCustomer;
export const deleteCustomer = customerSlice.actions.deleteCustomer;
