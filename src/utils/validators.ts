export type Rule = (value: string) => boolean;
export type ValidationRule = {
    rule: Rule;
    message: string;
};

const validLength: (min: number, max: number) => Rule = (min, max) => {
    return (value) => value.length >= min && value.length <= max;
};

const validNameSymbols: Rule = (value) => {
    const regexp = /^[A-ZА-ЯЁa-zA-ZA-ЯЁа-яё-]+$/;
    return regexp.test(value);
};

const validNameSpecialSymbols: Rule = (value) => {
    const regexp = /^[a-zA-ZA-ЯЁа-яё-]+$/;
    return regexp.test(value);
};

const validNameStartsWithCapital: Rule = (value) => {
    const regexp = /^[A-ZА-ЯЁ]/;
    return regexp.test(value);
};

const validLoginSpecialSymbols: Rule = (value) => {
    const regexp = /^[a-zA-Z0-9_-]+$/;
    return regexp.test(value);
};

const noCyrillicSymbols: Rule = (value) => {
    const regexp = /^[^А-Яа-яЁё]+$/;
    return regexp.test(value);
};

const noNumbersOnly: Rule = (value) => {
    const regexp = /^[^0-9]+$/;
    return regexp.test(value);
};

const validEmail: Rule = (value) => {
    const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexp.test(value);
};

const validPassword: Rule = (value) => {
    const regexp = /^(?=.*[A-ZА-ЯЁ])(?=.*\d)/;
    return regexp.test(value);
};

const validPhone: Rule = (value) => {
    const regexp = /^\+?\d+$/;
    return regexp.test(value);
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
