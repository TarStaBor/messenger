import { IInput } from '../../components/baseInput/types';
import {
    emailValidationRules,
    loginValidationRules,
    nameValidationRules, passwordConfirmationRules, passwordValidationRules, phoneValidationRules
} from '../../utils/validators';
import { loginFormController, registrationFormController } from '../../controllers/formControllers';
import { IButton } from '../../components/button/types';
import router from '../../utils/router';

export const loginInputs: IInput[] = [
    {
        type: 'text',
        label: 'Логин',
        name: 'login',
        storeFormName: 'loginForm',
        validationRules: loginValidationRules,
        onBlur: (field) => {
            loginFormController.setField(field);
        },
    },
    {
        type: 'password',
        label: 'Пароль',
        name: 'password',
        storeFormName: 'loginForm',
        onBlur: (field) => {
            loginFormController.setField(field);
        },
    },
];

export const registrationInputs: IInput[] = [
    {
        type: 'email',
        label: 'Почта',
        name: 'email',
        storeFormName: 'registrationForm',
        validationRules: emailValidationRules,
        onBlur: (field) => {
            registrationFormController.setField(field);
        },
    },
    {
        type: 'text',
        label: 'Логин',
        name: 'login',
        storeFormName: 'registrationForm',
        validationRules: loginValidationRules,
        onBlur: (field) => {
            registrationFormController.setField(field);
        },
    },
    {
        type: 'text',
        label: 'Имя',
        name: 'first_name',
        storeFormName: 'registrationForm',
        validationRules: nameValidationRules,
        onBlur: (field) => {
            registrationFormController.setField(field);
        },
    },
    {
        type: 'text',
        label: 'Фамилия',
        name: 'second_name',
        storeFormName: 'registrationForm',
        validationRules: nameValidationRules,
        onBlur: (field) => {
            registrationFormController.setField(field);
        },
    },
    {
        type: 'text',
        label: 'Телефон',
        name: 'phone',
        storeFormName: 'registrationForm',
        validationRules: phoneValidationRules,
        onBlur: (field) => {
            registrationFormController.setField(field);
        },
    },
    {
        type: 'password',
        label: 'Пароль',
        name: 'password',
        storeFormName: 'registrationForm',
        validationRules: passwordValidationRules,
        onBlur: (field) => {
            registrationFormController.setField(field);
        },
    },
    {
        type: 'password',
        label: 'Пароль (еще раз)',
        name: 'password_confirm',
        storeFormName: 'registrationForm',
        validationRules: passwordConfirmationRules,
        onBlur: (field) => {
            registrationFormController.setField(field);
        },
    },
];

export const loginButtons: IButton[] = [
    {
        type: 'submit',
        variant: 'primary',
        fill: 'solid',
        text: 'Авторизоваться',
        align: 'center',
    },
    {
        type: 'button',
        variant: 'primary',
        fill: 'link',
        text: 'Нет аккаунта?',
        events: {
            click: () => router.go('/sign-up'),
        },
    },
];

export const registrationButtons: IButton[] = [
    {
        type: 'submit',
        variant: 'primary',
        fill: 'solid',
        text: 'Зарегистрироваться',
    },
    {
        type: 'button',
        variant: 'primary',
        fill: 'link',
        text: 'Войти?',
        events: {
            click: () => router.go('/'),
        },
    },
];
