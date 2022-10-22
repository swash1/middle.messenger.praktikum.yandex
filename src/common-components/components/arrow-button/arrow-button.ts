import { Block } from '../../utils/helpers';

import { BlueArrow } from '../../icons';

import './arrow-button.scss';

interface Props {
    direction?: ARROW_DIRECTIONS;
    events?: [string, (event: Event) => void][];
}

export enum ARROW_DIRECTIONS {
    TOP = 'top',
    LEFT = 'left',
    BOTTOM = 'bottom',
    RIGHT = 'right',
}

const contentTemplate = `
    ${BlueArrow}
`;

export class ArrowButton extends Block {
    public constructor(props: Props = {}) {
        const { direction = ARROW_DIRECTIONS.LEFT, events } = props;

        const className = `arrow-button arrow-button_direction_${direction}`;

        super({ tagName: 'button', attributes: { class: className }, contentTemplate, events });
    }
}
