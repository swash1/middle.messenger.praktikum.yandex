import { Block } from '../../../utils/helpers/block';

import './modal__content.scss';

interface Props {
    template: string;
    templateItems?: Record<string, any>;
}

export class ModalContent extends Block {
    constructor(props: Props) {
        const { template, templateItems } = props;

        super({
            tagName: 'div',
            attributes: { class: 'modal__content' },
            propsAndChildren: templateItems,
            contentTemplate: template,
        });
    }
}
