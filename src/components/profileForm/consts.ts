import { IInput } from '../baseInput/types';
import {
    emailValidationRules,
    loginValidationRules,
    nameValidationRules, passwordValidationRules, phoneValidationRules
} from '../../utils/validators';
import { passwordFormController, profileFormController } from '../../controllers/formControllers';

export const infoInputs: IInput[] = [
    {
        type: 'email',
        label: 'Почта',
        name: 'email',
        required: true,
        validationRules: emailValidationRules,
        storeFormName: 'profileForm',
        onBlur: (field) => {
            profileFormController.setField(field);
        },
    },
    {
        type: 'text',
        label: 'Логин',
        name: 'login',
        required: true,
        validationRules: loginValidationRules,
        storeFormName: 'profileForm',
        onBlur: (field) => {
            profileFormController.setField(field);
        },
    },
    {
        type: 'text',
        label: 'Имя',
        name: 'first_name',
        validationRules: nameValidationRules,
        storeFormName: 'profileForm',
        onBlur: (field) => {
            profileFormController.setField(field);
        },
    },
    {
        type: 'text',
        label: 'Фамилия',
        name: 'second_name',
        validationRules: nameValidationRules,
        storeFormName: 'profileForm',
        onBlur: (field) => {
            profileFormController.setField(field);
        },
    },
    {
        type: 'text',
        label: 'Имя в чате',
        name: 'display_name',
        storeFormName: 'profileForm',
        onBlur: (field) => {
            profileFormController.setField(field);
        },
    },
    {
        type: 'text',
        label: 'Телефон',
        name: 'phone',
        validationRules: phoneValidationRules,
        storeFormName: 'profileForm',
        onBlur: (field) => {
            profileFormController.setField(field);
        },
    },
] as const;

export const changePasswordInputs: IInput[] = [
    {
        type: 'password',
        label: 'Старый пароль',
        name: 'oldPassword',
        validationRules: passwordValidationRules,
        storeFormName: 'passwordForm',
        onBlur: (field) => {
            passwordFormController.setField(field);
        },
    },
    {
        type: 'password',
        label: 'Новый пароль',
        name: 'password',
        required: true,
        validationRules: passwordValidationRules,
        storeFormName: 'passwordForm',
        onBlur: (field) => {
            passwordFormController.setField(field);
        },
    },
    {
        type: 'password',
        label: 'Повторите новый пароль',
        name: 'password_confirm',
        required: true,
        storeFormName: 'passwordForm',
        onBlur: (field) => {
            passwordFormController.setField(field);
        },
    },
] as const;
