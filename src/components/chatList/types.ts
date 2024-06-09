import { CommonProps } from '../../core/Block';
import { ChatListItem } from '../../types/chatItem';

export interface IChatList extends CommonProps {
    chats?: ChatListItem[];
    loading?: boolean;
    chatsKeys?: string[];
}

export interface IChatListItem extends CommonProps, ChatListItem {
    user?: {
        login?:string;
    }
    activeChat?: {
        id?: number;
    };
}
