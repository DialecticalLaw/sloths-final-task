import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Customer } from '@commercetools/platform-sdk';
export interface customerSliceState {
  customerId: null | string;
  customerName: null | string;
}
const initialState: customerSliceState = {
  customerId: null,
  customerName: null
};
export const customerSlice = createSlice({
  name: 'customer_slice',
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customerId = action.payload.id;
      state.customerName = action.payload.firstName;
    },
    deleteCustomer(state) {
      for (const key in state) {
        state[key] = initialState[key];
      }
    }
  }
});

export const setCustomer = customerSlice.actions.setCustomer;
export const deleteCustomer = customerSlice.actions.deleteCustomer;
