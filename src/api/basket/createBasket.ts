import type { ByProjectKeyRequestBuilder, Cart, ClientResponse } from '@commercetools/platform-sdk';
import { getAnonymousFlowClient, getRefreshFlowClient } from '../BuildClient';
import { apiRoot } from '../apiRoot';

async function getCustomerFlow(): Promise<ByProjectKeyRequestBuilder> {
  const refreshToken = localStorage.getItem('sloth-refreshToken');
  let customerFlow;

  if (refreshToken) {
    try {
      customerFlow = getRefreshFlowClient();
    } catch {
      customerFlow = getAnonymousFlowClient();
    }
  } else {
    customerFlow = getAnonymousFlowClient();
  }

  return customerFlow;
}

export const createCart = async (): Promise<Cart> => {
  const client = await getCustomerFlow();
  const response = await client
    .me()
    .carts()
    .post({
      body: {
        currency: 'RUB'
      }
    })
    .execute();
  return response.body;
};

export const addItemToCart = async (cartId: string, productId: string, version: number): Promise<Cart> => {
  const response = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addLineItem',
            productId,
            quantity: 1
          }
        ]
      }
    })
    .execute();
  return response.body;
};

export const getCart = async (customerId: string): Promise<ClientResponse<Cart>> => {
  return await apiRoot.carts().withCustomerId({ customerId }).get().execute();
};
