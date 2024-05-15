import { type CustomerSignInResult } from '@commercetools/platform-sdk';
import { getPasswordFlowClient } from '../BuildClient';
import { myToken } from '../tokenCache';

// export const loginCustomer = async ({
//   email,
//   password
// }: Login): Promise<ClientResponse<CustomerSignInResult>> => {
//   myToken.set({
//     token: '',
//     expirationTime: 0,
//     refreshToken: ''
//   });
//   const client = getPasswordFlowClient(email, password);
//   const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
//     projectKey: ApiData.PROJECT_KEY
//   });
//   return await ApiRoot.login()
//     .post({
//       body: {
//         email,
//         password
//       }
//     })
//     .execute();
// };

export async function loginCustomer(email: string, password: string): Promise<CustomerSignInResult> {
  myToken.set({
    token: '',
    expirationTime: 0,
    refreshToken: ''
  });
  try {
    const client = getPasswordFlowClient(email, password);
    const response = await client
      .login()
      .post({
        body: {
          email,
          password
        }
      })
      .execute();
    localStorage.setItem('sloth-token', myToken.get().token);
    localStorage.setItem('sloth-refreshToken', myToken.get().refreshToken || '');
    localStorage.setItem('user', JSON.stringify(response.body.customer));
    return response.body;
  } catch (error) {
    console.error('Error occurred during login:', error);
    throw error;
  }
}

// export const loginCustomer = async ({
//   email,
//   password
// }: Login): Promise<ClientResponse<CustomerSignInResult>> => {
//   const refreshToken = localStorage.getItem('sloth-refreshToken');
//   // const token = localStorage.getItem('sloth-token');

//   if (refreshToken) {
//     const client = getRefreshFlowClient();
//     const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
//       projectKey: ApiData.PROJECT_KEY
//     });
//     return await ApiRoot.login().post().execute();
//   } else {
//     // Используем passwordFlow
//     myToken.set({
//       token: '',
//       expirationTime: 0,
//       refreshToken: ''
//     });
//     const client = getPasswordFlowClient(email, password);
//     const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
//       projectKey: ApiData.PROJECT_KEY
//     });
//     return await ApiRoot.login()
//       .post({
//         body: {
//           email,
//           password
//         }
//       })
//       .execute();
//   }
// };
