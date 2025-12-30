
import { CONFIG } from '../config/env';

/**
 * Handles outgoing request headers and authentication.
 */
export const requestInterceptor = async (config: RequestInit): Promise<RequestInit> => {
  const token = localStorage.getItem(CONFIG.AUTH_TOKEN_KEY);
  
  const headers = new Headers(config.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return {
    ...config,
    headers
  };
};

/**
 * Handles incoming responses, status code validation, and token expiration.
 */
export const responseInterceptor = async (response: Response): Promise<any> => {
  if (response.status === 401) {
    // Silent handling of session expiration
    console.warn('Session expired. Redirecting or refreshing...');
    // In a live scenario, trigger refresh token logic here
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      message: errorData.message || 'Network response was not ok',
      data: errorData
    };
  }

  return response.json();
};
