import { Block, Button, ChatItem, Divider, Input, Link, Modal } from '../../../common-components';
import { apiUrls } from '../../../common-components/apiUrls';
import { INPUT_VIEWS } from '../../../common-components/components/input/input';
import { LINK_TARGETS } from '../../../common-components/components/link/link';
import { APP_ROUTES } from '../../../common-components/constants';
import { HTTPTransport } from '../../../common-components/utils/helpers';

import './chats-reel.scss';

interface Props {
    chatItems: ChatItem[];
    isEmpty: boolean;
    onCreateChat?: () => void;
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
            <div class="chats-reel__empty-state-wrapper">
                <p class="chats-reel__empty-message">Чатов пока нет</p>
            </div>
        {{else}}
            {{{chatItems}}}
        {{/if}}
        {{{createChatButton}}}
    </div>
    {{{createChatModal}}}
`;

export class ChatsReel extends Block {
    public constructor(props: Props) {
        const divider = new Divider();

        const link = new Link({
            url: APP_ROUTES.profile,
            target: LINK_TARGETS.SELF,
            text: 'Профиль >',
            mix: 'chats-reel__profile-link',
            isRouter: true,
        });

        const createChatButton = new Button({
            text: 'Создать чат',
            mix: 'chats-reel__create-chat-button',
        });

        const createChatModalHeader = new Block({
            tagName: 'h2',
            attributes: { class: 'chats-reel__modal-header' },
            propsAndChildren: { text: 'Создать новый чат' },
            contentTemplate: '{{text}}',
        });

        const chatTitleInput = new Input({
            view: INPUT_VIEWS.DEFAULT,
            descr: 'Название чата',
            type: 'text',
            disabled: false,
            mix: 'chats-reel__chat-title-input',
        });

        const createChatModalButton = new Button({
            text: 'Создать',
            mix: 'chats-reel__modal-button',
        });

        const createChatModal = new Modal({
            contentTemplate: `
                {{{createChatModalHeader}}}
                {{{chatTitleInput}}}
                {{{createChatModalButton}}}
            `,
            templateItems: {
                createChatModalHeader,
                chatTitleInput,
                createChatModalButton,
            },
        });

        super({
            tagName: 'section',
            attributes: { class: 'chats-reel' },
            propsAndChildren: { ...props, divider, link, createChatModal, createChatButton },
            contentTemplate,
        });

        createChatButton.addEvents([
            [
                'click',
                () => {
                    createChatModal.open();
                },
            ],
        ]);

        createChatModalButton.addEvents([
            [
                'click',
                () => {
                    const chatName = chatTitleInput.getValue();

                    const data = JSON.stringify({ title: chatName });

                    HTTPTransport.post({
                        url: apiUrls.postChats,
                        options: {
                            data,
                            headers: {
                                'content-type': 'application/json',
                            },
                        },
                    })
                        .then(() => {
                            createChatModal.close();

                            if (props.onCreateChat) {
                                props.onCreateChat();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                },
            ],
        ]);
    }
}
