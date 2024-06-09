import { ChatListItem } from '../types/chatItem';
import {
    AddUserInput,
    LoginInput,
    NewChatInput,
    PasswordInput,
    ProfileInfoInput,
    RegistrationInput,
    RemoveUserInput,
} from '../types/input';
import { WSMessage } from '../types/message';
import { User } from '../types/user';
import { set } from '../utils/set';
import EventBus from './EventBus';

export enum StoreEvents {
    Updated = 'Updated',
}

export class Store<S extends Indexed> extends EventBus {
    private state: S;

    constructor(initialState: S) {
        super();
        this.state = initialState;
    }

    public getState = (): S => {
        return this.state;
    };

    public set = (path: string, value: unknown) => {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    };
}

export type FormState<Fieldset extends MyStoreFormNameFields> = {
    loading?: boolean;
    valid?: boolean;
    error?: string;
    success?: string;
    fields?: Record<Fieldset, { value: string; error?: string }>;
};

export type MyStoreFormName =
    | 'loginForm'
    | 'registrationForm'
    | 'profileForm'
    | 'passwordForm'
    | 'avatarForm'
    | 'newChatForm'
    | 'addUserForm'
    | 'removeUserForm';

export type MyStoreFormNameFields =
    | LoginInput
    | RegistrationInput
    | ProfileInfoInput
    | PasswordInput
    | NewChatInput
    | AddUserInput
    | RemoveUserInput;

export type MyStore = {
    user: User | null;
    profilePage: { type: 'info' | 'changeInfo' | 'changePassword' };
    loginForm?: FormState<LoginInput>;
    registrationForm?: FormState<RegistrationInput>;
    profileForm?: FormState<ProfileInfoInput>;
    passwordForm?: FormState<PasswordInput>;
    avatarForm?: FormState<PasswordInput>;
    newChatForm?: FormState<NewChatInput>;
    addUserForm?: FormState<AddUserInput>;
    removeUserForm?: FormState<RemoveUserInput>;
    chats: {
        loading?: boolean;
        error?: string;
        list: ChatListItem[];
    };
    messages: WSMessage[];
    activeChat?: ChatListItem;
};

const defaultStore: MyStore = {
    user: null,
    profilePage: { type: 'info' },
    messages: [],
    chats: {
        loading: true,
        list: [],
    },
};

const store = new Store<MyStore>(defaultStore);
export default store;
