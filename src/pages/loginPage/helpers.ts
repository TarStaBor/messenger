import { Button } from '../../components/button';
import { Input } from '../../components/form/input';
import { loginFormController, registrationFormController } from '../../controllers/formControllers';
import authController from '../../controllers/authController';

import { loginButtons, loginInputs, registrationButtons, registrationInputs } from './consts';
import { IForm } from '../../components/form/types';

export const getLoginPageContext = (type: 'login' | 'registration'): IForm => {
    if (type === 'login') {
        return {
            title: 'Вход',
            id: 'loginPage-form',
            inputs: {
                Component: Input,
                propList: loginInputs,
            },
            buttons: {
                Component: Button,
                propList: loginButtons,
            },
            onSubmit() {
                const formIsValid = loginFormController.validateForm();
                if (!formIsValid) return;
                const fields = loginFormController.getFieldValues();
                authController.signIn(fields);
            },
        };
    }
    return {
        title: 'Регистрация',
        id: 'registration-form',
        inputs: {
            Component: Input,
            propList: registrationInputs,
        },
        buttons: {
            Component: Button,
            propList: registrationButtons,
        },
        onSubmit() {
            const formIsValid = registrationFormController.validateForm();
            if (!formIsValid) return;
            const fields = registrationFormController.getFieldValues();
            authController.signUp(fields);
        },
    };
};
