import { Block } from '../../utils/helpers/Block';
import { Store } from '../../utils/helpers';

import { Jackdaw } from '../../icons/Jackdaw';
import { DoubleJackdaw } from '../../icons/DoubleJackdaw';

import { MessageParams as MessageProps } from '../../typings';

import './message.scss';

export enum MESSAGE_TYPES {
    INCOMING = 'incoming',
    OUTGOING = 'outgoing',
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

const store = new Store();

export class Message extends Block {
    public constructor(props: MessageProps) {
        const { type, time, content, is_read: isRead, user_id } = props;

        let contentTemplate;

        switch (type) {
            case 'message':
                contentTemplate = contentTemplateWithText;
                break;
            case 'file':
                contentTemplate = contentTemplateWithImage;
                break;
            default:
                break;
        }

        const isOutgoing = user_id === store.get('userInfo').id;

        const className = `message message_type_${
            isOutgoing ? MESSAGE_TYPES.OUTGOING : MESSAGE_TYPES.INCOMING
        } message_content-type_${type}`;

        const date = new Date(time);

        const timestamp = `${date.getHours()}.${date.getSeconds()}`;

        super({
            tagName: 'div',
            attributes: { class: className },
            propsAndChildren: { isOutgoing, content, timestamp, isRead },
            contentTemplate,
        });
    }
}
