import { ArrowButton, Block, Divider, Message } from '../../../common-components';
import { ARROW_DIRECTIONS } from '../../../common-components/components/arrow-button/arrow-button';
import { ChatItemParams, MessageParams } from '../../../common-components/typings';
import { Socket } from '../../../common-components/utils/helpers/Socket';
import { AVATARS_PATH } from '../../../common-components/constants';

import { DialogOptions } from './__options/dialog__options';
import { DialogAddAttachment } from './__add-attachment/dialog__add-attachment';
import { DialogMessageInput } from './__message-input/dialog__message-input';

import './dialog.scss';

const contentTemplate = `
    {{#if chat}}
        <div class="dialog">
            <div class="dialog__header-wrapper">
                <div class="dialog__header">
                    <div class="dialog__recipient-info">
                        {{#if avatar}}
                            <img class="recipient__avatar" src={{avatarImgSrc}} alt="avatar"/>
                        {{else}}
                            <div class="recipient__avatar recipient__avatar_colorful">{{firstLetter}}</div>
                        {{/if}}
                        <div class="recipient__name">{{chatName}}</div>
                    </div>
                    {{{dialogOptions}}}
                </div>
                {{{divider1}}}
            </div>
            <div class="dialog__messages">
                {{#if messages.length}}
                    {{{messages}}}
                {{else}}
                    <div class="dialog__empty-messages">Сообщений пока нет</div>
                {{/if}}
            </div>
            <div class="dialog__footer-wrapper">
                {{{divider2}}}
                <div class="dialog__footer">
                    {{{addAttachment}}}
                    {{{messageInput}}}
                    {{{arrowButton}}}
                </div>
            </div>
        </div>
    {{else}}
        <div class="dialog_empty">
            Диалог не выбран
        </div>
    {{/if}}
`;

export class Dialog extends Block {
    public constructor(chat?: Omit<ChatItemParams, 'id' | 'unread_count' | 'last_message'> | null) {
        const divider1 = new Divider();
        const divider2 = new Divider();

        const avatarImgSrc = `${AVATARS_PATH}${chat?.avatar}`;

        const chatName = chat?.title;

        const messages = [] as Message[];

        const dialogOptions = new DialogOptions();

        const addAttachment = new DialogAddAttachment();

        const messageInput = new DialogMessageInput();

        const arrowButton = new ArrowButton({ direction: ARROW_DIRECTIONS.RIGHT });

        super({
            tagName: 'div',
            attributes: { class: 'dialog__wrapper' },
            propsAndChildren: {
                chat,
                divider1,
                divider2,
                avatarImgSrc,
                chatName,
                messages,
                dialogOptions,
                addAttachment,
                messageInput,
                arrowButton,
            },
            contentTemplate,
        });

        const sendMessage = () => {
            if (messageInput.getValue()) {
                console.log(messageInput.getValue());
                messageInput.setValue('');
                messageInput.input.getContent().focus();
            }
        };

        arrowButton.addEvents([
            [
                'click',
                () => {
                    sendMessage();
                },
            ],
        ]);

        messageInput.input.addEvents([
            [
                'keyup',
                (event) => {
                    // @ts-ignore
                    if (event.key === 'Enter') {
                        sendMessage();
                    }
                },
            ],
        ]);
    }

    public getOldMessages = (getFromMessageNumber: number = 0) => {
        const socket = Socket.activeSocket;

        if (!socket) {
            console.error("Can't get messages - no socket started");
            return;
        }

        const setMessages = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
                this.setProps({
                    messages: data.map((messageProps: MessageParams) => new Message(messageProps)).reverse(),
                });

                socket.removeEventListener('message', setMessages);
            }
        };

        socket.addEventListener('message', setMessages);

        Socket.sendMessage({
            type: 'get old',
            content: String(getFromMessageNumber),
        });
    };
}
