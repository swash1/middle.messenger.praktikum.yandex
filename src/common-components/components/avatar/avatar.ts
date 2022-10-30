import { Block, HTTPTransport } from '../../../utils';
import { apiUrls } from '../../apiUrls';
import { User } from '../../../typings';
import { AVATARS_PATH } from '../../../constants';

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
    <div class="avatar__wrapper">
        <img src="{{imgSrc}}" alt="avatar-img" class="avatar__image"s>
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

        button.addEvents([
            [
                'click',
                async (event) => {
                    event.preventDefault();

                    const form: HTMLFormElement | null = document.querySelector('.avatar__form');

                    if (form) {
                        const formData = new FormData(form);
                        try {
                            const response = (await HTTPTransport.put({
                                url: apiUrls.putUserAvatar,
                                options: {
                                    data: formData,
                                },
                            })) as string;

                            const userData: User = JSON.parse(response);

                            this.setProps({
                                imgSrc: `${AVATARS_PATH}${userData.avatar}`,
                            });
                            modal.close();
                        } catch (error) {
                            console.error(error);
                        }
                    }
                },
            ],
        ]);
    }
}
