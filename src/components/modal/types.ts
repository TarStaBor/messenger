import Block, { CommonProps } from '../../core/Block';

export interface IModal extends CommonProps {
    open?: boolean;
    onClose?: () => void;
    Content: Block<CommonProps>;
}
