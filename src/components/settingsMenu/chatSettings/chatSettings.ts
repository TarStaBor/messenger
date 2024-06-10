import Block from '../../../core/Block';
import { Button } from '../../button';
import { chatSettingsButtons } from './consts';
import { IChatSettings } from '../types';

export class ChatSettings extends Block<IChatSettings> {
    constructor(props: IChatSettings) {
        const buttons = chatSettingsButtons.reduce(
            (acc, data) => {
                const component = new Button(data);
                acc[component.id] = component;
                return acc;
            },
            {} as Record<string, Button>
        );

        super({
            ...props,
            buttonsKeys: Object.keys(buttons),
            ...buttons,
        });
    }

    render() {
        const keys = this.props.buttonsKeys || [];
        const renderButtons = keys
            .map((key) => `<li>{{{ ${key} }}}</li>`)
            .join('');

        return `
            <div class="chatSettings">
                <div class="shadow-box shadow-box_small-padding">
                    <ul class="chatSettings__list">
                        ${renderButtons}
                    </ul>
                </div>
            </div>    
        `;
    }
}
