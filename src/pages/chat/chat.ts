import Block from "../../core/Block";
import { navigate, PAGES } from "../../core/navigate";
import { mockMessages } from "./const";
import template from "./chat.hbs?raw";

export class Chat extends Block<{}> {
  constructor() {
    super({
      chats: mockMessages,
      isActiveChat: mockMessages.some((el) => el.isActive),
      activeChat: mockMessages.find((el) => el.isActive === true),
      handleError404: (event: Event) => {
        event.preventDefault();
        navigate(PAGES.ERRORPAGE404);
      },
      handleError500: (event: Event) => {
        event.preventDefault();
        navigate(PAGES.ERRORPAGE500);
      },
    });
  }

  protected render(): string {
    return template;
  }
}
