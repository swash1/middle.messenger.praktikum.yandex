import { Block } from '../../utils/helpers/Block';

import { ModalContent } from './__content/modal__content';

import './modal.scss';

interface Props {
    mix?: string;
    contentTemplate: string;
    templateItems?: Record<string, any>;
}

const contentTemplate = '{{{content}}}';

export class Modal extends Block {
    public constructor(props: Props) {
        const { mix, contentTemplate: modalContentTemplate, templateItems } = props;

        let className = 'modal';

        if (mix) {
            className = [className, mix].join(' ');
        }

        const content = new ModalContent({ template: modalContentTemplate, templateItems });

        super({
            tagName: 'div',
            attributes: { class: className },
            propsAndChildren: { content },
            contentTemplate,
        });

        const events: [string, (event: Event) => void][] = [
            [
                'mousedown',
                (event) => {
                    event.stopPropagation();
                    if (event.target === this.getContent()) {
                        this.close();
                    }
                },
            ],
        ];

        this.addEvents(events);
    }

    public open() {
        this.getContent().classList.add('modal_visible');
    }

    public close() {
        this.getContent().classList.remove('modal_visible');
    }
}
