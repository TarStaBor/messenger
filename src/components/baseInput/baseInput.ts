import Block from '../../core/Block';
import store, { MyStore, StoreEvents } from '../../core/store';
import { isEqual } from '../../utils/isEqual';
import { IInput, IInputField } from './types';

export class BaseInput extends Block<IInput> {
    private onChangeStoreCallback: () => void = () => {};

    constructor(props: IInput & { InputFieldClass: typeof Block<IInputField> }) {
        super({
            ...props,
            InputField: new props.InputFieldClass({
                ...props,
                events: {
                    blur: (e) => {
                        const input = e.target as HTMLInputElement | null;
                        const value = input?.value;
                        props.onBlur({ name: props.name, value: value || '' });
                    },
                },
            }),
        });

        let storeValue = this.getStoredValueAndError(store.getState());

        if (props.storeFormName) {
            this.onChangeStoreCallback = () => {
                const newStoreValue = this.getStoredValueAndError(store.getState());
                if (!isEqual(storeValue, newStoreValue)) {
                    this.setProps({ ...newStoreValue });
                    this.children.InputField.setProps({ value: newStoreValue.value });
                }

                storeValue = newStoreValue;
            };

            store.on(StoreEvents.Updated, this.onChangeStoreCallback);
        }
    }

    private getStoredValueAndError = (state: MyStore) => {
        const { name, storeFormName } = this.props;
        const valueAndError = { value: '', error: '' };
        if (!storeFormName) return valueAndError;

        const storedFields = state[storeFormName]?.fields as
            | Record<string, { value: string; error?: string }>
            | undefined;

        const storedField = storedFields?.[name];

        return { value: storedField?.value, error: storedField?.error };
    };
}
