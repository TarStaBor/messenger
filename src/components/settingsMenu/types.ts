import { CommonProps } from '../../core/Block';

export interface ISettingsMenu extends CommonProps {
    settingType: 'direct' | 'group';
    isModalOpen?: boolean;
}

export interface IChatSettings extends CommonProps {
    buttonsKeys?: string[];
}

export interface IAddUserForm extends CommonProps {
    activeChatId?: number;
}

export interface IChangeChatAvatarForm extends CommonProps {
    activeChatId?: number;
}

type TChatSettingsForm = 'changeGroupAvatar' | 'addUser' | 'removeUser' | 'deleteChat';

export interface IChatSettingsForm extends CommonProps {
    type: TChatSettingsForm;
}

export interface IDeleteChatForm extends CommonProps {
    activeChatId?: number;
}

export interface IRemoveUserForm extends CommonProps {
    activeChatId?: number;
}
