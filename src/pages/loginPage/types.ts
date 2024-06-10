import { IForm } from '../../components/form/types';

export interface ILoginPage extends IForm {
    type: 'login' | 'registration';
    userId?: number;
}
