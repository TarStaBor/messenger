import { CommonProps } from '../../core/Block';
import { ChatListItem } from '../../types/chatItem';

export interface IChatSection extends CommonProps {
    userId?: number;
    activeChat?: Partial<Pick<ChatListItem, 'id' | 'title' | 'avatar'>>;
}
