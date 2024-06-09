import { CommonProps } from '../../core/Block';

export interface IChangeAvatar extends CommonProps {
    file?: File;
    loading?: boolean;
    error?: string;
    noFileClick?: boolean;
    title: string;
    onSubmit: (data: FormData) => void;
}
