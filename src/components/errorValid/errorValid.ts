import Block from "../../core/Block";
import template from "./errorValid.hbs?raw";

interface IErrorValid {
  error?: string,
}

export class ErrorValid extends Block<IErrorValid> {
  constructor(props: IErrorValid) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return template;
  }
}
