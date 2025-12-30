
/**
 * Global environment configuration.
 * Toggle USE_MOCK_DATA to switch between local dummy data and live backend APIs.
 */
export const CONFIG = {
  USE_MOCK_DATA: true, // Set to false to enable live API communication
  API_BASE_URL: 'https://api.cognitia.com/v1',
  WS_BASE_URL: 'wss://api.cognitia.com/realtime',
  TIMEOUT: 15000,
  AUTH_TOKEN_KEY: 'cognitia_auth_token',
  ROLE_KEY: 'cognitia_user_role'
};
