import type { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';

export const getCustomer = async (ID: string): Promise<Customer> => {
  const customer = (await apiRoot.customers().withId({ ID }).get().execute()).body;
  return customer;
};
