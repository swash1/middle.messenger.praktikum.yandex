import { Block, ChatItem } from '../../common-components';

import { ChatsReel } from '../modules/chats-reel/chats-reel';

import { chats } from '../../common-components/components/mocks/chats-list';
import { dialogInfo } from '../../common-components/components/mocks/dialog-info';

import { Dialog } from '../modules/dialog/dialog';

import './chats.scss';

const contentTemplate = `
    {{{ chatsReel }}}
    {{{ dialog }}}
`;

class Chats extends Block {
    public constructor() {
        const chatsArray = chats.map((chatInfo) => {
            return new ChatItem(chatInfo);
        });

        const chatsReel = new ChatsReel({
            chatItems: chatsArray,
            isEmpty: !(chatsArray && chatsArray.length),
        });

        const dialog = new Dialog({
            dialogInfo,
        });

        super({
            tagName: 'section',
            attributes: { class: 'chats' },
            propsAndChildren: { chatsReel, dialog },
            contentTemplate,
        });
    }
}

export default new Chats();
