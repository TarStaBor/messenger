import chatController from '../../../controllers/chatController';
import Block from '../../../core/Block';
import { connect } from '../../../utils/connect';
import { formatDate } from '../../../utils/formatDate';
import { Avatar } from '../../avatar';
import { IChatListItem } from '../types';

class ChatListItemWidget extends Block<IChatListItem> {
    init() {
        this.children = {
            ChatAvatar: new Avatar({
                name: this.props.title,
                src: this.props.avatar,
            }),
        };
        this.setProps({
            events: {
                click: this.handleChatClick.bind(this),
            },
        });
    }

    handleChatClick() {
        chatController.setActiveChat(this.props.id);
    }

    render() {
        const lastMessageTime = formatDate(this.props.last_message?.time);
        const activeClass =
            this.props.activeChat?.id === this.props.id ? 'chatListItem_active' : '';
        const fromUserLogin = this.props.user?.login === this.props.last_message?.user.login
            ? 'Вы'
            : this.props.last_message?.user.login;

        return `
            <button type="button" class="chatListItem ${activeClass}">
                <div class="chatListItem__avatar">
                    {{{ ChatAvatar }}}
                </div>
                <div class="chatListItem__card">
                    <div class="chatListItem__info">
                        <h3 class="chatListItem__name">{{title}}</h3>
                        <p class="chatListItem__date">${lastMessageTime}</p>
                    </div>
                    <div class="chatListItem__divider">
                        {{#if last_message}}
                            <p>
                                {{#if last_message}}
                                    <span class="chatListItem__from">${fromUserLogin}:</span>
                                {{/if}}
                                <span class="chatListItem__text">{{last_message.content}}</span>
                            </p>                      
                        {{/if}}    
                        {{#if unread_count}}
                            <p class="chatListItem__counter">{{unread_count}}</p>
                        {{/if}}
                    </div>
                </div>
            </li>
        `;
    }
}

const Connected = connect<IChatListItem>(({ user, activeChat }) => ({
    user: { login: user?.login },
    activeChat: { id: activeChat?.id },
}))(ChatListItemWidget);
export { Connected as ChatListItemWidget };
