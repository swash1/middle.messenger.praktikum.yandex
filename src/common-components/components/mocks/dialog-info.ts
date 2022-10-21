import { DialogInfo } from '../../typings';
import { CONTENT_TYPES, MESSAGE_TYPES } from '../message/message';

export const dialogInfo: DialogInfo = {
    recipientInfo: {
        name: 'Вася',
        avatarImgSrc: 'https://via.placeholder.com/50',
    },
    messages: [
        {
            contentType: CONTENT_TYPES.TEXT,
            type: MESSAGE_TYPES.INCOMING,
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ad iste atque facilis. Numquam officiis, maxime nisi laudantium odit architecto qui voluptatibus, excepturi autem id, facilis esse repellat. Expedita, praesentium!',
            timestamp: '03:30',
            read: true,
        },
        {
            contentType: CONTENT_TYPES.IMAGE,
            type: MESSAGE_TYPES.INCOMING,
            content: 'https://via.placeholder.com/300',
            timestamp: '03:31',
            read: true,
        },
        {
            contentType: CONTENT_TYPES.TEXT,
            type: MESSAGE_TYPES.INCOMING,
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ad iste atque facilis. Numquam officiis, maxime nisi laudantium odit architecto qui voluptatibus, excepturi autem id, facilis esse repellat. Expedita, praesentium!',
            timestamp: '03:30',
            read: true,
        },
        {
            contentType: CONTENT_TYPES.IMAGE,
            type: MESSAGE_TYPES.INCOMING,
            content: 'https://via.placeholder.com/300',
            timestamp: '03:31',
            read: true,
        },
        {
            contentType: CONTENT_TYPES.TEXT,
            type: MESSAGE_TYPES.OUTGOING,
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ad iste atque facilis. Numquam officiis, maxime nisi laudantium odit architecto qui voluptatibus, excepturi autem id, facilis esse repellat. Expedita, praesentium!',
            timestamp: '03:32',
            read: true,
        },
        {
            contentType: CONTENT_TYPES.IMAGE,
            type: MESSAGE_TYPES.OUTGOING,
            content: 'https://via.placeholder.com/400',
            timestamp: '03:33',
            read: false,
        },
    ],
};
