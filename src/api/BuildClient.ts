import type { AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import { ApiData } from './apiData';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: ApiData.AUTH_URL,
  projectKey: ApiData.PROJECT_KEY,
  credentials: {
    clientId: ApiData.CLIENT_ID,
    clientSecret: ApiData.CLIENT_SECRET
  },
  scopes: ApiData.SCOPES.split(' '),
  fetch
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
    fetch
  };

  return new ClientBuilder().withPasswordFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
};

export const getAnonymousFlowClient = () => {
  const options: AnonymousAuthMiddlewareOptions = {
    host: ApiData.AUTH_URL,
    projectKey: ApiData.PROJECT_KEY,
    credentials: {
      clientId: ApiData.CLIENT_ID,
      clientSecret: ApiData.CLIENT_SECRET
    },
    scopes: ApiData.SCOPES.split(' '),
    fetch
  };
  const client = new ClientBuilder()
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: ApiData.PROJECT_KEY
  });
};
