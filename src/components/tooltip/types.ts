import Block, { CommonProps } from '../../core/Block';

export interface ITooltip extends CommonProps {
    trigger?: HTMLElement | null;
    onHide?: () => void;
    Content: Block<CommonProps>;
}
