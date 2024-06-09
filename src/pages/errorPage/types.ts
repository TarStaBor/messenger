import { CommonProps } from '../../core/Block';

export interface IErrorPage extends CommonProps {
    code: number;
    text?: string;
}
