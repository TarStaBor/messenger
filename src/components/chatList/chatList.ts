import chatController from '../../controllers/chatController';
import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { ChatListItemWidget } from './chatListItem/chatListItem';
import { IChatList, IChatListItem } from './types';

class ChatList extends Block<IChatList> {
    protected componentDidMount(): void {
        chatController.getChats();
    }

    protected componentDidUpdate(oldProps: IChatList, newProps: IChatList): boolean {
        if (
            oldProps.loading === newProps.loading &&
            oldProps.chats?.length === newProps.chats?.length
        ) {
            return false;
        }
        const chats = newProps.chats || [];
        if (!chats?.length) {
            this.children = {};
            return true;
        }

        const componentDict = chats.reduce<Record<string, Block<IChatListItem>>>(
            (acc, data) => {
                const component = new ChatListItemWidget({ ...data });
                acc[component.id] = component;
                return acc;
            },
            {}
        );
        this.children = { ...componentDict };
        this.setProps({ chatsKeys: Object.keys(componentDict) });
        return true;
    }

    render() {
        return `
            <ul>
                ${this.props.chatsKeys?.map((key) => `<li>{{{ ${key} }}}</li>`).join('') || ''}
            </ul>    
        `;
    }
}

const Connected = connect<IChatList>(({ chats }) => ({
    loading: chats.loading,
    chats: chats.list,
}))(ChatList);
export { Connected as ChatList };
