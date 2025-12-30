
import { CONFIG } from '../config/env';
import { requestInterceptor, responseInterceptor } from './interceptors';

/**
 * ApiClient provides a standardized interface for HTTPS communication.
 * Respects the CONFIG.USE_MOCK_DATA flag.
 */
class ApiClient {
  private static instance: ApiClient;

  private constructor() {}

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private async fetchWrapper(endpoint: string, options: RequestInit = {}): Promise<any> {
    // Non-destructive check: if using mock data, return null or handle via mock resolver
    // This ensures existing UI logic is never interrupted if toggle is true.
    if (CONFIG.USE_MOCK_DATA) {
      console.log(`[Mock] Call intercepted for: ${endpoint}`);
      return Promise.resolve(null);
    }

    const url = `${CONFIG.API_BASE_URL}${endpoint}`;
    const interceptedConfig = await requestInterceptor(options);

    try {
      const response = await fetch(url, interceptedConfig);
      return await responseInterceptor(response);
    } catch (error) {
      console.error('API Client Error:', error);
      throw error;
    }
  }

  public get(endpoint: string) {
    return this.fetchWrapper(endpoint, { method: 'GET' });
  }

  public post(endpoint: string, data: any) {
    return this.fetchWrapper(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public put(endpoint: string, data: any) {
    return this.fetchWrapper(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  public delete(endpoint: string) {
    return this.fetchWrapper(endpoint, { method: 'DELETE' });
  }

  /**
   * Real-time WebSocket connection initializer.
   */
  public connectSocket(onMessage: (data: any) => void): WebSocket | null {
    if (CONFIG.USE_MOCK_DATA) return null;

    const socket = new WebSocket(CONFIG.WS_BASE_URL);
    socket.onmessage = (event) => onMessage(JSON.parse(event.data));
    socket.onerror = (err) => console.error('WS Error:', err);
    
    return socket;
  }
}

export const api = ApiClient.getInstance();
