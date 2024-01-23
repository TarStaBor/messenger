import { InputField } from "../../../components";
import Block from "../../../core/Block";
import { PAGES, navigate } from "../../../core/navigate";
import template from "./edit-profile.hbs?raw";
import * as validators from "../../../utils/validators";

interface IEditProfilePage {}

type TRef = {
  email: InputField;
  login: InputField;
  first_name: InputField;
  second_name: InputField;
  display_name: InputField;
  phone: InputField;
};

export class EditProfilePage extends Block<IEditProfilePage, TRef> {
  constructor() {
    super({
      validate: {
        email: validators.email,
        login: validators.login,
        first_name: validators.first_name,
        second_name: validators.second_name,
        display_name: validators.first_name,
        phone: validators.phone,
      },
      handleSaveChangesClick: (event: Event) => {
        event.preventDefault();
        const email = this.refs.email.value();
        const login = this.refs.login.value();
        // eslint-disable-next-line @typescript-eslint/naming-convention,camelcase
        const first_name = this.refs.first_name.value();
        // eslint-disable-next-line @typescript-eslint/naming-convention,camelcase
        const second_name = this.refs.second_name.value();
        // eslint-disable-next-line @typescript-eslint/naming-convention,camelcase
        const display_name = this.refs.display_name.value();
        const phone = this.refs.phone.value();
        // eslint-disable-next-line camelcase
        if (!email || !login || !first_name || !second_name || !display_name || !phone) {
          return;
        }
        console.log({
          email,
          login,
          // eslint-disable-next-line camelcase
          first_name,
          // eslint-disable-next-line camelcase
          second_name,
          // eslint-disable-next-line camelcase
          display_name,
          phone,
        });
        navigate(PAGES.PROFILE_PAGE);
      },
    });
  }

  protected render(): string {
    return template;
  }
}
