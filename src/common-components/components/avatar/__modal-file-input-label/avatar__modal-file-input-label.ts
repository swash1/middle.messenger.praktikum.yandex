import { Block } from '../../../../utils/';

import './avatar__modal-file-input-label.scss';

interface Props {
    text: string;
    input: Block;
}

const contentTemplate = '{{{input}}} {{text}}';

export class AvatarModalFileInputLabel extends Block {
    public constructor({ text, input }: Props) {
        super({
            tagName: 'label',
            attributes: { class: 'avatar__modal-file-input-label' },
            propsAndChildren: { text, input },
            contentTemplate,
        });
    }
}
