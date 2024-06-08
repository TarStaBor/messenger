import { CommonProps } from '../../../core/Block';
import { ProfileInfoInput } from '../../../types/input';
import { MyStoreFormNameFields } from '../../../core/store';
import { User } from '../../../types/user';

export interface IInputField extends CommonProps, Record<ProfileInfoInput, string | undefined> {
    type: string;
    name: MyStoreFormNameFields;
    value?: string;
    required?: boolean;
    disabled?: boolean;
    errorMessage?: string;
    user?: User | null;
}
