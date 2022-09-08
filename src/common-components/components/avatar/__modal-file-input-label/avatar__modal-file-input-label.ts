import { Block } from '../../../utils/helpers';

import './avatar__modal-file-input-label.scss';

interface Props {
    text: string;
    input: Block;
}

const contentTemplate = '{{{input}}} {{text}}';

export class AvatarModalFileInputLabel extends Block {
    constructor({ text, input }: Props) {
        super({
            tagName: 'label',
            attributes: { class: 'avatar__modal-file-input-label' },
            propsAndChildren: { text, input },
            contentTemplate,
        });
    }
}
