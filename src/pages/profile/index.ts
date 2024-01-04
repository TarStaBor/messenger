export { default as Profile } from './profile.hbs?raw';
import Handlebars from "handlebars";
import backArrow from '../../assets/back-arrow.svg'
import avatar from '../../assets/avatar.svg'
import { ProfileInput } from './profile-input/'
import { ProfileButton } from './profile-buttons'


Handlebars.registerPartial('ProfileInput', ProfileInput);
Handlebars.registerPartial('ProfileButton', ProfileButton);

Handlebars.registerHelper('backArrow', () => {
    return backArrow
})

Handlebars.registerHelper('avatar', () => {
    return avatar
})