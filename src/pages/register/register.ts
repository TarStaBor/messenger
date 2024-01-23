import { InputField } from "../../components";
import Block from "../../core/Block";
import { PAGES, navigate } from "../../core/navigate";
import template from "./register.hbs?raw";
import * as validators from "../../utils/validators";

interface IRegister {}

type TRef = {
  email: InputField;
  login: InputField;
  first_name: InputField;
  second_name: InputField;
  phone: InputField;
  password: InputField;
  repeat_password: InputField;
};

export class Register extends Block<IRegister, TRef> {
  constructor() {
    super({
      validate: {
        email: validators.email,
        login: validators.login,
        first_name: validators.first_name,
        second_name: validators.second_name,
        phone: validators.phone,
        password: validators.password,
        repeat_password: validators.password,
      },
      handleRegister: (event: Event) => {
        event.preventDefault();
        const email = this.refs.email.value();
        const login = this.refs.login.value();
        // eslint-disable-next-line @typescript-eslint/naming-convention,camelcase
        const first_name = this.refs.first_name.value();
        // eslint-disable-next-line @typescript-eslint/naming-convention,camelcase
        const second_name = this.refs.second_name.value();
        const phone = this.refs.phone.value();
        const password = this.refs.password.value();
        // eslint-disable-next-line @typescript-eslint/naming-convention,camelcase
        const repeat_password = this.refs.repeat_password.value();
        if (
        // eslint-disable-next-line camelcase
          !email || !login || !first_name || !second_name || !phone || !password || !repeat_password
        ) return;
        console.log({
          email,
          login,
          // eslint-disable-next-line @typescript-eslint/naming-convention,camelcase
          first_name,
          // eslint-disable-next-line @typescript-eslint/naming-convention,camelcase
          second_name,
          phone,
          password,
        });
        navigate(PAGES.CHAT);
      },
      handleLogin: (event: Event) => {
        event.preventDefault();
        navigate(PAGES.LOGIN);
      },
    });
  }

  protected render(): string {
    return template;
  }
}
