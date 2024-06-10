import Block from '../../core/Block';
import { Icon } from '../icon';
import { IButton } from './types';

export class Button extends Block<IButton> {
    constructor(props: IButton) {
        super({
            ...props,
            Icon: props.icon ? new Icon({ icon: props.icon }) : undefined,
        });
    }

    render(): string {
        return `
            <button 
                {{#if id}}id="{{id}}"{{/if}} 
                type="{{type}}" 
                    class="
                    button button__variant_{{variant}} 
                    button__fill_{{fill}} 
                    {{#if align}}button__align_{{align}}{{/if}} 
                    {{#if asIconButton}}button__with-icon{{/if}} 
                    {{#if iconLast}}button__icon-last{{/if}}
                    link-opacity
                "
            >
                {{#if icon}}
                    <div class="mainButton__icon">
                        {{{ Icon }}}
                    </div>
                {{/if}}
                {{text}}
                
            </button>
        `;
    }
}
