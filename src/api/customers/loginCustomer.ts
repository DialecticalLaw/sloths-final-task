import {
  createApiBuilderFromCtpClient,
  type ClientResponse,
  type CustomerSignInResult
} from '@commercetools/platform-sdk';
import type { Login } from '../api.interfaces';
import { getPasswordFlowClient } from '../BuildClient';
import { ApiData } from '../apiData';
import { myToken } from '../tokenCache';

export const loginCustomer = async ({
  email,
  password
}: Login): Promise<ClientResponse<CustomerSignInResult>> => {
  myToken.set({
    token: '',
    expirationTime: 0,
    refreshToken: ''
  });
  const client = getPasswordFlowClient(email, password);
  const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: ApiData.PROJECT_KEY
  });
  return await ApiRoot.login()
    .post({
      body: {
        email,
        password
      }
    })
    .execute();
};
