import { PROFILE_INFO_INPUTS } from '../constants';
import { FormController } from '../core/FormController';
import { User } from '../types/user';
import store from '../core/store';

class ProfileFormController extends FormController {
    setFiledsValuesByUserData(user: User) {
        const fields = PROFILE_INFO_INPUTS.reduce(
            (acc, input) => {
                acc[input] = { value: user[input] || '' };
                return acc;
            },
            {} as Record<(typeof PROFILE_INFO_INPUTS)[number], { value: string }>
        );
        store.set(`${this.storeFormName}.fields`, fields);
    }

    changeType(type: 'info' | 'changeInfo' | 'changePassword') {
        store.set('profilePage', { type });
    }
}

export default ProfileFormController;
