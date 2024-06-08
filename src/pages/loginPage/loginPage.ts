import Block from '../../core/Block';
import { Form } from '../../components';
import { getLoginPageContext } from './helpers';
import { connect } from '../../utils/connect';
import { MyStore } from '../../core/store';
import { ILoginPage } from './types';
import { IForm } from '../../components/form/types';

export class LoginPage extends Block<ILoginPage> {
    init() {
        const mapLoginFormState = ({ loginForm }: MyStore) => {
            return { loading: loginForm?.loading, error: loginForm?.error };
        };
        const LoginForm = connect<IForm>(mapLoginFormState)(Form);

        const mapRegistrationFormState = ({ registrationForm }: MyStore) => {
            return { loading: registrationForm?.loading, error: registrationForm?.error };
        };
        const RegistrationForm = connect<IForm>(mapRegistrationFormState)(Form);

        this.children = {
            ...this.children,
            LoginForm: new LoginForm(getLoginPageContext('login')),
            RegistrationForm: new RegistrationForm(getLoginPageContext('registration')),
        };
    }

    render(): string {
        const FormType = this.props.type === 'login' ? 'LoginForm' : 'RegistrationForm';
        return `
                <main class="loginPage">
                        <div class="loginPage__form">
                            {{{${FormType}}}}
                        </div>
                </main>
        `;
    }
}

const Connected = connect<ILoginPage>(({ user }) => ({
    userId: user?.id,
}))(LoginPage);
export { Connected as ChatsPage };
