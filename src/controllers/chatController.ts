import { ws } from '../core/ChatWebSocket';
import store from '../core/store';
import ChatAPI from '../api/chat-api';
import userController from './userController';

const chatApi = new ChatAPI();

class ChatController {
    setActiveChat(id: number) {
        const chats = store.getState().chats.list;
        const activeChat = chats.find((chat: { id: number }) => chat.id === id);
        store.set('activeChat', structuredClone(activeChat));
        store.set('messages', []);
        ws.setChatId(id);
    }

    async getChats() {
        try {
            store.set('chats', { loading: true });
            const res = await chatApi.getChats();
            if (res.status !== 200) {
                let errorMessage;
                switch (res.status) {
                    case 401:
                        errorMessage = 'Пользователь не авторизован';
                        break;
                    default:
                        errorMessage = 'Что-то пошло не так';
                }
                throw new Error(errorMessage);
            }
            const chats = JSON.parse(res.response);
            store.set('chats.list', chats);
        } catch (error) {
            if (error instanceof Error) {
                store.set('chats.errorPage', error.message);
            } else {
                store.set('chats.errorPage', 'Что-то пошло не так');
            }
        } finally {
            store.set('chats.loading', false);
        }
    }

    async createChat(data: { title: string }) {
        try {
            store.set('newChatForm', { loading: true, error: '' });
            const res = await chatApi.createChat(data);
            if (res.status !== 200) {
                let errorMessage;
                switch (res.status) {
                    case 400:
                        errorMessage = 'Некорректные данные';
                        break;
                    default:
                        errorMessage = 'Что-то пошло не так';
                }
                throw new Error(errorMessage);
            }
            store.set('newChatForm.success', 'Чат создан');
            this.getChats();
        } catch (error) {
            if (error instanceof Error) {
                store.set('newChatForm.errorPage', error.message);
            } else {
                store.set('newChatForm.errorPage', 'Что-то пошло не так');
            }
        } finally {
            store.set('newChatForm.loading', false);
        }
    }

    async changeChatAvatar(data: FormData) {
        try {
            store.set('avatarForm', { loading: true, error: '' });
            const res = await chatApi.changeChatAvatar(data);
            if (res.status !== 200) throw new Error('Что-то пошло не так');
            this.getChats();
        } catch (error) {
            if (error instanceof Error) {
                store.set('avatarForm.errorPage', error.message);
            } else {
                store.set('avatarForm.errorPage', 'Что-то пошло не так');
            }
        } finally {
            store.set('avatarForm.loading', false);
        }
    }

    async deleteChat(id: number) {
        try {
            store.set('chats.loading', true);
            const res = await chatApi.deleteChat({ chatId: id });
            if (res.status !== 200) {
                let errorMessage;
                switch (res.status) {
                    case 400:
                        errorMessage = 'Некорректные данные';
                        break;
                    case 403:
                        errorMessage = 'Недостаточно прав';
                        break;
                    default:
                        errorMessage = 'Что-то пошло не так';
                }
                throw new Error(errorMessage);
            }
            this.getChats();
            store.set('activeChat', undefined);
        } catch (error) {
            if (error instanceof Error) {
                store.set('chats.errorPage', error.message);
            } else {
                store.set('chats.errorPage', 'Что-то пошло не так');
            }
        }
    }

    async addUserToChat(data: { login: string; chatId: number }) {
        try {
            store.set('addUserForm', { loading: true, error: '' });
            const users = await userController.searchUser({ login: data.login });
            if (!users?.length) {
                throw new Error('Пользователь не найден');
            }
            const res = await chatApi.addChatUsers({ chatId: data.chatId, users: [users[0].id] });
            if (res.status !== 200) {
                let errorMessage;
                switch (res.status) {
                    case 400:
                        errorMessage = 'Некорректные данные';
                        break;
                    case 403:
                        errorMessage = 'Недостаточно прав';
                        break;
                    case 409:
                        errorMessage = 'Пользователь уже состоит в чате';
                        break;
                    default:
                        errorMessage = 'Что-то пошло не так';
                }
                throw new Error(errorMessage);
            }
            store.set('addUserForm.success', 'Пользователь добавлен');
            this.getChats();
        } catch (error) {
            if (error instanceof Error) {
                store.set('addUserForm.errorPage', error.message);
            } else {
                store.set('addUserForm.errorPage', 'Что-то пошло не так');
            }
        } finally {
            store.set('addUserForm.loading', false);
        }
    }

    async removeUserFromChat(data: { login: string; chatId: number }) {
        try {
            store.set('removeUserForm', { loading: true, error: '' });
            const users = await userController.searchUser({ login: data.login });
            if (!users?.length) {
                throw new Error('Пользователь не найден');
            }
            const res = await chatApi.deleteChatUsers({
                chatId: data.chatId,
                users: [users[0].id],
            });
            if (res.status !== 200) {
                let errorMessage;
                switch (res.status) {
                    case 400:
                        errorMessage = 'Некорректные данные';
                        break;
                    case 403:
                        errorMessage = 'Недостаточно прав';
                        break;
                    default:
                        errorMessage = 'Что-то пошло не так';
                }
                throw new Error(errorMessage);
            }
            store.set('removeUserForm.success', 'Пользователь удален');
            this.getChats();
        } catch (error) {
            if (error instanceof Error) {
                store.set('removeUserForm.errorPage', error.message);
            } else {
                store.set('removeUserForm.errorPage', 'Что-то пошло не так');
            }
        } finally {
            store.set('removeUserForm.loading', false);
        }
    }
}

export default new ChatController();
