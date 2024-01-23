import Block from "../../core/Block";
import template from "./message.hbs?raw";

interface IMessage {
  messages: [{ isUser: boolean, message: string }];
  parseMessages: [Object]
}

export class Message extends Block<IMessage> {
  constructor(props: IMessage) {
    super({
      ...props,
    });
  }

  protected render(): string {
    console.log(this.props);
    return template;
  }
}
