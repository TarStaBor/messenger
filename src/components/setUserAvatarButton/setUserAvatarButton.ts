import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { Avatar } from '../avatar';
import { ISetUserAvatarButton } from './types';

class SetUserAvatarButton extends Block<ISetUserAvatarButton> {
    constructor(props: ISetUserAvatarButton) {
        super({
            ...props,
            Avatar: new Avatar({
                src: props.src,
                name: props.name || '',
            }),
        });
    }

    protected componentDidUpdate(
        oldProps: ISetUserAvatarButton,
        newProps: ISetUserAvatarButton
    ): boolean {
        if (oldProps.src === newProps.src) {
            return false;
        }
        this.children.Avatar.setProps({ src: newProps.src });
        return true;
    }

    render() {
        return `
            <button class="setUserAvatarButton" type="button" >
                {{{ Avatar }}}
                <div class="setUserAvatarButton__overlay">Поменять аватар</div>
            </button>    
        `;
    }
}

const Connected = connect<ISetUserAvatarButton>((state) => ({
    src: state.user?.avatar,
    name: state.user?.first_name,
}))(SetUserAvatarButton);

export { Connected as SetUserAvatarButton };
