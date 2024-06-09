import Block from '../../core/Block';
import { IIcon } from './types';

export class Icon extends Block<IIcon> {
    render() {
        return `
            <div class="icon">
                <svg width="{{#if small}}12{{else}}24{{/if}}" height="{{#if small}}12{{else}}24{{/if}}">
                    <use xlink:href="#{{icon}}-icon"/>
                </svg>
            </div>
        `;
    }
}
