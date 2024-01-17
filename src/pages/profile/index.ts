import Handlebars from "handlebars";
import backArrow from "../../assets/back-arrow.svg";
import avatar from "../../assets/avatar.svg";
import { ProfileInput } from "./profile-input";
import { ProfileButton } from "./profile-buttons";

export { default as Profile } from "./profile.hbs?raw";

Handlebars.registerPartial("ProfileInput", ProfileInput);
Handlebars.registerPartial("ProfileButton", ProfileButton);

Handlebars.registerHelper("backArrow", () => backArrow);

Handlebars.registerHelper("avatar", () => avatar);
