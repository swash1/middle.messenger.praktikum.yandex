export interface User {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface ChatItemParams {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number;
    last_message: LastMessage | null;
}

interface LastMessage {
    user: Omit<User, 'id' | 'display_name'>;
    time: string;
    content: string;
}

export interface MessageParams {
    id: number;
    user_id: number;
    chat_id: number;
    type: 'message' | 'file';
    time: string;
    content: string;
    is_read: boolean;
    file: null;
}
