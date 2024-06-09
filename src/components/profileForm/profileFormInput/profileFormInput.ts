import { BaseInput } from '../../baseInput';
import { InputField } from './inputField';
import { IInput } from '../../baseInput/types';

export class ProfileFormInput extends BaseInput {
    constructor(props: IInput) {
        super({ ...props, InputFieldClass: InputField });
    }

    render() {
        return `
            <label class="profileFormInput {{#if error}}profileFormInput_error{{/if}}">
                <span class="profileFormInput__label">{{label}}</span>
                {{{ InputField }}}
                <div class="profileFormInput__error">{{error}}</div>
            </label>
        `;
    }
}
