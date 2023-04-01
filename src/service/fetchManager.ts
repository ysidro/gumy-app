interface RequestConfig {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
}

interface ResponseData<T> {
  success: boolean;
  data: T | null;
  message: string;
  error: Error | null;
}

export class FetchManager {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<ResponseData<T>> {
    if (!response.ok) {
      const error = new Error(response.statusText);
      return { data: null, error, message: error.message, success: false };
    }

    const data = await response.json();
    return { ...data, error: null };
  }

  public async get<T>(url: string, headers?: HeadersInit): Promise<ResponseData<T>> {
    const config: RequestConfig = {
      url: `${this.baseUrl}${url}`,
      method: 'GET',
      headers
    };
    const response = await fetch(config.url, config);
    return this.handleResponse<T>(response);
  }

  public async post<T>(url: string, data: BodyInit | null, headers?: HeadersInit): Promise<ResponseData<T>> {
    const config: RequestConfig = {
      url: `${this.baseUrl}${url}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(data)
    };
    const response = await fetch(config.url, config);
    return this.handleResponse<T>(response);
  }

  public async put<T>(url: string, data: BodyInit | null, headers?: HeadersInit): Promise<ResponseData<T>> {
    const config: RequestConfig = {
      url: `${this.baseUrl}${url}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(data)
    };
    const response = await fetch(config.url, config);
    return this.handleResponse<T>(response);
  }

  public async delete<T>(url: string, headers?: HeadersInit): Promise<ResponseData<T>> {
    const config: RequestConfig = {
      url: `${this.baseUrl}${url}`,
      method: 'DELETE',
      headers
    };
    const response = await fetch(config.url, config);
    return this.handleResponse<T>(response);
  }
}
