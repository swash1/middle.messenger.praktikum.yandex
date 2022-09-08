import { CONTENT_TYPES, MESSAGE_TYPES } from '../message/message';

export const dialogInfo = {
    recipientInfo: {
        name: 'Вася',
        avatarImgSrc: 'https://via.placeholder.com/50',
    },
    messages: [
        {
            contentType: 'text',
            type: 'incoming',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ad iste atque facilis. Numquam officiis, maxime nisi laudantium odit architecto qui voluptatibus, excepturi autem id, facilis esse repellat. Expedita, praesentium!',
            timestamp: '03:30',
            read: true,
        },
        {
            contentType: 'image',
            type: 'incoming',
            content: 'https://via.placeholder.com/300',
            timestamp: '03:31',
            read: true,
        },
        {
            contentType: 'text',
            type: 'incoming',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ad iste atque facilis. Numquam officiis, maxime nisi laudantium odit architecto qui voluptatibus, excepturi autem id, facilis esse repellat. Expedita, praesentium!',
            timestamp: '03:30',
            read: true,
        },
        {
            contentType: 'image',
            type: 'incoming',
            content: 'https://via.placeholder.com/300',
            timestamp: '03:31',
            read: true,
        },
        {
            contentType: 'text',
            type: 'outgoing',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ad iste atque facilis. Numquam officiis, maxime nisi laudantium odit architecto qui voluptatibus, excepturi autem id, facilis esse repellat. Expedita, praesentium!',
            timestamp: '03:32',
            read: true,
        },
        {
            contentType: 'image',
            type: 'outgoing',
            content: 'https://via.placeholder.com/400',
            timestamp: '03:33',
            read: false,
        },
    ],
} as {
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
};
