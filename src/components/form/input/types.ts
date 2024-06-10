import { CommonProps } from '../../../core/Block';
import { MyStoreFormNameFields } from '../../../core/store';

export interface IInputField extends CommonProps {
    type: string;
    name: MyStoreFormNameFields;
    required?: boolean;
    errorMessage?: string;
}
