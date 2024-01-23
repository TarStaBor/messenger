import Block from "../../core/Block";
import { navigate, PAGES } from "../../core/navigate";
import template from "./error-page404.hbs?raw";

export class ErrorPage404 extends Block<{}> {
  constructor() {
    super({
      handleChat: (event: Event) => {
        event.preventDefault();
        navigate(PAGES.CHAT);
      },
    });
  }

  protected render(): string {
    return template;
  }
}
