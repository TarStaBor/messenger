import Block, { CommonProps } from '../../core/Block';

interface IChatSearchInput extends CommonProps { }

export class ChatSearchInput extends Block<IChatSearchInput> {
    constructor(props: IChatSearchInput) {
        super({
            ...props,
        });
    }

    render() {
        return `
            <form class="chatSearchInput {{#if loading}}spinner{{/if}}" id="chat-search-input">
                <input class="chatSearchInput__input" type="text" name="message" placeholder="Поиск" />
            </form>
        `;
    }
}
