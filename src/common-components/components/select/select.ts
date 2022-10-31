import { Block } from '../../../utils';

import { SelectOption } from './__option/select__option';

import './select.scss';

interface Props {
    mix?: string;
    selectOptions: SelectOption[];
}

const contentTemplate = '{{{selectOptions}}}';

export class Select extends Block {
    static SelectOption = SelectOption;

    public constructor(props: Props) {
        const { mix, selectOptions } = props;

        let className = 'select';

        if (mix) {
            className = [className, mix].join(' ');
        }

        super({
            tagName: 'div',
            attributes: { class: className },
            propsAndChildren: { selectOptions },
            contentTemplate,
        });

        selectOptions.forEach((option) => {
            option.addEvents([
                [
                    'click',
                    (event) => {
                        event.stopPropagation();
                        this.close();
                    },
                ],
            ]);
        });
    }

    public open() {
        this.getContent().classList.add('select_visible');
    }

    public close() {
        this.getContent().classList.remove('select_visible');
    }

    public toggle() {
        this.getContent().classList.toggle('select_visible');
    }
}
