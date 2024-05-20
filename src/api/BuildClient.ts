import type { AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { myToken } from './tokenCache';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET
  },
  scopes: import.meta.env.VITE_CTP_SCOPES.split(' '),
  fetch,
  tokenCache: myToken
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(import.meta.env.VITE_CTP_PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getPasswordFlowClient = (email: string, password: string) => {
  const options: PasswordAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user: {
        username: email,
        password
      }
    },
    scopes: import.meta.env.VITE_CTP_SCOPES.split(' '),
    fetch,
    tokenCache: myToken
  };

  const client = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY
  });
  return ApiRoot;
};

export const getRefreshFlowClient = (): ByProjectKeyRequestBuilder => {
  const options: RefreshAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET
    },
    refreshToken: localStorage.getItem('sloth-refreshToken') || '',
    fetch,
    tokenCache: myToken
  };

  const client = new ClientBuilder()
    .withRefreshTokenFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY
  });
  return ApiRoot;
};

export const getAnonymousFlowClient = () => {
  const options: AnonymousAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET
    },
    scopes: import.meta.env.VITE_CTP_SCOPES.split(' '),
    fetch
  };
  const client = new ClientBuilder()
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY
  });
};
