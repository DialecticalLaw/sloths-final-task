import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
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

  const client = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: ApiData.PROJECT_KEY
  });
  return ApiRoot;

  // return new ClientBuilder().withPasswordFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
};

export const getRefreshFlowClient = (): ByProjectKeyRequestBuilder => {
  const options: RefreshAuthMiddlewareOptions = {
    host: ApiData.AUTH_URL,
    projectKey: ApiData.PROJECT_KEY,
    credentials: {
      clientId: ApiData.CLIENT_ID,
      clientSecret: ApiData.CLIENT_SECRET
    },
    refreshToken: localStorage.getItem('sloth-refreshToken') || '',
    fetch
  };

  // return new ClientBuilder().withRefreshTokenFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();

  const client = new ClientBuilder()
    .withRefreshTokenFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: ApiData.PROJECT_KEY
  });
  return ApiRoot;
};

// export function autoLoginUser() {
//   const accessToken = localStorage.getItem('sloths-token');
//   const refreshToken = localStorage.getItem('sloths-refreshToken');

//   if (accessToken && refreshToken) {
//     // Настройка HTTP-клиента с существующим токеном доступа
//     const client = createClient({
//       middlewares: [
//         createAuthMiddlewareWithExistingToken(`Bearer ${accessToken}`),
//         createHttpMiddleware({ host: 'https://api.europe-west1.gcp.commercetools.com' }),
//       ],
//     });

//     // Создание ApiRoot для выполнения запросов к commercetools API
//     const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
//       projectKey: 'your_project_key',
//     });

//     // Проверка валидности токена доступа, выполнив запрос к API
//     apiRoot.me().get().execute()
//       .then(response => {
//         if (response.statusCode === 200) {
//           // Токен доступа действителен, пользователь автоматически вошел в систему
//           console.log('Пользователь автоматически вошел в систему');
//           // Обновление состояния аутентификации в приложении
//           // ...
//         } else {
//           // Токен доступа недействителен, необходимо обновить токен
//           // ...
//         }
//       })
//       .catch(error => {
//         console.error('Ошибка при проверке токена доступа', error);
//         // Обработка ошибки, возможно, обновление токена
//         // ...
//       });
//   } else {
//     // Токены не найдены, необходимо выполнить вход пользователя
//     console.log('Токены не найдены, требуется вход пользователя');
//     // ...
//   }
// }

// // Вызов функции autoLoginUser при инициализации приложения
// autoLoginUser();
