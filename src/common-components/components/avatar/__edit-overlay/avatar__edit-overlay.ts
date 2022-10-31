import { Block } from '../../../../utils/';

import './avatar__edit-overlay.scss';

const contentTemplate = '<span class="avatar__edit-overlay-text">Поменять <br>аватар</span>';

export class AvatarEditOverlay extends Block {
    public constructor() {
        super({ tagName: 'div', attributes: { class: 'avatar__edit-overlay' }, contentTemplate });
    }
}
