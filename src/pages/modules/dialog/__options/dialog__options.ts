import { Block, Button, Input, Select } from '../../../../common-components';
import { INPUT_VIEWS } from '../../../../common-components/components/input/input';
import { Modal } from '../../../../common-components/components/modal/modal';

import { Cancel, Plus, ThreeDots } from '../../../../common-components/icons';
import { validateLogin } from '../../../../common-components/utils/helpers';

import './dialog__options.scss';

const contentTemplate = `
    {{{button}}}
    {{{select}}}
    {{{addUserModal}}}
    {{{removeUserModal}}}
`;

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

        const userToAddLoginInput = new Input({
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
                {{{userToAddLoginInput}}}
                {{{addUserModalButton}}}
            `,
            templateItems: {
                addUserModalHeader,
                userToAddLoginInput,
                addUserModalButton,
            },
        });

        const removeUserModalHeader = new Block({
            tagName: 'h2',
            attributes: { class: 'dialog__options-modal-header' },
            propsAndChildren: { text: 'Удалить пользователя' },
            contentTemplate: '{{text}}',
        });

        const userToRemoveLoginInput = new Input({
            view: INPUT_VIEWS.DEFAULT,
            descr: 'Логин',
            invalidMessage: 'Некорректный логин',
            validateFunc: validateLogin,
            type: 'text',
            disabled: false,
            mix: 'dialog__login-input',
        });

        const removeUserModalButton = new Button({
            text: 'Удалить',
            mix: 'dialog__modal-button',
        });

        const removeUserModal = new Modal({
            contentTemplate: `
                {{{removeUserModalHeader}}}
                {{{userToRemoveLoginInput}}}
                {{{removeUserModalButton}}}
            `,
            templateItems: {
                removeUserModalHeader,
                userToRemoveLoginInput,
                removeUserModalButton,
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

        addUserModalButton.addEvents([
            [
                'click',
                () => {
                    const inputIsValid = userToAddLoginInput.validate();

                    if (!inputIsValid) {
                        return;
                    }

                    console.log(userToAddLoginInput.getValue());
                    userToAddLoginInput.setValue('');
                },
            ],
        ]);

        removeUserModalButton.addEvents([
            [
                'click',
                () => {
                    const inputIsValid = userToRemoveLoginInput.validate();

                    if (!inputIsValid) {
                        return;
                    }

                    console.log(userToRemoveLoginInput.getValue());
                    userToRemoveLoginInput.setValue('');
                },
            ],
        ]);
    }
}
