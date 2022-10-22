import { Block } from '../../utils/helpers/Block';

import { Jackdaw } from '../../icons/Jackdaw';
import { DoubleJackdaw } from '../../icons/DoubleJackdaw';

import './message.scss';

export enum MESSAGE_TYPES {
    INCOMING = 'incoming',
    OUTGOING = 'outgoing',
}

export enum CONTENT_TYPES {
    TEXT = 'text',
    IMAGE = 'image',
}

interface Props {
    contentType: CONTENT_TYPES;
    type: MESSAGE_TYPES;
    content: string;
    timestamp: string;
    read: boolean;
}

const ifIsOutgoing = `
    {{#if isOutgoing}}
        <div class="message__read-status">
            {{#if read}}
                ${DoubleJackdaw}
            {{else}}
                ${Jackdaw}
            {{/if}}
        </div>     
    {{/if}}
`;

const contentTemplateWithText = `
    <p class="message__text">{{content}}</p>
    <div class="message__info">
        ${ifIsOutgoing}
        <div class="message__timestamp">{{timestamp}}</div>
    </div>
`;

const contentTemplateWithImage = `
    <img class="message__image" src="{{content}}">
    <div class="message__info">
        ${ifIsOutgoing}
        <div class="message__timestamp">{{timestamp}}</div>
    </div>
`;

export class Message extends Block {
    public constructor(props: Props) {
        const { contentType, type, content, timestamp, read } = props;

        let contentTemplate;

        switch (contentType) {
            case CONTENT_TYPES.TEXT:
                contentTemplate = contentTemplateWithText;
                break;
            case CONTENT_TYPES.IMAGE:
                contentTemplate = contentTemplateWithImage;
                break;
            default:
                break;
        }

        const className = `message message_type_${type} message_content-type_${contentType}`;

        const isOutgoing = type === MESSAGE_TYPES.OUTGOING;

        super({
            tagName: 'div',
            attributes: { class: className },
            propsAndChildren: { contentType, isOutgoing, content, timestamp, read },
            contentTemplate,
        });
    }
}
