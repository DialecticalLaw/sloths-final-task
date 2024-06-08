import { createSlice } from '@reduxjs/toolkit';
import type { Cart } from '@commercetools/platform-sdk';
import { getCart } from '../../api/cart/getCart';
import { addItemToCart } from '../../api/cart/addItemToCart';

export interface CartSliceState {
  cart: Cart | null;
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: CartSliceState = {
  cart: null,
  isLoading: false
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
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state: CartSliceState, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(getCart.rejected, (state: CartSliceState, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
      })
      .addCase(addItemToCart.pending, (state: CartSliceState) => {
        state.isLoading = true;
      })
      .addCase(addItemToCart.fulfilled, (state: CartSliceState, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(addItemToCart.rejected, (state: CartSliceState, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
      });
  }
});

export const { deleteCart } = cartSlice.actions;
