import chatController from '../../../controllers/chatController';
import Block from '../../../core/Block';
import { connect } from '../../../utils/connect';
import { ChangeAvatar } from '../../changeAvatar';
import { IChangeChatAvatarForm } from '../types';

class ChangeChatAvatarForm extends Block<IChangeChatAvatarForm> {
    init() {
        const FormComponent = new ChangeAvatar({
            title: 'Загрузите файл',
            onSubmit: this.handleSubmit.bind(this),
        });
        this.children = {
            FormComponent,
        };
    }

    handleSubmit(data: FormData) {
        if (!this.props.activeChatId) return;
        data.append('chatId', this.props.activeChatId?.toString() || '');
        chatController.changeChatAvatar(data);
    }

    render() {
        return `
            <div class="chatSettingsForm">
                {{{ FormComponent }}}
            </div>
        `;
    }
}

const Connected = connect<IChangeChatAvatarForm>(({ activeChat }) => ({
    activeChatId: activeChat?.id,
}))(ChangeChatAvatarForm);
export { Connected as ChangeChatAvatarForm };
