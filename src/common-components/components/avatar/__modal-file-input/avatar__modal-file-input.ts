import { Block } from '../../../utils/helpers';

import './avatar__modal-file-input.scss';

export class AvatarModalFileInput extends Block {
    public constructor() {
        super({
            tagName: 'input',
            attributes: {
                class: 'avatar__modal-file-input',
                type: 'file',
                accept: 'image/png, image/gif, image/jpeg',
                name: 'avatar',
            },
        });
    }
}
