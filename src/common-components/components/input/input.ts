import { Block } from '../../../utils';

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

export enum INPUT_VIEWS {
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
    public isValid: boolean;
    private _baseInput: SimpleInput;
    private _validateFunc?: (string: string) => boolean;

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
            value,
        } = props;

        let className = `input input_view_${view}`;

        if (mix) {
            className = [className, mix].join(' ');
        }

        const input = new SimpleInput({ events, mix: 'input__field', placeholder, type, name, disabled, value });

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
                        this._setIsValid(true);
                    },
                ],
            ]);
        }

        this.isValid = isValid;
        this._baseInput = input;
        this._validateFunc = validateFunc;
    }

    public validate() {
        if (this._validateFunc) {
            const baseInput = this._baseInput.getContent();
            const status = this._validateFunc(baseInput.value);
            this._setIsValid(status);
            return status;
        }

        return true;
    }

    private _setIsValid(status: boolean) {
        this.isValid = status;
        this.setProps({ error: !this.isValid });

        if (status) {
            this.getContent().classList.remove('input_not-valid');
        } else {
            this.getContent().classList.add('input_not-valid');
        }
    }

    public getIsValid() {
        return this.isValid;
    }

    public getValue() {
        return this._baseInput.getValue();
    }

    public setValue(value: string) {
        return this._baseInput.setValue(value);
    }
}
