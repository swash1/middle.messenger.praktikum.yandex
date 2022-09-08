import { Block } from '../../utils/helpers';

import { Divider } from '../divider/divider';

import './chat-item.scss';

interface Props {
    avatar: string;
    name: string;
    sender: string;
    latestMessage: string;
    timestamp: string;
    unreadMessagesCount: number;
}

const contentTemplate = `
    <div class="chat-item">
        <img src="{{avatar}}" alt="avatar" class="chat-item__avatar" />
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
    constructor(props: Props) {
        const { avatar, name, sender, latestMessage, timestamp, unreadMessagesCount } = props;

        const divider = new Divider();

        super({
            tagName: 'div',
            attributes: { class: 'chat-item__wrapper' },
            propsAndChildren: { avatar, name, sender, latestMessage, timestamp, unreadMessagesCount, divider },
            contentTemplate,
        });
    }
}
