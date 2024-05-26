import type { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UpdateCustomerData } from '../api.interfaces';

export const updateCustomer = createAsyncThunk<Customer, UpdateCustomerData>(
  'customer/update',
  async (customerData: UpdateCustomerData) => {
    try {
      const customer = (
        await apiRoot
          .customers()
          .withId({ ID: customerData.ID })
          .post({ body: { actions: customerData.actions, version: 1 } })
          .execute()
      ).body;
      return customer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
