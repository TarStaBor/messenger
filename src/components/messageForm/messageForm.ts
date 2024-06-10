import Block, { CommonProps } from '../../core/Block';
import { ws } from '../../core/ChatWebSocket';
import { Button } from '../button';

export class MessageForm extends Block<CommonProps> {
    init() {
        this.setProps({
            events: {
                submit: (event: Event) => {
                    event.preventDefault();
                    const form = document.getElementById('message-form') as HTMLFormElement;
                    const input = form.elements.namedItem('message') as HTMLInputElement;
                    if (input.value) {
                        ws.sendMessage(input.value);
                        input.value = '';
                    }
                },
            },
        });

        this.children = {
            SendMessageButton: new Button({
                type: 'submit',
                variant: 'primary',
                fill: 'ghost',
                icon: 'send-arrow',
                asIconButton: true,
            }),
        };
    }

    render() {
        return `
            <form class="messageForm" id="message-form">
                <input class="messageForm__input" type="text" name="message" placeholder="Сообщение"
                    autocomplete="off" />
                {{{ SendMessageButton }}}
            </form>
        `;
    }
}
