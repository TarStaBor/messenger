import {Rule} from "./utils/validators";

export const API = 'https://ya-praktikum.tech/';
export const WS_HOST = 'wss://ya-praktikum.tech/';
export const RESOURCES_HOST = 'https://ya-praktikum.tech/api/v2/resources/';

export const LOGIN_INPUTS = ['login', 'password'] as const;
export const REGISTRATION_INPUTS = ['email', 'login', 'first_name', 'second_name', 'phone', 'password', 'password_confirm'] as const;
export const PROFILE_INFO_INPUTS = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'] as const;
export const PASSWORD_INPUTS = ['oldPassword', 'password', 'password_confirm'] as const;

export const validNameSymbols: Rule = (value) => {
    const regexp = /^[A-ZА-ЯЁa-zA-ZA-ЯЁа-яё-]+$/;
    return regexp.test(value);
};

export const validNameSpecialSymbols: Rule = (value) => {
    const regexp = /^[a-zA-ZA-ЯЁа-яё-]+$/;
    return regexp.test(value);
};

export const validNameStartsWithCapital: Rule = (value) => {
    const regexp = /^[A-ZА-ЯЁ]/;
    return regexp.test(value);
};

export const validLoginSpecialSymbols: Rule = (value) => {
    const regexp = /^[a-zA-Z0-9_-]+$/;
    return regexp.test(value);
};

export const noCyrillicSymbols: Rule = (value) => {
    const regexp = /^[^А-Яа-яЁё]+$/;
    return regexp.test(value);
};

export const noNumbersOnly: Rule = (value) => {
    const regexp = /^[^0-9]+$/;
    return regexp.test(value);
};

export const validEmail: Rule = (value) => {
    const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexp.test(value);
};

export const validPassword: Rule = (value) => {
    const regexp = /^(?=.*[A-ZА-ЯЁ])(?=.*\d)/;
    return regexp.test(value);
};

export const validPhone: Rule = (value) => {
    const regexp = /^\+?\d+$/;
    return regexp.test(value);
};
