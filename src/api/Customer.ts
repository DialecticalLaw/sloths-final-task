import {
  createApiBuilderFromCtpClient,
  type ClientResponse,
  type CustomerSignInResult
} from '@commercetools/platform-sdk';
import { getPasswordFlowClient } from './BuildClient';
import { ApiData } from './apiData';

export const loginCustomer = async (
  email: string,
  password: string
): Promise<ClientResponse<CustomerSignInResult>> => {
  const сlient = getPasswordFlowClient(email, password);
  const ApiRoot = createApiBuilderFromCtpClient(сlient).withProjectKey({
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
