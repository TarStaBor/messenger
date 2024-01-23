import Block from "../../core/Block";
import template from "./messageList.hbs?raw";

interface IMessageList {
  chatName: string;
  messages: [Object];
  time: string;
  countUnread?: number;
  isActive: boolean;
}

export class MessageList extends Block<IMessageList> {
  constructor(props: IMessageList) {
    super({
      ...props,
      parseMessages: props.activeChat.messages,
    });
  }

  protected render(): string {
    return template;
  }
}
