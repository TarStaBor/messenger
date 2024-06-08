import { User } from './user';

export interface ApiMessage {
    user: User;
    time: string;
    content: string;
}

export type WSMessage = {
    id: number;
    user_id: number;
    chat_id: number;
    type: 'message';
    time: string;
    content: string;
    is_read: boolean;
    file: null | string;
};
