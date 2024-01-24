import Block, { Events } from "../../core/Block";
import template from "./link.hbs?raw";

interface ILink {
    label: string,
    onClick?: () => void;
    events?: Events;
}

export class Link extends Block<ILink> {
  constructor(props: ILink) {
    super({
      ...props,
    });
  }

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
