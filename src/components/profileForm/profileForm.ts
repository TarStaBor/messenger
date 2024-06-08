import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { Button } from '../button';
import { ProfileFormInput } from './profileFormInput';
import { getProfilePageInputs } from './helpers';
import { profileFormController, passwordFormController } from '../../controllers/formControllers';
import authController from '../../controllers/authController';
import userController from '../../controllers/userController';
import { IProfileForm } from './types';

class ProfileForm extends Block<IProfileForm> {
    constructor(props: IProfileForm) {
        super({
            ...props,
            infoInputs: {
                Component: ProfileFormInput,
                propList: getProfilePageInputs('info'),
            },
            changeInfoInputs: {
                Component: ProfileFormInput,
                propList: getProfilePageInputs('changeInfo'),
            },
            changePasswordInputs: {
                Component: ProfileFormInput,
                propList: getProfilePageInputs('changePassword'),
            },
        });
    }

    protected init(): void {
        const ChangeInfoButton = new Button({
            type: 'button',
            variant: 'primary',
            fill: 'link',
            text: 'Изменить данные',
            align: 'left',
            events: {
                click: this.handleChangeInfoButtonClick.bind(this),
            },
        });
        const ChangePasswordButton = new Button({
            type: 'button',
            variant: 'primary',
            fill: 'link',
            text: 'Изменить пароль',
            align: 'left',
            events: {
                click: this.handleChangePasswordButtonClick.bind(this),
            },
        });
        const LogoutButton = new Button({
            type: 'button',
            variant: 'danger',
            fill: 'link',
            text: 'Выйти',
            align: 'left',
            events: {
                click: authController.signOut,
            },
        });
        const SaveButton = new Button({
            type: 'submit',
            variant: 'primary',
            fill: 'solid',
            text: 'Сохранить',
            align: 'center',
        });

        this.children = {
            ...this.children,
            ChangeInfoButton,
            ChangePasswordButton,
            LogoutButton,
            SaveButton,
        };

        this.setProps({
            events: {
                submit: this.handleSubmit.bind(this),
            },
        });
    }

    handleChangeInfoButtonClick() {
        profileFormController.changeType('changeInfo');
    }

    handleChangePasswordButtonClick() {
        profileFormController.changeType('changePassword');
    }

    async handleSubmit(e: Event) {
        e.preventDefault();
        if (this.props.type === 'changeInfo') {
            const formIsValid = profileFormController.validateForm();
            if (!formIsValid) return;
            const fields = profileFormController.getFieldValues();
            userController.changeUserProfile(fields);
        } else if (this.props.type === 'changePassword') {
            const formIsValid = passwordFormController.validateForm();
            if (!formIsValid) return;
            const fields = passwordFormController.getFieldValues();
            userController.changeUserPassword(fields);
        }
    }

    render() {
        const type = this.props.type;

        const inputs =
            (type === 'info' && this.props.infoInputsKeys) ||
            (type === 'changeInfo' && this.props.changeInfoInputsKeys) ||
            (type === 'changePassword' && this.props.changePasswordInputsKeys) ||
            [];

        const renderInputs = inputs
            .map((key) => `{{{${key}}}} <div class="profileForm__divider"></div>`)
            .join('');

        const renderButtons =
            type !== 'info'
                ? '{{{ SaveButton }}}'
                : `
                    {{{ ChangeInfoButton }}}
                    <div class="profileForm__divider"></div>
                    {{{ ChangePasswordButton }}}
                    <div class="profileForm__divider"></div>
                    {{{ LogoutButton }}}
                    `;

        const profileForm = this.props.profileForm;
        const passwordForm = this.props.passwordForm;
        const login = this.props.user?.login;
        const [error, loading, success] = (type === 'changeInfo' && [
            profileForm?.error,
            profileForm?.loading,
            profileForm?.success,
        ]) ||
            (type === 'changePassword' && [
                passwordForm?.error,
                passwordForm?.loading,
                passwordForm?.success,
            ]) || ['', false, ''];

        return `
            <form class="profileForm ${loading ? 'spinner' : ''}" id="profile-form">
                <h1 class="profileForm__title">${login}</h1>
                ${renderInputs}
                <div class="profileForm_buttons">
                    {{#unless error}}<div class="profileForm__success">${success || ''}</div>{{/unless}}
                    <div class="profileForm__error">${error || ''}</div>
                    ${renderButtons}
                </div>
            </form>
        `;
    }
}

const Connected = connect<IProfileForm>((state) => ({
    type: state.profilePage.type,
    profileForm: {
        error: state.profileForm?.error,
        loading: state.profileForm?.loading,
        success: state.profileForm?.success,
    },
    passwordForm: {
        error: state.passwordForm?.error,
        loading: state.passwordForm?.loading,
        success: state.passwordForm?.success,
    },
    user: {
        login: state.user?.login
    }
}))(ProfileForm);

export { Connected as ProfileForm };
