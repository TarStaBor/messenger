import { LOGIN_INPUTS, REGISTRATION_INPUTS } from '../constants';
import { profileFormController } from './formControllers';
import { ws } from '../core/ChatWebSocket';
import AuthApi from '../api/auth-api';
import store from '../core/store';
import router from '../utils/router';

const authApi = new AuthApi();

class AuthController {
    async signUp(data: Record<(typeof REGISTRATION_INPUTS)[number], string>) {
        try {
            store.set('registrationForm', { loading: true, error: '' });
            const res = await authApi.signUp(data);
            if (res.status !== 200) {
                let errorMessage;
                switch (res.status) {
                    case 400:
                        errorMessage = 'Некорректные данные';
                        break;
                    case 409:
                        errorMessage = 'Пользователь с таким логином уже существует';
                        break;
                    default:
                        errorMessage = 'Что-то пошло не так';
                }
                throw new Error(errorMessage);
            }
            await this.getUser();
            router.go('/messenger');
        } catch (error) {
            if (error instanceof Error) {
                store.set('registrationForm.errorPage', error.message);
            } else {
                store.set('registrationForm.errorPage', 'Что-то пошло не так');
            }
        } finally {
            store.set('registrationForm.loading', false);
        }
    }

    async signIn(data: Record<(typeof LOGIN_INPUTS)[number], string>) {
        try {
            store.set('loginForm', { loading: true, erorr: '' });
            const res = await authApi.signIn(data);
            if (res.status !== 200) {
                let errorMessage;
                switch (res.status) {
                    case 400:
                        errorMessage = 'Некорректные данные';
                        break;
                    case 401:
                        errorMessage = 'Неверный логин или пароль';
                        break;
                    default:
                        errorMessage = 'Что-то пошло не так';
                }
                throw new Error(errorMessage);
            }
            await this.getUser();
            router.go('/messenger');
        } catch (error) {
            if (error instanceof Error) {
                store.set('loginForm.errorPage', error.message);
            } else {
                store.set('loginForm.errorPage', 'Что-то пошло не так');
            }
        } finally {
            store.set('loginForm.loading', false);
        }
    }

    async signOut() {
        try {
            const res = await authApi.signOut();
            if (res.status !== 200) throw new Error('Failed to sign out');
            store.set('user', null);
            router.go('/');
            ws.close();
        } catch (error) {
            console.error('@signOut: ', error);
        }
    }

    async getUser() {
        try {
            const res = await authApi.getUser();
            if (res.status !== 200) throw new Error('Failed to get user');
            const user = JSON.parse(res.response);
            store.set('user', user);
            ws.setUserId(user.id);
            profileFormController.setFiledsValuesByUserData(user);
        } catch (error) {
            console.error('@getUser: ', error);
        }
    }
}

export default new AuthController();
