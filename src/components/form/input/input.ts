import { BaseInput } from '../../baseInput';
import { InputField } from './inputField';
import { IInput } from '../../baseInput/types';

export class Input extends BaseInput {
    constructor(props: IInput) {
        super({ ...props, InputFieldClass: InputField });
    }

    render() {
        return `
            <div class="formInputWrapper">
                <label class="formInput">
                   {{{ InputField }}}
                    <div class="formInput__label">{{label}}</div>
                </label>
                <div class="formInputWrapper__error">{{error}}</div>
            </div>
        `;
    }
}
