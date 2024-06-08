import { createSlice } from '@reduxjs/toolkit';
import type { Cart } from '@commercetools/platform-sdk';
import { getCart } from '../../api/cart/getCart';
import { updateCart } from '../../api/cart/updateCart';

export interface CartSliceState {
  cart: Cart | null;
  isLoadingGet: boolean;
  isLoadingUpdate: boolean;
  errorMessage?: string;
}

const initialState: CartSliceState = {
  cart: null,
  isLoadingGet: false,
  isLoadingUpdate: false
};

export const cartSlice = createSlice({
  name: 'cart_slice',
  initialState,
  reducers: {
    deleteCart: (state) => {
      state.cart = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state: CartSliceState) => {
        state.isLoadingGet = true;
      })
      .addCase(getCart.fulfilled, (state: CartSliceState, action) => {
        state.cart = action.payload;
        state.isLoadingGet = false;
      })
      .addCase(getCart.rejected, (state: CartSliceState, action) => {
        state.errorMessage = action.error.message;
        state.isLoadingGet = false;
      })
      .addCase(updateCart.pending, (state: CartSliceState) => {
        state.isLoadingUpdate = true;
      })
      .addCase(updateCart.fulfilled, (state: CartSliceState, action) => {
        state.cart = action.payload;
        state.isLoadingUpdate = false;
      })
      .addCase(updateCart.rejected, (state: CartSliceState, action) => {
        state.errorMessage = action.error.message;
        state.isLoadingUpdate = false;
      });
  }
});

export const { deleteCart } = cartSlice.actions;
