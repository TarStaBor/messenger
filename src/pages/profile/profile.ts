import Block from "../../core/Block";
import { navigate, PAGES } from "../../core/navigate";
import template from "./profile.hbs?raw";

export class Profile extends Block<{}> {
  constructor() {
    super({
      handleEditProfile: (event: Event) => {
        event.preventDefault();
        navigate(PAGES.EDIT_PROFILE);
      },
      handleEditPassword: (event: Event) => {
        event.preventDefault();
        navigate(PAGES.EDIT_PASSWORD);
      },
      handleLogout: (event: Event) => {
        event.preventDefault();
        navigate(PAGES.LOGIN);
      },
    });
  }

  protected render(): string {
    return template;
  }
}
