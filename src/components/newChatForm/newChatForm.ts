import chatController from '../../controllers/chatController';
import Block, { CommonProps } from '../../core/Block';
import { newChatFormController } from '../../controllers/formControllers';
import { connect } from '../../utils/connect';
import { Button } from '../button';
import { Form } from '../form';
import { Input } from '../form/input';
import { IForm } from '../form/types';

export class NewChatForm extends Block<CommonProps> {
    init() {
        const ConnectedForm = connect<IForm>(({ newChatForm }) => ({
            loading: newChatForm?.loading,
            error: newChatForm?.error,
            success: newChatForm?.success,
        }))(Form);

        this.children = {
            FormComponent: new ConnectedForm({
                id: 'newChatForm',
                title: 'Создать группу',
                storeFormName: 'newChatForm',
                buttons: {
                    Component: Button,
                    propList: [
                        {
                            type: 'submit',
                            variant: 'primary',
                            fill: 'solid',
                            text: 'Создать',
                        },
                    ],
                },
                inputs: {
                    Component: Input,
                    propList: [
                        {
                            label: 'Название',
                            name: 'title',
                            type: 'text',
                            placeholder: 'Введите название чата',
                            storeFormName: 'newChatForm',
                            onBlur: (field) => {
                                newChatFormController.setField(field);
                            },
                        },
                    ],
                },
                onSubmit: () => {
                    const formIsValid = newChatFormController.validateForm();
                    if (!formIsValid) return;
                    const fields = newChatFormController.getFieldValues();
                    chatController.createChat({ title: fields.title });
                },
            }),
        };
    }

    render() {
        return `
            <div class="chatSettingsForm">
                {{{FormComponent}}}
            </div>
        `;
    }
}
