import { ChatItem } from '../../common-components';
import { apiUrls } from '../../common-components/apiUrls';
import { HTTPTransport, Store, Socket, Block } from '../../utils';
import { ChatItemParams } from '../../typings';

import { ChatsReel } from '../modules/chats-reel/chats-reel';
import { Dialog } from '../modules/dialog/dialog';

import './chats.scss';

const contentTemplate = `
    {{{ chatsReel }}}
    {{{ dialog }}}
`;

const store = new Store();

class Chats extends Block {
    static __instance: Chats;
    static shouldUpdate: boolean = false;
    static components = {} as {
        chatsReel?: ChatsReel;
        dialog?: Dialog;
    };

    public constructor() {
        if (Chats.__instance) {
            if (Chats.shouldUpdate) {
                Chats.updateComponent();
            }
            return Chats.__instance;
        }

        const chatsReel = new ChatsReel({
            chatItems: [],
            isEmpty: true,
            onCreateChat: Chats.updateComponent,
        });

        const dialog = new Dialog();

        Chats.components.chatsReel = chatsReel;
        Chats.components.dialog = dialog;

        super({
            tagName: 'section',
            attributes: { class: 'chats' },
            propsAndChildren: { chatsReel, dialog },
            contentTemplate,
        });

        Chats.__instance = this;

        Chats.updateComponent();
    }

    static fetchData = async (): Promise<string> => {
        try {
            return (await HTTPTransport.get({ url: apiUrls.getChats })) as string;
        } catch (error) {
            throw Error(error);
        }
    };

    static updateComponent = async () => {
        try {
            const response = await Chats.fetchData();
            const chats: ChatItemParams[] = JSON.parse(response);

            const chatItems = chats.map(
                (chatInfo) =>
                    new ChatItem({
                        ...chatInfo,
                        events: [
                            [
                                'click',
                                async () => {
                                    try {
                                        const response = await HTTPTransport.post({
                                            url: `${apiUrls.postGetToken}/${chatInfo.id}`,
                                        }) as string;

                                        const { token } = JSON.parse(response);

                                        const { id: userId } = store.get('userInfo');

                                        new Socket({
                                            userId: String(userId),
                                            chatId: chatInfo.id,
                                            token,
                                            onStart: () => {
                                                Chats.components!.dialog!.getOldMessages();
                                            },
                                        });

                                        this.components.dialog!.setProps({
                                            chatName: chatInfo.title,
                                            avatar: chatInfo.avatar,
                                            chat: chatInfo,
                                            firstLetter: chatInfo.title[0],
                                        });

                                        store.set('activeChatInfo', chatInfo);
                                    } catch (error) {
                                        console.error(error);
                                    }
                                },
                            ],
                        ],
                    })
            );

            Chats.components.chatsReel?.setProps({
                chatItems,
                isEmpty: !(chatItems && chatItems.length),
            });

            Chats.shouldUpdate = false;
        } catch (error) {
            console.error(error);
        }
    };
}

export default Chats;
