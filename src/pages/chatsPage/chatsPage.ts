import Block from '../../core/Block';
import router from '../../utils/router';
import { ChatSearchInput } from '../../components/chatSearchInput';
import { Button, ChatSection, ChatList } from '../../components';
import { connect } from '../../utils/connect';
import { Modal } from '../../components/modal';
import { NewChatForm } from '../../components/newChatForm';
import { newChatFormController } from '../../controllers/formControllers';
import { IChatsPage } from './types';

class ChatsPage extends Block<IChatsPage> {
    init() {
        this.children = {
            ...this.children,
            GoToProfileButton: new Button({
                type: 'button',
                variant: 'medium',
                fill: 'ghost',
                icon: 'send-arrow',
                text: 'Профиль',
                align: 'right',
                iconLast: true,
                events: {
                    click: () => router.go('/settings'),
                },
            }),
            CreateGroupButton: new Button({
                type: 'button',
                variant: 'primary',
                fill: 'solid',
                text: 'Создать группу',
                events: {
                    click: this.handleCreateGroupButtonClick.bind(this),
                },
            }),
            ChatList: new ChatList({}),
            ChatSearchInput: new ChatSearchInput({}),
            CreateChatFormModal: new Modal({
                Content: new NewChatForm({}),
                onClose: () => newChatFormController.resetForm(),
            }),
            ChatSection: new ChatSection({}),
        };
    }

    handleCreateGroupButtonClick() {
        this.children.CreateChatFormModal.setProps({ open: true });
    }

    protected componentDidMount(): void {
        if (!this.props.userId) {
            router.go('/sign-in');
        }
    }

    render() {
        return `
            <div>
            <main class="chatsPage">
                <div class="chatsPage__leftSide">
                    <div class="chatsPage__buttonWrapper">
                        {{{ GoToProfileButton }}}
                    </div>
                    {{{ ChatSearchInput }}}
                    <div class="chatsPage__buttonWrapper">
                        {{{ CreateGroupButton }}}
                    </div>
                    {{{ ChatList }}}
                </div>
                <div class="chatsPage__rightSide">
               
                    {{#if activeChatId}}
                        {{{ ChatSection }}}
                    {{else}}
                        <div class="chatsPage__choice">
                            <p class="chatsPage__choiceText">Выберите чат чтобы отправить сообщение</p>
                        </div
                    {{/if}}
                </div>
            </main>
            {{{ CreateChatFormModal }}}
            </div>
        `;
    }
}

const Connected = connect<IChatsPage>(({ user, activeChat }) => ({
    userId: user?.id,
    activeChatId: activeChat?.id,
}))(ChatsPage);
export { Connected as ChatsPage };
