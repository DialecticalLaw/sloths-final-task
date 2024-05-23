import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '@commercetools/platform-sdk';

export const getProducts = createAsyncThunk<Product[]>('products/get', async () => {
  try {
    const response = await apiRoot.products().get().execute();
    return response.body.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
