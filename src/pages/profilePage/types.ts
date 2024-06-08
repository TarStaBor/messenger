import { CommonProps } from '../../core/Block';

export interface IProfilePage extends CommonProps {
    type?: 'info' | 'changeInfo' | 'changePassword';
}
