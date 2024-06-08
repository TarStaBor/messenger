import { CommonProps } from '../../core/Block';

export type TIcon =
    'back-arrow' |
    'send-arrow' |
    'read' |
    'unread' |
    'dots' |
    'remove' |
    'add' |
    'settings';

export interface IIcon extends CommonProps {
    icon: TIcon;
    small?: boolean;
}
