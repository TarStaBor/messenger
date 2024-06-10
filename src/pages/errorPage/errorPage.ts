import { Button } from '../../components';
import Block from '../../core/Block';
import router from '../../utils/router';
import { IErrorPage } from './types';

export class ErrorPage extends Block<IErrorPage> {
    constructor(props: IErrorPage) {
        super({
            ...props,
            text: props.code === 404 ? 'Не туда попали' : 'Мы уже фиксим',
            Button: new Button({
                type: 'button',
                variant: 'primary',
                fill: 'link',
                text: 'Назад к чатам',
                align: 'center',
                events: {
                    click: () => router.go('/messenger'),
                },
            }),
        });
    }

    render() {
        return `
            <main class="errorPage">
                <h1 class="errorPage__status">{{code}}</h1>
                <p class="errorPage__errorText">{{text}}</p>
                {{{ Button }}}
            </main>
        `;
    }
}
