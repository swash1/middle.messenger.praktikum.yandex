import { Block } from '../../utils/helpers/Block';

export interface Props {
    placeholder?: string;
    type?: string;
    mix?: string;
    name?: string;
    disabled?: boolean;
    events?: [string, (event: Event) => void][];
    autocomplete?: string;
    value?: string;
}

export class SimpleInput extends Block {
    public constructor(props: Props) {
        const { mix, type = 'text', placeholder, name, disabled, events, autocomplete = 'off', value } = props;

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
            value
        };

        if (disabled) {
            attributes.disabled = 'true';
        }

        super({ tagName: 'input', attributes, events });
    }

    public getContent() {
        return this._rootElement as HTMLInputElement;
    }

    public getValue() {
        return this.getContent().value;
    }

    public setValue(value: string) {
        this.getContent().value = value;
    }
}
