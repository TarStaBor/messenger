import { PASSWORD_INPUTS, PROFILE_INFO_INPUTS } from '../constants';
import { profileFormController } from './formControllers';
import { User } from '../types/user';
import store from '../core/store';
import UserApi from '../api/user-api';

const userApi = new UserApi();

class UserController {
    async changeUserProfile(data: Record<(typeof PROFILE_INFO_INPUTS)[number], string>) {
        try {
            store.set('profileForm', { loading: true, error: '' });
            const res = await userApi.changeUserProfile(data);
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
            const user = JSON.parse(res.response);
            store.set('user', user);
            store.set('profileForm', { success: 'Данные успешно изменены' });
            setTimeout(() => {
                store.set('profileForm', { success: '' });
                store.set('profilePage', { type: 'info' });
            }, 2000);
        } catch (error) {
            if (error instanceof Error) {
                store.set('profileForm.errorPage', error.message);
            } else {
                store.set('profileForm.errorPage', 'Что-то пошло не так');
            }
        } finally {
            store.set('profileForm.loading', false);
        }
    }

    async changeUserPassword(data: Record<(typeof PASSWORD_INPUTS)[number], string>) {
        try {
            store.set('passwordForm', { loading: true, error: '' });
            const res = await userApi.changeUserPassword({
                oldPassword: data.oldPassword,
                newPassword: data.password,
            });
            if (res.status !== 200) {
                let errorMessage;
                switch (res.status) {
                    case 400:
                        errorMessage = 'Некорректные данные';
                        break;
                    case 401:
                        errorMessage = 'Неверный пароль';
                        break;
                    default:
                        errorMessage = 'Что-то пошло не так';
                }
                throw new Error(errorMessage);
            }
            store.set('passwordForm', { success: 'Пароль успешно изменен' });
            setTimeout(() => {
                store.set('passwordForm', { success: '' });
                store.set('profilePage', { type: 'info' });
            }, 2000);
        } catch (error) {
            if (error instanceof Error) {
                store.set('passwordForm.errorPage', error.message);
            } else {
                store.set('passwordForm.errorPage', 'Что-то пошло не так');
            }
        } finally {
            store.set('passwordForm.loading', false);
        }
    }

    async searchUser(data: { login: string }) {
        try {
            const res = await userApi.userSearch(data);
            if (res.status !== 200) throw new Error('Failed to get user');
            const users = JSON.parse(res.response);
            return users as User[];
        } catch (error) {
            console.error('@searchUser: ', error);
            return null;
        }
    }

    async changeUserAvatar(data: FormData) {
        try {
            store.set('avatarForm', { loading: true, error: '' });
            const res = await userApi.changeUserAvatar(data);
            if (res.status !== 200) {
                let errorMessage;
                switch (res.status) {
                    case 400:
                        errorMessage = 'Некорректные данные';
                        break;
                    default:
                        errorMessage = 'Что-то пошло не так';
                }
                throw new Error(errorMessage);
            }
            const user = JSON.parse(res.response);
            store.set('user', user);
            profileFormController.setFiledsValuesByUserData(user);
        } catch (error) {
            if (error instanceof Error) {
                store.set('avatarForm.errorPage', error.message);
            } else {
                store.set('avatarForm.errorPage', 'Что-то пошло не так');
            }
        } finally {
            store.set('avatarForm.loading', false);
        }
    }
}

export default new UserController();
