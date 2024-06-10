import { IButton } from '../../button/types';

export const chatSettingsButtons: IButton[] = [
    {
        text: 'Изменить аватар',
        icon: 'settings',
        id: 'changeGroupAvatar',
        type: 'button',
        variant: 'primary',
        fill: 'ghost',
        align: 'left',
    },
    {
        text: 'Добавить пользователя',
        icon: 'add',
        id: 'addUser',
        type: 'button',
        variant: 'primary',
        fill: 'ghost',
        align: 'left',
    },
    {
        text: 'Удалить пользователя',
        icon: 'remove',
        id: 'removeUser',
        type: 'button',
        variant: 'primary',
        fill: 'ghost',
        align: 'left',
    },
    {
        text: 'Удалить чат',
        icon: 'remove',
        variant: 'danger',
        id: 'deleteChat',
        type: 'button',
        fill: 'ghost',
        align: 'left',
    },
];
