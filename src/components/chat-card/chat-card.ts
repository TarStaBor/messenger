import Block from "../../core/Block";
import template from "./chat-card.hbs?raw";

interface IChatCard {
  chatName: string;
  messages: [{ isUser: boolean, message: string }];
  time: string;
  countUnread?: number;
  isActive?: boolean;
  lastMessage: string;
}

export class ChatCard extends Block<IChatCard> {
  constructor(props: IChatCard) {
    super({
      ...props,
      // @ts-ignore
      lastMessage: props.messages[props.messages.length - 1].message,
    });
  }

  protected render(): string {
    return template;
  }
}
