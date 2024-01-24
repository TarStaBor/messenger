import Block, { Events } from "../../core/Block";
import authInput from "./authInput.hbs?raw";
import profileInput from "./profileInput.hbs?raw";
import chatInput from "./chatInput.hbs?raw";

interface IInput {
  type: "email" | "password" | "text",
  name: string,
  env: "auth" | "profile" | "chat";
  placeholder?: string,
  onBlur: () => void;
  events: Events;
}

export class Input extends Block<IInput> {
  constructor(props: IInput) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  protected render(): string {
    if (this.props.env === "auth") {
      return authInput;
    }
    if (this.props.env === "chat") {
      return chatInput;
    }
    return profileInput;
  }
}
