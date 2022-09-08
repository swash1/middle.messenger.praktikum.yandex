import { Block } from '../../utils/helpers';

import { Props as InputProps, SimpleInput } from '../simple-input/simple-input';

import './input.scss';

export interface Props extends InputProps {
    descr?: string;
    mix?: string;
    invalidMessage?: string;
    isValid?: boolean;
    view?: string;
    validateFunc?: (string: string) => boolean;
}

enum INPUT_VIEWS {
    DEFAULT = 'default',
    TWO_SIDED = 'two-sided',
}

const contentTemplate = `
    <span class="input__descr">{{ descr }}</span>
    {{{ input }}}
    {{#if error}}
        <span class="input__invalid-message">{{ invalidMessage }}</span>
    {{/if}}
`;

export class Input extends Block {
    isValid: boolean;
    baseInput: SimpleInput;
    validateFunc?: (string: string) => boolean;

    static INPUT_VIEWS = {
        DEFAULT: INPUT_VIEWS.DEFAULT,
        TWO_SIDED: INPUT_VIEWS.TWO_SIDED,
    };

    constructor(props: Props) {
        const {
            mix,
            view = INPUT_VIEWS.DEFAULT,
            isValid = true,
            descr,
            invalidMessage,
            events,
            validateFunc,
            placeholder,
            type,
            name,
            disabled,
        } = props;

        let className = `input input_view_${view}`;

        if (mix) {
            className = [className, mix].join(' ');
        }

        const input = new SimpleInput({ events, mix: 'input__field', placeholder, type, name, disabled });

        super({
            tagName: 'div',
            attributes: { class: className },
            propsAndChildren: { descr, invalidMessage, input },
            contentTemplate,
        });

        if (validateFunc) {
            input.addEvents([
                [
                    'blur',
                    () => {
                        this.validate();
                    },
                ],
                [
                    'mousedown',
                    () => {
                        this.setIsValid(true);
                    },
                ],
            ]);
        }

        this.isValid = isValid;
        this.baseInput = input;
        this.validateFunc = validateFunc;
    }

    validate() {
        if (this.validateFunc) {
            const baseInput = this.baseInput.getContent();
            const status = this.validateFunc(baseInput.value);
            this.setIsValid(status);
            return this.getIsValid();
        }

        return true;
    }

    setIsValid(status: boolean) {
        this.isValid = status;
        this.setProps({ error: !this.isValid });

        if (status) {
            this.getContent().classList.remove('input_not-valid');
        } else {
            this.getContent().classList.add('input_not-valid');
        }
    }

    getIsValid() {
        return this.isValid;
    }

    getValue() {
        return this.baseInput.getValue();
    }

    setValue(value: string) {
        return this.baseInput.setValue(value);
    }
}
