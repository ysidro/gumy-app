import base64 from 'react-native-base64';
import Constants from 'expo-constants';

import { FetchManager } from './fetchManager';

interface loginOptions {
  email: string;
  password: string;
}

export class AuthService {
  private fetchManager: FetchManager;

  constructor() {
    this.fetchManager = new FetchManager(Constants.expoConfig?.extra?.apiUrl);
  }

  async signIn<T>({ email, password }: loginOptions) {
    const { apiKey, roleId, roleName, appId } = Constants.expoConfig?.extra as any;
    const encoder = base64.encode(`${email.toLowerCase()}:${password}`);

    const response = await this.fetchManager.post<T>(
      `/Token?Company=${apiKey}&RoleID=${roleId}&role=${roleName}&appid=${appId}`,
      null,
      {
        Authorization: `Basic ${encoder}`
      }
    );
    return response;
  }
}
