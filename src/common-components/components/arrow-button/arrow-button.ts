import { Block } from '../../utils/helpers';

import { BlueArrow } from '../../icons';

import './arrow-button.scss';

interface Props {
    direction?: ARROW_DIRECTIONS;
    events?: [string, (event: Event) => void][];
}

enum ARROW_DIRECTIONS {
    TOP = 'top',
    LEFT = 'left',
    BOTTOM = 'bottom',
    RIGHT = 'right',
}

const contentTemplate = `
    ${BlueArrow}
`;

export class ArrowButton extends Block {
    static ARROW_DIRECTIONS = {
        TOP: ARROW_DIRECTIONS.TOP,
        LEFT: ARROW_DIRECTIONS.LEFT,
        BOTTOM: ARROW_DIRECTIONS.BOTTOM,
        RIGHT: ARROW_DIRECTIONS.RIGHT,
    };

    constructor(props: Props = {}) {
        const { direction = ARROW_DIRECTIONS.LEFT, events } = props;

        const className = `arrow-button arrow-button_direction_${direction}`;

        super({ tagName: 'button', attributes: { class: className }, contentTemplate, events });
    }
}
