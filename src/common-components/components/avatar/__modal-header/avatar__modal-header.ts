import { Block } from '../../../utils/helpers';

import './avatar__modal-header.scss';

interface Props {
    text: string;
}

const contentTemplate = '{{text}}';

export class AvatarModalHeader extends Block {
    public constructor({ text }: Props) {
        super({
            tagName: 'h2',
            attributes: { class: 'avatar__modal-header' },
            propsAndChildren: { text },
            contentTemplate,
        });
    }
}
