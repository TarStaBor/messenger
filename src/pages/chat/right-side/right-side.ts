import Block from "../../../core/Block";
import stub from "./stub.hbs?raw";
import conversation from "./conversation.hbs?raw";

interface IRightSide {
  isActiveChat: boolean
  activeChat: object
  parseMessages: object
}

export class RightSide extends Block<IRightSide> {
  constructor(props: IRightSide) {
    super({
      ...props,
    });
  }

  protected render(): string {
    if (this.props.isActiveChat) {
      return conversation;
    }
    return stub;
  }
}

// На будущее
// {{#MessageList activeChat=activeChat}}
// {{/MessageList}}
