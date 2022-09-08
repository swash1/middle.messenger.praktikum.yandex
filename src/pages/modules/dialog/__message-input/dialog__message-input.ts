import { Block } from '../../../../common-components';
import { SimpleInput } from '../../../../common-components/components/simple-input/simple-input';

import './dialog__message-input.scss';

const contentTemplate = `
    {{{input}}}
`;

export class DialogMessageInput extends Block {
    input: SimpleInput;

    constructor() {
        const input = new SimpleInput({
            name: 'message',
            mix: 'dialog__message-input',
            placeholder: 'Сообщение',
            autocomplete: 'off',
        });

        super({
            tagName: 'div',
            attributes: { class: 'dialog__message-input-wrapper' },
            propsAndChildren: { input },
            contentTemplate,
        });

        this.input = input;
    }

    getValue() {
        return this.input.getValue();
    }

    setValue(value: string) {
        this.input.setValue(value);
    }
}