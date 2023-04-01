import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import { FetchManager } from './fetchManager';

export class CustomerService {
  private fetchManager: FetchManager;

  constructor() {
    this.fetchManager = new FetchManager(Constants.expoConfig?.extra?.apiUrl);
  }

  async getCustomers<T>(index: number = 0) {
    const token = await SecureStore.getItemAsync('uToken');
    if (token == null) return;

    const response = await this.fetchManager.get<T>(`/Customers?skip=${index}&token=${token}`);
    return response;
  }
}
