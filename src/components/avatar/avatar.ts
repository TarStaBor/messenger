import { RESOURCES_HOST } from '../../constants';
import Block from '../../core/Block';
import { IAvatar } from './types';

export class Avatar extends Block<IAvatar> {
    constructor(props: IAvatar) {
        super({ ...props });
    }

    render() {
        const src = RESOURCES_HOST + this.props.src;
        return `
          <div class="avatar {{#unless src}}avatar__image_empty{{/unless}}">
              {{#if src}}
                  <img class="avatar__image" src="${src}" alt="Аватар {{name}}" />
              {{/if}}
          </div>
        `;
    }
}
