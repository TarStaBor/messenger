import Block from '../../../core/Block';
import { connect } from '../../../utils/connect';
import { Icon } from '../../icon';
import { IMessageListItem } from '../types';

class MessageListItem extends Block<IMessageListItem> {
    constructor(props: IMessageListItem) {
        super({
            ...props,
            ReadedIcon: new Icon({
                icon: 'read',
                small: true,
            }),
            UnReadedIcon: new Icon({
                icon: 'unread',
                small: true,
            }),
        });
    }

    render() {
        const content = this.props.message.content;
        const sanitizedContent = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const incomming = this.props.userId !== this.props.message.user_id;
        const icon = this.props.message.is_read ? 'ReadedIcon' : 'UnReadedIcon';
        const date = new Date(this.props.message.time).toLocaleTimeString('ru-RU').slice(0, -3);

        return `
            <div class="messageListItem ${incomming ? 'messageListItem_incoming' : ''} link-opacity">
                ${sanitizedContent}<span class="messageListItem__info"></span>
                <div class="messageListItem__time">
                    ${incomming ? '' : `{{{${icon}}}}`}
                    ${date}
                </div>
            </div>    
        `;
    }
}

const Connected = connect<IMessageListItem>(({ user }) => ({
    userId: user?.id,
}))(MessageListItem);
export { Connected as MessageListItem };
