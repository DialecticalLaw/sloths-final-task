import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private token: TokenStore;

  constructor() {
    this.token = {
      token: '',
      expirationTime: 0,
      refreshToken: ''
    };
  }

  public get(): TokenStore {
    return this.token;
  }

  public set(cache: TokenStore): void {
    this.token = cache;
  }
}

export const myToken = new MyTokenCache();
