import { InputField } from "../../components";
import Block from "../../core/Block";
import { PAGES, navigate } from "../../core/navigate";
import * as validators from "../../utils/validators";
import template from "./login.hbs?raw";

interface ILoginPage {}

type TRef = {
  login: InputField;
  password: InputField;
};

export class LoginPage extends Block<ILoginPage, TRef> {
  constructor() {
    super({
      validate: {
        login: validators.login,
        password: validators.password,
      },
      handleLogin: (event: Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();

        if (!login || !password) return;
        console.log({
          login,
          password,
        });
        navigate(PAGES.CHAT);
      },
      handleRegister: (event: Event) => {
        event.preventDefault();
        navigate(PAGES.REGISTER);
      },
    });
  }

  protected render(): string {
    return template;
  }
}
