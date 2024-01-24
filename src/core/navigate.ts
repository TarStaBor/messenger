import * as Pages from "../pages";

// eslint-disable-next-line no-shadow
export enum PAGES {
    LOGIN = "login",
    REGISTER = "Register",
    ERRORPAGE404 = "errorpage404",
    ERRORPAGE500 = "errorpage500",
    CHAT = "chat",
    PROFILE_PAGE = "Profile",
    EDIT_PASSWORD = "edit-password",
    EDIT_PROFILE = "edit-profile",
}

type TPages = {
    [key in PAGES]: any;
};

const pages: TPages = {
  [PAGES.LOGIN]: Pages.LoginPage,
  [PAGES.REGISTER]: Pages.Register,
  [PAGES.ERRORPAGE404]: Pages.ErrorPage404,
  [PAGES.ERRORPAGE500]: Pages.ErrorPage500,
  [PAGES.CHAT]: Pages.Chat,
  [PAGES.PROFILE_PAGE]: Pages.Profile,
  [PAGES.EDIT_PASSWORD]: Pages.EditPasswordPage,
  [PAGES.EDIT_PROFILE]: Pages.EditProfilePage,
};

export function navigate(page: string): void {
  const app = document.getElementById("app");

  const Component = pages[page as PAGES];
  const component = new Component({});
  app?.replaceChildren(component.getContent()!);
}
