import Block from '../../../core/Block';
import { ProfileInfoInput } from '../../../types/input';
import { connect } from '../../../utils/connect';
import { IInputField } from './types';

class InputField extends Block<IInputField> {
    init() {
        const fieldName = this.props.name;
        const value = this.props[fieldName as ProfileInfoInput] || '';
        this.setProps({ value });
    }

    render() {
        const fieldName = this.props.name;
        const value = this.props.value || this.props[fieldName] || '';
        return `
            <input class="profileFormInput__input" 
                type="{{type}}"
                name="{{name}}"
                value="${value}"
                {{#if required}}required{{/if}} 
                {{#if disabled}}disabled{{/if}} 
            />
        `;
    }
}

const Connected = connect<IInputField>(({ user }) => ({
    display_name: user?.display_name,
    email: user?.email,
    first_name: user?.first_name,
    login: user?.login,
    phone: user?.phone,
    second_name: user?.second_name,
}))(InputField);
export { Connected as InputField };
