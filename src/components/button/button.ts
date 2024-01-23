import Block, { Events } from "../../core/Block";
import template from "./button.hbs?raw";

interface IButton {
  label: string;
  type: string,
  events?: Events;
  onClick?: () => void;
}

export class Button extends Block<IButton> {
  protected init(): void {
    if (this.props.onClick) {
      this.props.events = {
        click: this.props.onClick,
      };
    }
  }

  protected render(): string {
    return template;
  }
}
