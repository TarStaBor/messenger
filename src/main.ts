import Handlebars from "handlebars";
import * as Components from "./components";
import { registerComponent } from "./core/registerComponent";
import { PAGES, navigate } from "./core/navigate";
import * as RightSide from "./pages/chat/right-side/right-side";
import * as LeftSideHeader from "./pages/chat/left-side/left-side-header/left-side-header";

Handlebars.registerPartial("FormAuth", Components.FormAuth);

registerComponent("Button", Components.Button);
registerComponent("ChatCard", Components.ChatCard);
registerComponent("ChatList", Components.ChatList);
registerComponent("Title", Components.Title);
registerComponent("Link", Components.Link);
registerComponent("Message", Components.Message);
registerComponent("MessageList", Components.MessageList);
registerComponent("InputField", Components.InputField);
registerComponent("Input", Components.Input);
registerComponent("ProfileButton", Components.ProfileButton);
registerComponent("ErrorValid", Components.ErrorValid);
registerComponent("RightSide", RightSide.RightSide);
registerComponent("LeftSideHeader", LeftSideHeader.LeftSideHeader);

document.addEventListener("DOMContentLoaded", () => navigate(PAGES.LOGIN));

document.addEventListener("click", (e) => {
  const page = e.target.getAttribute("page");
  if (page) {
    if (page === "profile") navigate(PAGES.PROFILE_PAGE);
    if (page === "chat") navigate(PAGES.CHAT);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
