import { Block } from '../../utils/helpers/block';

export interface Props {
    placeholder?: string;
    type?: string;
    mix?: string;
    name?: string;
    disabled?: boolean;
    events?: [string, (event: Event) => void][];
    autocomplete?: string;
}

export class SimpleInput extends Block {
    constructor(props: Props) {
        const { mix, type = 'text', placeholder, name, disabled, events, autocomplete = 'off' } = props;

        let className = 'simple-input';

        if (mix) {
            className = [className, mix].join(' ');
        }

        const attributes: Record<string, string | undefined> = {
            class: className,
            type,
            placeholder,
            name,
            autocomplete,
        };

        if (disabled) {
            attributes.disabled = 'true';
        }

        super({ tagName: 'input', attributes, events });
    }

    getContent() {
        return this._rootElement as HTMLInputElement;
    }

    getValue() {
        return this.getContent().value;
    }

    setValue(value: string) {
        this.getContent().value = value;
    }
}
