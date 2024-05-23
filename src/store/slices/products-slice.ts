import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '@commercetools/platform-sdk';
import { getProducts } from '../../api/products/getProducts';

interface productsSliceState {
  isProductsLoading: boolean;
  products: Product[];
}

const initialState: productsSliceState = {
  isProductsLoading: false,
  products: []
};
export const productsSlice = createSlice({
  name: 'products_slice',
  initialState,
  reducers: {
    deleteProducts(state) {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state: productsSliceState) => {
        state.isProductsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state: productsSliceState, action) => {
        state.products = action.payload;
        state.isProductsLoading = false;
      })
      .addCase(getProducts.rejected, (state: productsSliceState) => {
        state.isProductsLoading = false;
      });
  }
});

export const deleteProducts = productsSlice.actions.deleteProducts;
