import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { getProducts } from '../../api/products/getProducts';

export interface ProductsSliceState {
  isProductsLoading: boolean;
  products: ProductProjection[];
}

const initialState: ProductsSliceState = {
  isProductsLoading: false,
  products: []
};
export const productsSlice = createSlice({
  name: 'products_slice',
  initialState,
  reducers: {
    deleteProducts(state: ProductsSliceState) {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    const setLoading = (state: ProductsSliceState, isLoading: boolean) => {
      state.isProductsLoading = isLoading;
    };

    const setProducts = (state: ProductsSliceState, action: PayloadAction<ProductProjection[]>) => {
      state.products = action.payload.map((product) => product);
      state.isProductsLoading = false;
    };

    builder
      .addCase(getProducts.pending, (state) => setLoading(state, true))
      .addCase(getProducts.fulfilled, (state, action) => setProducts(state, action))
      .addCase(getProducts.rejected, (state) => setLoading(state, false));
  }
});

export const deleteProducts = productsSlice.actions.deleteProducts;
