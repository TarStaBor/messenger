import { CommonProps } from '../../core/Block';
import { MyStoreFormName, MyStoreFormNameFields } from '../../core/store';

export interface IInput extends CommonProps {
    type: string;
    name: MyStoreFormNameFields;
    label: string;
    error?: string;
    storeFormName: MyStoreFormName;
    validationRules?: {
        rule: (value: string) => boolean;
        message: string;
    }[];
    onBlur: ({ name, value }: { name: MyStoreFormNameFields; value: string }) => void;
}

export interface IInputField extends CommonProps {
    type: string;
    name: MyStoreFormNameFields;
    required?: boolean;
    errorMessage?: string;
}
