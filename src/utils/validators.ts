import {
    noCyrillicSymbols,
    noNumbersOnly, validEmail,
    validLoginSpecialSymbols, validNameSpecialSymbols, validNameStartsWithCapital, validNameSymbols,
    validPassword, validPhone
} from '../constants';

type Rule = (value: string) => boolean;
export type ValidationRule = {
    rule: Rule;
    message: string;
};

const validLength: (min: number, max: number) => Rule = (min, max) => {
    return (value) => value.length >= min && value.length <= max;
};

export const loginValidationRules = [
    {
        rule: validLoginSpecialSymbols,
        message: 'Допустим только дефис и подчеркивание',
    },
    {
        rule: noNumbersOnly,
        message: 'Логин не должен состоять только из цифр',
    },
    {
        rule: noCyrillicSymbols,
        message: 'Логин не должен содержать кириллицу',
    },
    {
        rule: validLength(3, 20),
        message: 'Логин должен содержать от 3 до 20 символов',
    },
];

export const passwordValidationRules = [
    {
        rule: validPassword,
        message: 'Хотя бы одну заглавную букву и одну цифру',
    },
    {
        rule: validLength(8, 20),
        message: 'Пароль должен содержать от 8 до 20 символов',
    },
];

export const emailValidationRules = [
    {
        rule: validEmail,
        message: 'Некорректный email',
    },
];

export const nameValidationRules = [
    {
        rule: validNameSpecialSymbols,
        message: 'Должен быть без спецсимволов кроме "-"',
    },
    {
        rule: validNameStartsWithCapital,
        message: 'Первая буква должна быть заглавной',
    },
    {
        rule: validNameSymbols,
        message: 'Без цифр/пробелов, без спецсимволов',
    },
];

export const displayNameValidationRules = [
    {
        rule: validLength(1, 20),
        message: 'Имя должено содержать от 1 до 20 символов',
    },
];

export const phoneValidationRules = [
    {
        rule: validPhone,
        message: 'Некорректный номер телефона',
    },
    {
        rule: validLength(10, 15),
        message: 'Номер должен содержать от 10 до 15 символов',
    },
];

export const passwordConfirmationRules = [
    {
        rule: validLength(8, 20),
        message: 'Повторите пароль',
    },
];

export const chatNameValidationRules = [
    {
        rule: validLength(1, 50),
        message: 'Введите название чата',
    },
];
