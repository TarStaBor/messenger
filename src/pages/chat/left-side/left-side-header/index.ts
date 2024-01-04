export { default as LeftSideHeader } from './left-side-header.hbs?raw';
import Handlebars from "handlebars";
import Arrow from '../../../../assets/arrow.svg'

Handlebars.registerHelper('arrow', () => {
    return Arrow
})