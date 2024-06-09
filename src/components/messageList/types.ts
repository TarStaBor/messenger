import { CommonProps } from '../../core/Block';
import { WSMessage } from '../../types/message';

export interface IMessageList extends CommonProps {
    messages?: WSMessage[];
    messagesKeys?: string[];
}

export interface IMessageListItem extends CommonProps {
    message: WSMessage;
    userId?: number;
}
