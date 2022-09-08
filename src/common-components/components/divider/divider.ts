import { Block } from '../../utils/helpers';

import './divider.scss';

interface Props {
    mix?: string;
}

export class Divider extends Block {
    constructor(props: Props = {}) {
        const { mix } = props;

        let className = 'divider';

        if (mix) {
            className = [className, mix].join(' ');
        }

        super({ tagName: 'div', attributes: { class: className } });
    }
}
