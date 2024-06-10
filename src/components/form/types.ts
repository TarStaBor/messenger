import { CommonProps, ComponentList } from '../../core/Block';
import { IInput } from '../baseInput/types';
import { IButton } from '../button/types';

export interface IForm extends CommonProps {
    title: string;
    id: string;
    inputs?: ComponentList<IInput>;
    buttons: ComponentList<IButton>;
    onSubmit: () => void;
    inputsKeys?: string[];
    buttonsKeys?: string[];
    state?: {
        loading: boolean;
        error?: string;
        success?: string;
    };
}
