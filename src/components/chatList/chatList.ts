import Block from "../../core/Block";
import template from "./chatList.hbs?raw";

interface IChatList {
  chatName: string;
  messages: [Object];
  time: string;
  countUnread?: number;
  isActive: boolean;
}

export class ChatList extends Block<IChatList> {
  constructor(props: IChatList) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return template;
  }
}
