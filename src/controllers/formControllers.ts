import ProfileFormController from './profileFormController';
import { FormController } from '../core/FormController';
import {
    chatNameValidationRules,
    displayNameValidationRules,
    emailValidationRules,
    loginValidationRules,
    nameValidationRules,
    passwordValidationRules,
    phoneValidationRules,
} from '../utils/validators';

export const loginFormController = new FormController('loginForm', {
    login: loginValidationRules,
    password: passwordValidationRules,
});

export const registrationFormController = new FormController('registrationForm', {
    login: loginValidationRules,
    email: emailValidationRules,
    first_name: nameValidationRules,
    second_name: nameValidationRules,
    phone: phoneValidationRules,
    password: passwordValidationRules,
    password_confirm: passwordValidationRules,
});

export const addUserFormController = new FormController('addUserForm', {
    name: loginValidationRules,
});

export const removeUserFormController = new FormController('removeUserForm', {
    name: loginValidationRules,
});

export const newChatFormController = new FormController('newChatForm', {
    title: chatNameValidationRules,
});

export const passwordFormController = new FormController('passwordForm', {
    oldPassword: passwordValidationRules,
    password: passwordValidationRules,
    password_confirm: passwordValidationRules,
});

export const profileFormController = new ProfileFormController('profileForm', {
    login: loginValidationRules,
    email: emailValidationRules,
    first_name: nameValidationRules,
    second_name: nameValidationRules,
    display_name: displayNameValidationRules,
    phone: phoneValidationRules,
});
