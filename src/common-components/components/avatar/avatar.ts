import { Block } from '../../utils/helpers';

import { Modal } from '../modal/modal';
import { Button } from '../button/button';

import { AvatarModalHeader } from './__modal-header/avatar__modal-header';
import { AvatarModalFileInput } from './__modal-file-input/avatar__modal-file-input';
import { AvatarModalFileInputLabel } from './__modal-file-input-label/avatar__modal-file-input-label';
import { AvatarEditOverlay } from './__edit-overlay/avatar__edit-overlay';

import './avatar.scss';

interface Props {
    mix?: string;
    imgSrc: string;
    events?: [string, (event: Event) => void][];
    isEditable?: boolean;
}

const contentTemplate = `
    <div>
        <img src="{{imgSrc}}" alt="img" class="avatar__image">
        {{#if isEditable}}
            {{{editOverlay}}}
            {{{modal}}}
        {{/if}}
    </div>
`;

export class Avatar extends Block {
    public constructor(props: Props) {
        const { mix, events, isEditable = false, imgSrc } = props;

        let className = 'avatar';

        if (mix) {
            className = [className, mix].join(' ');
        }

        const editOverlay = new AvatarEditOverlay();

        const modalHeader = new AvatarModalHeader({ text: 'Загрузите файл' });

        const modalFileInput = new AvatarModalFileInput();

        const modalFileInputLabel = new AvatarModalFileInputLabel({
            text: 'Выбрать файл на компьютере',
            input: modalFileInput,
        });

        const button = new Button({
            text: 'Поменять',
            mix: 'avatar__modal-button',
            events: [
                [
                    'click',
                    (event) => {
                        event.preventDefault();

                        const form: HTMLFormElement | null = document.querySelector('.avatar__form');

                        if (form) {
                            const formData = new FormData(form);
                            const data: Record<string, FormDataEntryValue | null> = {};

                            data.file = formData.get(modalFileInput.getAttribute('name') as string);

                            console.log(data);
                        }
                    },
                ],
            ],
        });

        const modal = new Modal({
            contentTemplate: `
                <form class="avatar__form" action="#" enctype="multipart/form-data">
                    {{{modalHeader}}}
                    {{{modalFileInputLabel}}}
                    {{{button}}}
                </form>
            `,
            templateItems: {
                modalHeader,
                modalFileInputLabel,
                button,
            },
            mix: 'avatar__modal',
        });

        super({
            tagName: 'div',
            attributes: { class: className },
            events,
            propsAndChildren: { modal, editOverlay, isEditable, imgSrc },
            contentTemplate,
        });

        // TODO - ограничение на размер файла
        modalFileInput.addEvents([
            [
                'change',
                () => {
                    const fileInputContent = modalFileInput.getContent() as HTMLInputElement;
                    const fileList = fileInputContent.files;

                    if (fileList) {
                        const fileInfo = fileList[0];
                        modalHeader.setProps({ text: 'Файл загружен' });
                        modalFileInputLabel.setProps({ text: fileInfo.name });
                    }
                },
            ],
        ]);

        editOverlay.addEvents([
            [
                'click',
                () => {
                    modal.open();
                },
            ],
        ]);
    }
}
