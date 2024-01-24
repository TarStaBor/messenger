import Block, { Events } from "../../core/Block";
import template from "./profile-button.hbs?raw";

interface IProfileButton {
    label: string,
    exit?: boolean
    events?: Events;
    onClick?: () => void;
}

export class ProfileButton extends Block<IProfileButton> {
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
