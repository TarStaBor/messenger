import Block from '../../core/Block';
import { Modal } from '../../components/modal';
import { Button, ChangeAvatar, SetUserAvatarButton } from '../../components';
import { ProfileForm } from '../../components/profileForm';
import router from '../../utils/router';
import userController from '../../controllers/userController';
import { profileFormController } from '../../controllers/formControllers';
import { connect } from '../../utils/connect';
import { IProfilePage } from './types';

class ProfilePage extends Block<IProfilePage> {
    protected init(): void {
        const BackToMainButton = new Button({
            type: 'button',
            variant: 'primary',
            fill: 'solid',
            icon: 'back-arrow',
            asIconButton: true,
            events: {
                click: this.handleGoBackToMain.bind(this),
            },
        });

        const SetUserAvatarButtonComponent = new SetUserAvatarButton({
            events: {
                click: this.handleSetUserAvatarButtonClick.bind(this),
            },
        });

        const Form = new ProfileForm({
            type: 'info',
        });

        const AvatarFormModal = new Modal({
            onClose: this.handleModalClose.bind(this),
            Content: new ChangeAvatar({
                title: 'Загрузите файл',
                onSubmit: this.handleChangeAvatarSubmit.bind(this),
            }),
        });

        this.children = {
            ...this.children,
            BackToMainButton,
            SetUserAvatarButtonComponent,
            Form,
            AvatarFormModal,
        };
    }

    handleSetUserAvatarButtonClick() {
        this.children.AvatarFormModal.setProps({ open: true });
    }

    handleModalClose() {
        this.children.AvatarFormModal.children.Content.setProps({
            error: '',
            file: undefined,
        });
    }

    handleGoBackToMain() {
        if (this.props.type === 'info') {
            router.go('/messenger');
        }
        profileFormController.changeType('info');
    }

    handleChangeAvatarSubmit(data: FormData) {
        userController.changeUserAvatar(data);
    }

    render() {
        return `
            <div>
                <main class="profilePage">
                    <div class="profilePage__leftSide">
                        {{{ BackToMainButton }}}
                    </div>
                    <div class="profilePage__rightSide">
                            {{{ SetUserAvatarButtonComponent }}}
                        {{{ Form }}}
                    </div>
                    {{{ AvatarFormModal }}}
                </main>
            </div>
        `;
    }
}

const ConnectedProfilePage = connect<IProfilePage>(({ profilePage }) => ({
    type: profilePage.type,
}))(ProfilePage);
export { ConnectedProfilePage as ProfilePage };
