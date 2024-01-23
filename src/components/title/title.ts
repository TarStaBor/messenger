import Block from "../../core/Block";
import template from "./title.hbs?raw";

interface ITitle {
  title: string,
}

export class Title extends Block<ITitle> {
  constructor(props: ITitle) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return template;
  }
}
