import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { MessageListItem } from './messageListItem/messageListItem';
import { IMessageList, IMessageListItem } from './types';

class MessageList extends Block<IMessageList> {
    protected componentDidUpdate(oldProps: IMessageList, newProps: IMessageList): boolean {
        if (oldProps.messages?.length === newProps.messages?.length) {
            return false;
        }
        const messages = newProps.messages || [];
        if (!messages?.length) {
            this.children = {};
            return true;
        }

        const componentDict = messages.reduce<Record<string, Block<IMessageListItem>>>(
            (acc, data) => {
                const component = new MessageListItem({ message: data });
                acc[component.id] = component;
                return acc;
            },
            {}
        );
        this.children = { ...componentDict };
        this.setProps({ messagesKeys: Object.keys(componentDict) });
        return true;
    }

    render() {
        return `
            <div class="messageList">
                <ul class="messageList__content">
                    ${this.props.messagesKeys?.map((key) => `{{{ ${key} }}}`).join('') || ''}
                </ul>
            </div>
        `;
    }
}

const Connected = connect<IMessageList>(({ messages }) => ({
    messages,
}))(MessageList);
export { Connected as MessageList };
