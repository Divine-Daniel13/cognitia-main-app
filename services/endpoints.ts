
/**
 * Central registry for all API routes.
 * Organized by role and functionality.
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token',
    VERIFY_2FA: '/auth/verify-2fa'
  },
  USER: {
    PROFILE: '/user/profile',
    CREDITS: {
      BALANCE: '/user/credits/balance',
      PURCHASE: '/user/credits/purchase',
      HISTORY: '/user/credits/history'
    },
    AVATARS: {
      LIST: '/avatars',
      FAVORITE: (id: string) => `/avatars/${id}/favorite`,
      SETTINGS: (id: string) => `/avatars/${id}/settings`
    },
    CALLS: {
      HISTORY: '/user/calls/history',
      START: '/user/calls/initiate',
      TRANSCRIPT: (id: string) => `/user/calls/${id}/transcript`
    },
    ANALYTICS: '/user/analytics/usage',
    NOTIFICATIONS: '/user/notifications'
  },
  ADMIN: {
    USERS: {
      LIST: '/admin/users',
      MODERATE: (id: string) => `/admin/users/${id}/moderate`,
      CREATE: '/admin/users/create'
    },
    AVATARS: {
      MANAGE: '/admin/avatars/fleet',
      TRAIN: '/admin/avatars/train-core',
      ASSETS: '/admin/avatars/visual-aids'
    },
    MODERATION: {
      QUEUE: '/admin/moderation/queue',
      RESOLVE: (id: string) => `/admin/moderation/resolve/${id}`
    },
    BILLING: {
      LEDGER: '/admin/billing/ledger',
      REPORTS: '/admin/billing/reports'
    }
  },
  SUPER_ADMIN: {
    SYSTEM: {
      HEALTH: '/super/system/health',
      CONFIG: '/super/system/config-flags',
      AUDIT_LOGS: '/super/system/audit-trails'
    },
    FLEET: '/super/admin-fleet',
    ANALYTICS: '/super/platform-analytics/global',
    CMS: '/super/cms/landing-page'
  }
};
