import { InputField } from "../../../components";
import Block from "../../../core/Block";
import { PAGES, navigate } from "../../../core/navigate";
import * as validators from "../../../utils/validators";
import template from "./edit-password.hbs?raw";

interface IEditPasswordPage {}

type TRef = {
  oldPassword: InputField;
  newPassword: InputField;
  repeatNewPassword: InputField;
};

export class EditPasswordPage extends Block<IEditPasswordPage, TRef> {
  constructor() {
    super({
      validate: {
        oldPassword: validators.password,
        newPassword: validators.password,
        repeatNewPassword: validators.password,
      },

      handleSaveChangesClick: () => {
        const oldPassword = this.refs.oldPassword.value();
        const newPassword = this.refs.newPassword.value();
        const repeatNewPassword = this.refs.repeatNewPassword.value();
        if (!oldPassword || !newPassword || !repeatNewPassword) return;
        console.log({
          oldPassword,
          newPassword,
          repeatNewPassword,
        });
        navigate(PAGES.PROFILE_PAGE);
      },
    });
  }

  protected render(): string {
    return template;
  }
}
