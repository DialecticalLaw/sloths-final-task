import type { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AddCartInfo } from '../api.interfaces';

export const addItemToCart = createAsyncThunk<Cart, AddCartInfo>(
  'cart/add',
  async ({ cartId, productId, version }) => {
    try {
      const cart = (
        await apiRoot
          .carts()
          .withId({ ID: cartId })
          .post({ body: { version, actions: [{ action: 'addLineItem', productId, quantity: 1 }] } })
          .execute()
      ).body;
      return cart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
