import { Button, Input, Select, Modal } from '../../../../common-components';
import { INPUT_VIEWS } from '../../../../common-components/components/input/input';
import { Cancel, Plus, ThreeDots } from '../../../../common-components/icons';
import { Block, validateLogin, Store, ChatsApi } from '../../../../utils';

import './dialog__options.scss';

const contentTemplate = `
    {{{button}}}
    {{{select}}}
    {{{addUserModal}}}
    {{{removeUserModal}}}
`;

const store = new Store();

export class DialogOptions extends Block {
    public constructor() {
        const button = new Block({
            tagName: 'button',
            attributes: { class: 'dialog__options-button' },
            contentTemplate: `${ThreeDots}`,
        });

        const addUserModalHeader = new Block({
            tagName: 'h2',
            attributes: { class: 'dialog__options-modal-header' },
            propsAndChildren: { text: 'Добавить пользователя' },
            contentTemplate: '{{text}}',
        });

        const userLoginInput = new Input({
            view: INPUT_VIEWS.DEFAULT,
            descr: 'Логин',
            invalidMessage: 'Некорректный логин',
            validateFunc: validateLogin,
            type: 'text',
            disabled: false,
            mix: 'dialog__login-input',
        });

        const addUserModalButton = new Button({
            text: 'Добавить',
            mix: 'dialog__modal-button',
        });

        const addUserModal = new Modal({
            contentTemplate: `
                {{{addUserModalHeader}}}
                {{{userLoginInput}}}
                {{{addUserModalButton}}}
            `,
            templateItems: {
                addUserModalHeader,
                userLoginInput,
                addUserModalButton,
            },
            onClose: () => {
                userLoginInput.setValue('');
            },
        });

        const removeUserModalHeader = new Block({
            tagName: 'h2',
            attributes: { class: 'dialog__options-modal-header' },
            propsAndChildren: { text: 'Удалить пользователя' },
            contentTemplate: '{{text}}',
        });

        const removeUserModalButton = new Button({
            text: 'Удалить',
            mix: 'dialog__modal-button',
        });

        const removeUserModal = new Modal({
            contentTemplate: `
                {{{removeUserModalHeader}}}
                {{{userLoginInput}}}
                {{{removeUserModalButton}}}
            `,
            templateItems: {
                removeUserModalHeader,
                userLoginInput,
                removeUserModalButton,
            },
            onClose: () => {
                userLoginInput.setValue('');
            },
        });

        const selectOptionsParams: { icon: string; text: string; events: [string, (event: Event) => void][] }[] = [
            {
                icon: Plus,
                text: 'Добавить пользователя',
                events: [
                    [
                        'click',
                        () => {
                            addUserModal.open();
                        },
                    ],
                ],
            },
            {
                icon: Cancel,
                text: 'Удалить пользователя',
                events: [
                    [
                        'click',
                        () => {
                            removeUserModal.open();
                        },
                    ],
                ],
            },
        ];

        const selectOptions = selectOptionsParams.map((optionParams) => new Select.SelectOption(optionParams));

        const select = new Select({ selectOptions });

        super({
            tagName: 'div',
            attributes: { class: 'dialog__options' },
            propsAndChildren: { select, addUserModal, removeUserModal, button },
            contentTemplate,
        });

        button.addEvents([
            [
                'click',
                () => {
                    select.toggle();
                },
            ],
        ]);

        const userActionRequest = async (action: 'delete' | 'add') => {
            const inputIsValid = userLoginInput.validate();

            if (!inputIsValid) {
                return;
            }

            const login = userLoginInput.getValue();
            const chatId = store.get('activeChatInfo').id;

            try {
                await ChatsApi[action === 'add' ? 'addUserToChat' : 'removeUserFromChat'](login, chatId);

                userLoginInput.setValue('');
                addUserModal.close();
                removeUserModal.close();
            } catch (error) {
                console.error(error);
            }
        };

        addUserModalButton.addEvents([
            [
                'click',
                () => {
                    userActionRequest('add');
                },
            ],
        ]);

        removeUserModalButton.addEvents([
            [
                'click',
                () => {
                    userActionRequest('delete');
                },
            ],
        ]);
    }
}
