interface SocketProps {
    userId: string;
    chatId: number;
    token: string;
    onStart?: () => void;
}

interface MessageProps {
    content?: string;
    type: 'message' | 'ping' | 'get old';
}

export class Socket {
    static activeSocket: WebSocket | null = null;
    private static interval: NodeJS.Timer | null = null;

    public constructor({ userId, chatId, token, onStart }: SocketProps) {
        if (Socket.activeSocket) {
            Socket.activeSocket.close();
        }

        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

        socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            Socket.interval = setInterval(() => {
                Socket.sendMessage({ type: 'ping' });
            }, 5000);

            if (onStart) {
                onStart();
            }
        });

        socket.addEventListener('close', (event) => {
            if (Socket.interval) {
                clearInterval(Socket.interval);
            }

            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', (event) => {
            console.log('Получены данные', event.data);
        });

        socket.addEventListener('error', (event) => {
            if (Socket.interval) {
                clearInterval(Socket.interval);
            }

            console.log('Ошибка', event);
        });

        Socket.activeSocket = socket;
    }

    public static getActiveSocket = () => {
        return this.activeSocket;
    };

    static sendMessage = (props: MessageProps) => {
        if (this.activeSocket) {
            this.activeSocket.send(JSON.stringify(props));
        }
    };
}
