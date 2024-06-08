import { CommonProps } from '../../core/Block';

export type TProfileForm = 'info' | 'changeInfo' | 'changePassword';
export interface IProfileForm extends CommonProps {
    type: TProfileForm;
    onSubmit?: () => void;
    infoInputsKeys?: string[];
    changeInfoInputsKeys?: string[];
    changePasswordInputsKeys?: string[];
    profileForm?: { error?: string; loading?: boolean; success?: string };
    passwordForm?: { error?: string; loading?: boolean; success?: string };
    success?: string;
    user?: { login?:string }
}
