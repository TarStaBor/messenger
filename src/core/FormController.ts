import store, { FormState, MyStoreFormName, MyStoreFormNameFields } from './store';
import { ValidationRule } from '../utils/validators';

export type FormControllerField = { name: MyStoreFormNameFields; value: string };
export class FormController {
    protected storeFormName: MyStoreFormName;
    protected fields: Partial<Record<MyStoreFormNameFields, ValidationRule[] | null>>;

    constructor(
        storeFormName: MyStoreFormName,
        fields: Partial<Record<MyStoreFormNameFields, ValidationRule[] | null>>
    ) {
        this.storeFormName = storeFormName;
        this.fields = fields;
    }

    setField({ name, value }: FormControllerField) {
        store.set(`${this.storeFormName}.fields.${name}.value`, value);
        this.validateField({ name, value });
    }

    private validateField({ name, value }: FormControllerField) {
        if (name === 'password_confirm') {
            return this.validatePasswordConfirmation();
        }

        let errorMessage: string | null = null;
        this.fields[name]?.forEach((rule) => {
            const ok = rule.rule(value);
            if (!ok) {
                errorMessage = rule.message;
            }
        });
        store.set(`${this.storeFormName}.fields.${name}.error`, errorMessage);
        const fieldIsValid = !errorMessage;
        return fieldIsValid;
    }

    private validatePasswordConfirmation() {
        const formState = store.getState()[this.storeFormName] as FormState<'password' | 'password_confirm'>;
        const fields = formState?.fields;
        const oldPassword = fields?.password.value || null;
        const passwordConfirm = fields?.password_confirm.value || null;

        let errorMessage = '';
        if (oldPassword !== passwordConfirm) {
            errorMessage = 'Пароли не совпадают';
        }
        store.set(`${this.storeFormName}.fields.password_confirm.error`, errorMessage);
        const fieldIsValid = !errorMessage;
        return fieldIsValid;
    }

    private getFields() {
        const formState = store.getState()[this.storeFormName] as FormState<MyStoreFormNameFields>;
        return formState?.fields;
    }

    validateForm() {
        let formIsValid = true;
        const fields = this.getFields();
        (Object.keys(this.fields) as MyStoreFormNameFields[]).forEach((name) => {
            const rules = this.fields[name];
            if (!rules) return;
            const value = fields?.[name]?.value || '';
            const valid = this.validateField({ name, value });
            if (!valid) formIsValid = false;
        });

        return formIsValid;
    }

    getFieldValues(): Record<string, string> {
        const fields = this.getFields();
        if (!fields) return {};
        return Object.entries(fields).reduce<Record<string, string>>((acc, [name, value]) => {
            acc[name] = value?.value || '';
            return acc;
        }, {});
    }

    resetForm() {
        store.set(this.storeFormName, { loading: false, error: '', fields: undefined });
    }
}
