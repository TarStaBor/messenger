import { CommonProps } from '../../core/Block';
import { TIcon } from '../icon/types';

export interface IButton extends CommonProps {
    text?: string;
    variant: 'primary' | 'medium' | 'success' | 'danger';
    fill: 'solid' | 'link' | 'ghost';
    align?: 'left' | 'center' | 'right';
    icon?: TIcon;
    iconLast?: boolean;
    asIconButton?: boolean;
    id?: string;
}
