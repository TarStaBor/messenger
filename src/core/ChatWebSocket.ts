import { WS_HOST } from '../constants';
import ChatAPI from '../api/chat-api';
import store from './store';

class ChatWebSocket {
    private socket?: WebSocket;
    private userId?: number;
    private chatId?: number;
    private token?: string;
    private httpChatApi = new ChatAPI();
    private timerId?: number;
    private alive = false;

    setUserId(userId: number): void {
        if (this.userId === userId) {
            return;
        }
        this.userId = userId;
        this.token = undefined;
        this.getToken();
    }

    setChatId(chatId: number): void {
        if (this.chatId === chatId) {
            return;
        }
        this.chatId = chatId;
        this.token = undefined;
        this.getToken();
    }

    private async getToken() {
        if (!this.userId || !this.chatId) {
            return;
        }
        try {
            const res = await this.httpChatApi.getChatToken({ chatId: this.chatId });
            const data = JSON.parse(res.response);
            this.token = data.token || null;
            this.createSocket();
        } catch (error) {
            console.log('@setToken: ', error);
        }
    }

    private createSocket() {
        if (!this.token || !this.userId || !this.chatId) {
            console.log('@createSocket: Token, userId or chatId is not set');
        }
        if (this.socket) {
            this.unsubscribe();
        }
        try {
            this.socket = new WebSocket(`${WS_HOST}/ws/chats/${this.userId}/${this.chatId}/${this.token}`);
        } catch (error) {
            console.log('@createSocket: ', error);
        }
        this.subscribe();
    }

    private subscribe(): void {
        if (!this.socket) {
            return;
        }

        this.socket.addEventListener('open', this.onOpen.bind(this));
        this.socket.addEventListener('message', this.onMessage.bind(this));
        this.socket.addEventListener('close', this.onClose.bind(this));
        this.socket.addEventListener('error', this.onError.bind(this));
    }

    private unsubscribe(): void {
        if (!this.socket) {
            return;
        }

        this.socket.removeEventListener('open', this.onOpen.bind(this));
        this.socket.removeEventListener('message', this.onMessage.bind(this));
        this.socket.removeEventListener('close', this.onClose.bind(this));
        this.socket.removeEventListener('error', this.onError.bind(this));
    }

    private onOpen(): void {
        this.alive = true;
        this.getOldMessages();
        this.keepAlive();
    }

    private onMessage(event: MessageEvent): void {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
            store.set('messages', data.reverse());
        } else if (data.type === 'message') {
            store.set('messages', [...(store.getState().messages || []), data]);
        }
    }

    private onClose(): void {
        this.alive = false;
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }

    private onError(error: Event): void {
        console.error('WebSocket errorPage:', error);
    }

    private keepAlive() {
        if (this.timerId || !this.socket) {
            return;
        }
        this.timerId = setInterval(() => {
            this.socket?.send(
                JSON.stringify({
                    type: 'ping',
                })
            );
        }, 30000);
    }

    private getOldMessages() {
        if (!this.socket) {
            return;
        }
        this.socket.send(
            JSON.stringify({
                content: '0',
                type: 'get old',
            })
        );
    }

    sendMessage(message: string): void {
        if (!this.alive || !this.socket) {
            return;
        }
        this.socket.send(
            JSON.stringify({
                content: message,
                type: 'message',
            })
        );
    }

    close(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = undefined;
        }
        this.userId = undefined;
        this.chatId = undefined;
        this.token = undefined;
        this.alive = false;
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }
}

export const ws = new ChatWebSocket();
