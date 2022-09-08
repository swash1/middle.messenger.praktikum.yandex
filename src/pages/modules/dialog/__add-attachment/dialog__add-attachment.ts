import { Block, Select } from '../../../../common-components';

import { Clip, Photo, File, Location } from '../../../../common-components/icons';

import './dialog__add-attachment.scss';

const contentTemplate = `
    ${Clip}
    {{{select}}}
`;

const selectOptionsParams = [
    {
        icon: Photo,
        text: 'Фото или видео',
    },
    {
        icon: File,
        text: 'Файл',
    },
    {
        icon: Location,
        text: 'Локация',
    },
];

export class DialogAddAttachment extends Block {
    constructor() {
        const selectOptions = selectOptionsParams.map((optionParams) => new Select.SelectOption(optionParams));

        const select = new Select({ selectOptions });

        super({
            tagName: 'div',
            attributes: { class: 'dialog__add-attachment' },
            propsAndChildren: { select },
            contentTemplate,
        });

        this.addEvents([
            [
                'click',
                () => {
                    select.toggle();
                },
            ],
        ]);
    }
}