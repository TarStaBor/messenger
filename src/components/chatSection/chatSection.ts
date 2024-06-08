import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { SettingsMenu } from '../settingsMenu';
import { Avatar } from '../avatar';
import { MessageList } from '../messageList';
import { MessageForm } from '../messageForm';
import { IAvatar } from '../avatar/types';
import { IChatSection } from './types';

class ChatSection extends Block<IChatSection> {
    init() {
        const ChatAvatar = connect<IAvatar>(({ activeChat }) => ({ src: activeChat?.avatar }))(
            Avatar
        );

        this.children = {
            ...this.children,
            SettingMenu: new SettingsMenu({
                settingType: 'group',
            }),
            ChatAvatar: new ChatAvatar({}),
            MessageList: new MessageList({}),
            MessageFormProps: new MessageForm({}),
        };
    }

    render() {
        return `
            <div class="chatSection">
                <div class="chatSection__header">
                    <div class="chatSection__header-info">
                        <div class="chatSection__avatar">
                            {{{ ChatAvatar }}}
                        </div>
                        <h1 class="chatSection__title">{{activeChat.title}}</h2>
                    </div>
                    {{{ SettingMenu }}}
                </div>
                {{{ MessageList }}}
                <div class="chatSection__bottom">
                    {{{ MessageFormProps }}}
                </div>
            </div>
        `;
    }
}

const Connected = connect<IChatSection>(({ user, activeChat }) => ({
    userId: user?.id,
    activeChat: {
        id: activeChat?.id,
        title: activeChat?.title,
        avatar: activeChat?.avatar,
    },
}))(ChatSection);
export { Connected as ChatSection };
