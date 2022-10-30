import { Block } from '../../../utils';

import './button.scss';

interface Props {
    mix?: string;
    text: string;
    events?: [string, (event: Event) => void][];
}

const contentTemplate = '{{text}}';

export class Button extends Block {
    public constructor(props: Props) {
        const { mix, events, text } = props;

        let className = 'button';

        if (mix) {
            className = [className, mix].join(' ');
        }

        super({
            tagName: 'button',
            attributes: { class: className },
            events,
            propsAndChildren: { text },
            contentTemplate,
        });
    }
}
