import { User } from '../types/user';
import HTTPTransport from '../utils/HTTPTransport';

const AuthApiInstance = new HTTPTransport('api/v2/auth/');

export type SignUpData = Pick<User, 'first_name' | 'second_name' | 'login' | 'email' | 'phone'> & {
    password: string;
};

export type SignInData = Pick<User, 'login'> & {
    password: string;
};

class AuthApi {
    signUp(data: SignUpData) {
        return AuthApiInstance.post('signup', { data });
    }

    signIn(data: SignInData) {
        return AuthApiInstance.post('signin', { data });
    }

    signOut() {
        return AuthApiInstance.post('logout');
    }

    getUser() {
        return AuthApiInstance.get('user');
    }
}

export default AuthApi;
