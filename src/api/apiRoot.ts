import { ctpClient } from './BuildClient';
import type { createCustomerBody } from './api.interfaces';
import { ApiData } from './apiData';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: ApiData.PROJECT_KEY
});

export const getProducts = () => {
  return apiRoot.products().get().execute();
};

export const createCustomer = (body: createCustomerBody) => {
  return apiRoot
    .customers()
    .post({
      body
    })
    .execute();
};
