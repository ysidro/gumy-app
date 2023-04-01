import Constants from 'expo-constants';

import { FetchManager } from './fetchManager';

export class SaleService {
  private fetchManager: FetchManager;

  constructor() {
    this.fetchManager = new FetchManager(Constants.expoConfig?.extra?.apiUrl);
  }

  async getSales<T>(token: string) {
    const response = await this.fetchManager.get<T>(`/Sales?token=${token}`);
    return response;
  }
}
