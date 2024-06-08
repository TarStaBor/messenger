import Block from '../../../core/Block';
import { IInputField } from './types';

export class InputField extends Block<IInputField> {
    render() {
        return `
            <input 
                class="formInput__input {{#if errorMessage}}formInput__input_error{{/if}}" 
                type="{{type}}" 
                name="{{name}}" 
                {{#if required}}required{{/if}}
                value="{{value}}"
                placeholder=""
            />
        `;
    }
}
