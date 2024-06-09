import { LOGIN_INPUTS, PASSWORD_INPUTS, PROFILE_INFO_INPUTS, REGISTRATION_INPUTS } from '../constants';

export type LoginInput = typeof LOGIN_INPUTS[number];
export type RegistrationInput = typeof REGISTRATION_INPUTS[number];
export type ProfileInfoInput = typeof PROFILE_INFO_INPUTS[number];
export type PasswordInput = typeof PASSWORD_INPUTS[number];
export type NewChatInput = 'title';
export type AddUserInput = 'name';
export type RemoveUserInput = 'name';
