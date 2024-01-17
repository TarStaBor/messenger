import Handlebars from "handlebars";
import Arrow from "../../../../assets/arrow.svg";

export { default as LeftSideHeader } from "./left-side-header.hbs?raw";

Handlebars.registerHelper("arrow", () => Arrow);
