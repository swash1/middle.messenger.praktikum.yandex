import { Router } from '../../utils/helpers';
import { Block } from '../../utils/helpers/Block';

import './link.scss';

interface Props {
    mix?: string;
    text: string;
    url: string;
    target?: LINK_TARGETS;
    isRouter?: boolean;
    events?: [string, (event: Event) => void][];
}

export enum LINK_TARGETS {
    BLANK = '_blank',
    SELF = '_self',
}

const contentTemplate = '{{text}}';

export class Link extends Block {
    public constructor(props: Props) {
        const { mix, target = LINK_TARGETS.SELF, url, text, isRouter, events } = props;

        let className = 'link';

        if (mix) {
            className = [className, mix].join(' ');
        }

        super({
            tagName: 'a',
            attributes: { class: className, target, href: url },
            propsAndChildren: { text },
            contentTemplate,
            events,
        });

        if (isRouter) {
            const router = new Router();

            this.addEvents([
                [
                    'click',
                    (event) => {
                        event.preventDefault();

                        router.go(url);
                    },
                ],
            ]);
        }
    }
}
