import { Block, ChatItem, Divider, Link } from '../../../common-components';
import { LINK_TARGETS } from '../../../common-components/components/link/link';

import './chats-reel.scss';

interface Props {
    chatItems: ChatItem[];
    isEmpty: boolean;
}

const contentTemplate = `
    <div class="chats-reel__header">
        <div class="chats-reel__profile-link-wrapper">
            {{{link}}}
        </div>
        <div class="chats-reel__search">Поиск</div>
    </div>
    {{{divider}}}
    <div class="chats-reel__chats-container">
        {{#if isEmpty}}
            <p class="chats-reel__empty-messsage">Чатов пока нет</p>  
        {{else}}
            {{{chatItems}}}
        {{/if}}
    </div>
`;

export class ChatsReel extends Block {
    constructor(props: Props) {
        const divider = new Divider();

        const link = new Link({
            url: '/profile',
            target: LINK_TARGETS.SELF,
            text: 'Профиль >',
            mix: 'chats-reel__profile-link',
        });

        super({
            tagName: 'section',
            attributes: { class: 'chats-reel' },
            propsAndChildren: { ...props, divider, link },
            contentTemplate,
        });
    }
}
