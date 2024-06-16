import type { AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ApiData } from './apiData';
import { myToken } from './tokenCache';
import { v4 as uuidv4 } from 'uuid';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: ApiData.AUTH_URL,
  projectKey: ApiData.PROJECT_KEY,
  credentials: {
    clientId: ApiData.CLIENT_ID,
    clientSecret: ApiData.CLIENT_SECRET
  },
  scopes: ApiData.SCOPES.split(' '),
  fetch,
  tokenCache: myToken
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: ApiData.API_URL,
  fetch
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(ApiData.PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
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

  const client = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: ApiData.PROJECT_KEY
  });
  return ApiRoot;
};

export const getRefreshFlowClient = () => {
  const options: RefreshAuthMiddlewareOptions = {
    host: ApiData.AUTH_URL,
    projectKey: ApiData.PROJECT_KEY,
    credentials: {
      clientId: ApiData.CLIENT_ID,
      clientSecret: ApiData.CLIENT_SECRET
    },
    refreshToken: localStorage.getItem('sloth-refreshToken') || '',
    fetch,
    tokenCache: myToken
  };

  const client = new ClientBuilder()
    .withRefreshTokenFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: ApiData.PROJECT_KEY
  });
  return ApiRoot;
};

export const getAnonymousFlowClient = () => {
  const anonymousId = uuidv4();
  localStorage.setItem('sloth-anonymousId', anonymousId);
  const options: AnonymousAuthMiddlewareOptions = {
    host: ApiData.AUTH_URL,
    projectKey: ApiData.PROJECT_KEY,
    credentials: {
      clientId: ApiData.CLIENT_ID,
      clientSecret: ApiData.CLIENT_SECRET,
      anonymousId: anonymousId
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

export async function getClientFlow(): Promise<ByProjectKeyRequestBuilder> {
  const refreshToken = localStorage.getItem('sloth-refreshToken');
  let clientFlow;

  if (refreshToken) {
    try {
      clientFlow = getRefreshFlowClient();
    } catch {
      clientFlow = getAnonymousFlowClient();
    }
  } else {
    clientFlow = getAnonymousFlowClient();
  }

  return clientFlow;
}
