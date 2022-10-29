import { ChatItemParams } from '../../typings';
import { Block } from '../../utils/helpers';

import { Divider } from '../divider/divider';

import './chat-item.scss';

interface ChatItemProps extends ChatItemParams {
    events?: [string, (event: Event) => void][];
}

const contentTemplate = `
    <div class="chat-item">
        {{#if avatar}}
            <img src="{{avatar}}" alt="avatar" class="chat-item__avatar" />
        {{else}}
            <div class="chat-item__avatar chat-item__avatar_colorful">{{firstLetter}}</div>
        {{/if}}
        
        <span class="chat-item__name">{{name}}</span>
        <p class="chat-item__message">
            {{#if (isYouSender sender)}}
                <span class="message__sender">Вы: </span>
            {{/if}}
            {{latestMessage}}
        </p>
        <time class="chat-item__timestamp">{{timestamp}}</time>
        {{#if unreadMessagesCount}}
            <div class="chat-item__unread-count">{{unreadMessagesCount}}</div>
        {{/if}}
    </div>
    {{{ divider }}}
`;

export class ChatItem extends Block {
    public constructor(props: ChatItemProps) {
        const { avatar, last_message, unread_count, title, events } = props;

        const date = last_message?.time ? new Date(last_message?.time) : null;
        const timestamp = date ? `${date.getMonth()}.${date.getDate()}` : '';

        const firstLetter = title[0];

        const divider = new Divider();

        super({
            tagName: 'div',
            attributes: { class: 'chat-item__wrapper' },
            propsAndChildren: {
                avatar,
                name: title,
                sender: false,
                latestMessage: last_message?.content || '',
                timestamp,
                unreadMessagesCount: unread_count,
                divider,
                firstLetter,
            },
            contentTemplate,
            events,
        });
    }
}
