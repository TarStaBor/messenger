import Block from '../../core/Block';
import { IModal } from './types';

export class Modal extends Block<IModal> {
    protected init() {
        const onModalClickBind = this.onModalClick.bind(this);
        this.setProps({ events: { click: onModalClickBind } });
    }

    private onModalClick(e: Event) {
        if (e.target === e.currentTarget) {
            this.props.open = false;
            this.props.onClose?.();
        }
    }

    protected componentWillUnmount(): void {
        this.setProps({ open: false });
    }

    render() {
        return `
            <div class="modal {{#if open}}modal_open{{/if}}">
                <div class="modal__content">
                    {{{ Content }}}
                </div>
            </div>
        `;
    }
}
