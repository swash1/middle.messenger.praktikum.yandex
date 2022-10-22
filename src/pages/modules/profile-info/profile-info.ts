import { ArrowButton, Block, Divider, Input, Link, Avatar } from '../../../common-components';
import { ARROW_DIRECTIONS } from '../../../common-components/components/arrow-button/arrow-button';

import './profile-info.scss';

interface Props {
    avatarImgSrc?: string;
    name?: string;
    inputs: Input[];
    isEditable?: boolean;
    button?: Block;
    errorMessage?: string;
}

const contentTemplate = `
    <div class="profile-info__back">
        {{{ arrowButton }}}
    </div>
    <div class="profile-info__info-wrapper">
        {{{avatar}}}
        {{#if name}}
            <span class="info__name">{{ name }}</span>
        {{/if}}
        <form class="info">
            <div class="info__fields">
                {{{ inputs }}}
            </div>

            {{#if isEditable}}
                {{{ saveButton }}}
                {{#if errorMessage}}
                    <span class="profile-info__error-message">{{errorMessage}}</span>
                {{/if}}
            {{else}}
                {{{ editProfileLink }}}
                {{{ divider1 }}}
                {{{ changePasswordLink }}}
                {{{ divider2 }}}
                {{{ logOutLink }}}
            {{/if}}
        </form>
    </div>
`;

export class ProfileInfo extends Block {
    public constructor({
        avatarImgSrc = 'https://via.placeholder.com/130x130',
        name = '',
        inputs,
        isEditable,
        button,
        errorMessage,
    }: Props) {
        const arrowButton = new ArrowButton({
            direction: ARROW_DIRECTIONS.LEFT,
            events: [
                [
                    'click',
                    () => {
                        window.history.back();
                    },
                ],
            ],
        });

        const divider1 = new Divider();
        const divider2 = new Divider();

        const avatar = new Avatar({ isEditable: true, imgSrc: avatarImgSrc, mix: 'info__avatar' });

        const editProfileLink = new Link({
            url: '/profile/edit',
            text: 'Изменить данные',
            mix: 'profile-info__action-link',
        });

        const changePasswordLink = new Link({
            url: '/profile/change-password',
            text: 'Изменить пароль',
            mix: 'profile-info__action-link',
        });

        const logOutLink = new Link({
            url: '/login',
            text: 'Выйти',
            mix: 'profile-info__action-link profile-info__action-link_color_red',
        });

        super({
            tagName: 'div',
            attributes: { class: 'profile-info' },
            propsAndChildren: {
                avatarImgSrc,
                name,
                arrowButton,
                saveButton: button,
                divider1,
                divider2,
                editProfileLink,
                changePasswordLink,
                logOutLink,
                avatar,
                inputs,
                isEditable,
                errorMessage,
            },
            contentTemplate,
        });
    }
}
