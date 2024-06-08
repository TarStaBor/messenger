import { User } from '../types/user';
import HTTPTransport from '../utils/HTTPTransport';

const UserApiInstance = new HTTPTransport('api/v2/user/');

export type ChangeProfileData = Pick<
User,
'first_name' | 'second_name' | 'display_name' | 'login' | 'email' | 'phone'
>;

export type ChangePasswordData = {
    oldPassword: string;
    newPassword: string;
};

class UserApi {
    changeUserProfile(data: ChangeProfileData) {
        return UserApiInstance.put('profile', { data });
    }

    changeUserAvatar(data: FormData) {
        return UserApiInstance.put('profile/avatar', {
            data,
        });
    }

    changeUserPassword(data: ChangePasswordData) {
        return UserApiInstance.put('password', { data });
    }

    userSearch(data: { login: string }) {
        return UserApiInstance.post('search', { data });
    }
}

export default UserApi;
