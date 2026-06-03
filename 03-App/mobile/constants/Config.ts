/**
 * App configuration constants.
 */
import { Platform } from 'react-native';

export const Config = {
  /**
   * Backend API base URL.
   * Change this to your production URL when deploying.
   */
  API_BASE_URL: __DEV__
    ? 'http://192.168.0.63:8000'  // Local dev — replace with your machine's IP
    : 'https://api.yourapp.com',

  /**
   * API version prefix.
   */
  API_VERSION: '/api/v1',

  /**
   * Token storage keys.
   */
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data',
    THEME: 'theme_preference',
  },

  /**
   * Pagination defaults.
   */
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 50,
  },

  /**
   * File upload limits.
   */
  UPLOAD: {
    MAX_IMAGE_SIZE_MB: 10,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    MAX_IMAGES_PER_POST: 4,
  },
} as const;
