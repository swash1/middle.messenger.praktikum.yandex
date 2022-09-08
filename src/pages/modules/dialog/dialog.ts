import { ArrowButton, Block, Divider, Message } from '../../../common-components';

import { MESSAGE_TYPES, CONTENT_TYPES } from '../../../common-components/components/message/message';

import { DialogOptions } from './__options/dialog__options';
import { DialogAddAttachment } from './__add-attachment/dialog__add-attachment';
import { DialogMessageInput } from './__message-input/dialog__message-input';

interface Props {
    dialogInfo: DialogInfo;
}

interface DialogInfo {
    recipientInfo: {
        name: string;
        avatarImgSrc: string;
    };
    messages: {
        contentType: CONTENT_TYPES;
        type: MESSAGE_TYPES;
        content: string;
        timestamp: string;
        read: boolean;
    }[];
}

import './dialog.scss';

const contentTemplate = `
    <div class="dialog__header-wrapper">
        <div class="dialog__header">
            <div class="dialog__recipient-info">
                <img class="recipient__avatar" src={{avatarImgSrc}}/>
                <div class="recipient__name">{{recipientName}}</div>
            </div>
            {{{dialogOptions}}}
        </div>
    {{{divider1}}}
    </div>
    <div class="dialog__messages">
        {{{messages}}}
    </div>
    <div class="dialog__footer-wrapper">
        {{{divider2}}}
        <div class="dialog__footer">
            {{{addAttachment}}}
            {{{messageInput}}}
            {{{arrowButton}}}
        </div>
    </div>
`;

export class Dialog extends Block {
    constructor({ dialogInfo }: Props) {
        const divider1 = new Divider();
        const divider2 = new Divider();

        const avatarImgSrc = dialogInfo.recipientInfo.avatarImgSrc;

        const recipientName = dialogInfo.recipientInfo.name;

        const messages = dialogInfo.messages.map((messageParams) => new Message(messageParams));

        const dialogOptions = new DialogOptions();

        const addAttachment = new DialogAddAttachment();

        const messageInput = new DialogMessageInput();

        const arrowButton = new ArrowButton({ direction: ArrowButton.ARROW_DIRECTIONS.RIGHT });

        super({
            tagName: 'div',
            attributes: { class: 'dialog' },
            propsAndChildren: {
                divider1,
                divider2,
                avatarImgSrc,
                recipientName,
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
}
