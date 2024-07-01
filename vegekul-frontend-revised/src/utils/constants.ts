export const SUPER_DASHBOARD_ADMIN: string[] = ['Super Dashboard Admin'];
export const SUPER_DASHBOARD_STAFF: string[] = ['Super Dashboard Staff'];
export const SUPER_ADMIN_AND_STAFF: string[] = [
  ...SUPER_DASHBOARD_ADMIN,
  ...SUPER_DASHBOARD_STAFF,
];
export const PARTNER_ADMIN: string[] = ['Partner Admin'];
export const PARTNER_STAFF: string[] = ['Partner Staff'];
export const PARTNER_ADMIN_AND_STAFF: string[] = [
  ...PARTNER_ADMIN,
  ...PARTNER_STAFF,
];

export const SUPER_ADMIN_AND_PARTNER_ADMIN: string[] = [
  ...SUPER_DASHBOARD_ADMIN,
  ...PARTNER_ADMIN,
];

export const SUPER_ADMIN_AND_PARTNER_ADMIN_AND_STAFF: string[] = [
  ...SUPER_DASHBOARD_ADMIN,
  ...PARTNER_ADMIN,
  ...PARTNER_STAFF,
];

export const ALL_ROLES: string[] = [
  ...SUPER_DASHBOARD_ADMIN,
  ...SUPER_DASHBOARD_STAFF,
  ...PARTNER_ADMIN,
  ...PARTNER_STAFF,
];

export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const logOutAlertDescription =
  'Logging out will end your current session and you will need to enter your credentials again to access your account.';

export const deleteAlertDescription =
  'This action cannot be undone. This will permanently delete your data and remove your data from our servers.';
