import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import { ApiData } from './apiData';
import { myToken } from './tokenCache';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: ApiData.AUTH_URL,
  projectKey: ApiData.PROJECT_KEY,
  credentials: {
    clientId: ApiData.CLIENT_ID,
    clientSecret: ApiData.CLIENT_SECRET
  },
  scopes: ApiData.SCOPES.split(' '),
  fetch
  // tokenCache: myToken
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: ApiData.API_URL,
  fetch
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(ApiData.PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getPasswordFlowClient = (email: string, password: string) => {
  const options: PasswordAuthMiddlewareOptions = {
    host: ApiData.AUTH_URL,
    projectKey: ApiData.PROJECT_KEY,
    credentials: {
      clientId: ApiData.CLIENT_ID,
      clientSecret: ApiData.CLIENT_SECRET,
      user: {
        username: email,
        password
      }
    },
    scopes: ApiData.SCOPES.split(' '),
    fetch,
    tokenCache: myToken
  };

  return new ClientBuilder().withPasswordFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
};
