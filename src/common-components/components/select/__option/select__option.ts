import { Block } from '../../../utils/helpers/Block';

import './select__option.scss';

interface Props {
    icon?: string;
    text: string;
    events?: [string, (event: Event) => void][];
}

const contentTemplate = `
    <div class="select__icon">
        {{{icon}}}
    </div> 
    <span class="select__option-text">
        {{text}}
    </span>
`;

export class SelectOption extends Block {
    public constructor(props: Props) {
        const { icon, text, events } = props;

        super({
            tagName: 'div',
            attributes: { class: 'select__option' },
            propsAndChildren: { icon, text },
            events,
            contentTemplate,
        });
    }
}
