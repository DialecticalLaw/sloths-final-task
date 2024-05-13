import type { createCustomerBody } from '../api.interfaces';
import { apiRoot } from '../apiRoot';

export const createCustomer = (body: createCustomerBody) => {
  return apiRoot
    .customers()
    .post({
      body
    })
    .execute();
};
