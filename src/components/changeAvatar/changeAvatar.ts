import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { Button } from '../button';
import { IChangeAvatar } from './types';

class ChangeAvatar extends Block<IChangeAvatar> {
    constructor(props: IChangeAvatar) {
        super({
            ...props,
            Button: new Button({
                type: 'submit',
                variant: 'primary',
                fill: 'solid',
                text: 'Поменять',
                align: 'center',
            }),
        });
    }

    init() {
        this.setProps({
            events: {
                submit: this.handleSubmit.bind(this),
                change: this.handleChange.bind(this),
            },
        });
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        this.setProps({ error: '' });
        if (!this.props.file) {
            this.setProps({ error: 'Нужно выбрать файл' });
            return;
        }
        const formData = new FormData();
        formData.append('avatar', this.props.file);
        this.props.onSubmit(formData);
    }

    handleChange(e: Event) {
        const input = e.target as HTMLInputElement;
        if (!input.files) return;
        const file = input.files[0];
        this.setProps({ file });
    }

    render() {
        return `
            <div class="shadow-box">
                <form class="changeAvatar {{#if loading}}spinner{{/if}}" name="change-avatar-form">
                    <h2 class="changeAvatar__title">{{title}}</h2>
                    <div class="changeAvatar__content">
                        {{#if file}}
                            <p class="changeAvatar__success">Файл выбран</p>
                        {{else}}
                            <label class="changeAvatar__select link-opacity">
                                Выбрать файл на компьютере
                                <input type="file" name="avatar" hidden/>
                            </label>
                        {{/if}}
                    </div>
                    <div class="changeAvatar__bottom">
                        {{{ Button }}}
                        {{#if error}}<p class="changeAvatar__error">{{error}}</p>{{/if}}
                    </div>
                </form>
            </div>
        `;
    }
}

const Connected = connect<IChangeAvatar>(({ avatarForm }) => ({
    loading: avatarForm?.loading,
    error: avatarForm?.error,
}))(ChangeAvatar);

export { Connected as ChangeAvatar };
