import { Block } from '../../utils/helpers/Block';

import './link.scss';

interface Props {
    mix?: string;
    text: string;
    url: string;
    target?: LINK_TARGETS;
}

enum LINK_TARGETS {
    BLANK = '_blank',
    SELF = '_self',
}

const contentTemplate = '{{text}}';

export class Link extends Block {
    static TARGET = {
        BLANK: LINK_TARGETS.BLANK,
        SELF: LINK_TARGETS.SELF,
    };

    constructor(props: Props) {
        const { mix, target = LINK_TARGETS.SELF, url, text } = props;

        let className = 'link';

        if (mix) {
            className = [className, mix].join(' ');
        }

        super({
            tagName: 'a',
            attributes: { class: className, target, href: url },
            propsAndChildren: { text },
            contentTemplate,
        });
    }
}
