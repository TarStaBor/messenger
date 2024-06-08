import { IInput } from '../baseInput/types';
import { changePasswordInputs, infoInputs } from './consts';

export const getProfilePageInputs = (
    type: 'info' | 'changeInfo' | 'changePassword',
): IInput[] => {
    switch (type) {
        case 'info': {
            return infoInputs.map((input) => ({
                ...input,
                disabled: true,
            }));
        }
        case 'changeInfo': {
            return infoInputs.map((input) => ({
                ...input,
            }));
        }
        case 'changePassword': {
            return changePasswordInputs;
        }
        default: {
            const foo: never = type;
            return foo;
        }
    }
};
