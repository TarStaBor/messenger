import Block from "../../core/Block";
import { ErrorValid } from "../errorValid/errorValid";
import { Input } from "../input/input";
import authInputField from "./authInputField.hbs?raw";
import profileInputField from "./profileInputField.hbs?raw";
import chatInputField from "./chatInputField.hbs?raw";

interface IInputField {
  name: string,
  label: string,
  type: "email" | "password" | "text",
  placeholder?: string;
  disabled?: boolean;
  env: "auth" | "profile" | "chat";
  onBlur: () => void;
  validate: (value: string) => boolean | string
}

type Refs = {
  input: Input,
  error: ErrorValid,
}

export class InputField extends Block<IInputField, Refs> {
  constructor(props: IInputField) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
  }

  public value() {
    if (!this.validate()) {
      return null;
    }
    const element = this.refs.input.element as HTMLInputElement;
    return element.value;
  }

  private validate() {
    const element = this.refs.input.element as HTMLInputElement;
    const { value } = element;
    const error = this.props.validate(value);
    if (error) {
      this.refs.error.setProps({ error });
      return false;
    }
    this.refs.error.setProps({ error: undefined });
    return true;
  }

  protected render(): string {
    if (this.props.env === "auth") {
      return authInputField;
    }
    if (this.props.env === "chat") {
      return chatInputField;
    }
    return profileInputField;
  }
}
