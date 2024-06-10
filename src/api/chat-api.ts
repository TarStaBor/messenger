import HTTPTransport from '../utils/HTTPTransport';

const chatAPIInstance = new HTTPTransport('api/v2/chats');

class ChatAPI {
    getChats(data?: { limit?: number; offset?: number; title?: string }) {
        return chatAPIInstance.get('/', { data });
    }

    createChat(data: { title: string }) {
        return chatAPIInstance.post('/', { data });
    }

    deleteChat(data: { chatId: number }) {
        return chatAPIInstance.delete('/', { data });
    }

    changeChatAvatar(data: FormData) {
        return chatAPIInstance.put('/avatar', {
            data,
        });
    }

    addChatUsers(data: { users: number[]; chatId: number }) {
        return chatAPIInstance.put('/users', { data });
    }

    deleteChatUsers(data: { users: number[]; chatId: number }) {
        return chatAPIInstance.delete('/users', { data });
    }

    getChatToken(data: { chatId: number }) {
        return chatAPIInstance.post(`/token/${data.chatId}`);
    }
}

export default ChatAPI;
