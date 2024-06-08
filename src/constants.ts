export const API = 'https://ya-praktikum.tech/';
export const WS_HOST = 'wss://ya-praktikum.tech/';
export const RESOURCES_HOST = 'https://ya-praktikum.tech/api/v2/resources/';

export const LOGIN_INPUTS = ['login', 'password'] as const;
export const REGISTRATION_INPUTS = ['email', 'login', 'first_name', 'second_name', 'phone', 'password', 'password_confirm'] as const;
export const PROFILE_INFO_INPUTS = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'] as const;
export const PASSWORD_INPUTS = ['oldPassword', 'password', 'password_confirm'] as const;
