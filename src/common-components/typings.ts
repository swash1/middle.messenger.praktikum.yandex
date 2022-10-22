import { CONTENT_TYPES, MESSAGE_TYPES } from './components/message/message';

export interface DialogInfo {
    recipientInfo: {
        name: string;
        avatarImgSrc: string;
    };
    messages: {
        contentType: CONTENT_TYPES;
        type: MESSAGE_TYPES;
        content: string;
        timestamp: string;
        read: boolean;
    }[];
}
