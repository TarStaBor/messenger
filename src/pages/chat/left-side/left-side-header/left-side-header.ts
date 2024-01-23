import Block from "../../../../core/Block";
import template from "./left-side-header.hbs?raw";

export class LeftSideHeader extends Block<{}> {
  constructor() {
    super({});
  }

  protected render(): string {
    return template;
  }
}
