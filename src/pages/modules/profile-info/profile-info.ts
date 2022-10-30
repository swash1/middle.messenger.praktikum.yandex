import { ArrowButton, Divider, Input, Link, Avatar } from '../../../common-components';
import { ARROW_DIRECTIONS } from '../../../common-components/components/arrow-button/arrow-button';
import { APP_ROUTES } from '../../../constants';
import { AuthApi, Block, Router } from '../../../utils';

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
    static components = {} as {
        avatar?: Avatar;
    };

    public constructor({
        avatarImgSrc = 'https://via.placeholder.com/130x130',
        name = '',
        inputs,
        isEditable,
        button,
        errorMessage,
    }: Props) {
        const router = new Router();

        const arrowButton = new ArrowButton({
            direction: ARROW_DIRECTIONS.LEFT,
            events: [['click', router.back]],
        });

        const divider1 = new Divider();
        const divider2 = new Divider();

        const avatar = new Avatar({ isEditable: true, imgSrc: avatarImgSrc, mix: 'info__avatar' });
        ProfileInfo.components.avatar = avatar;

        const editProfileLink = new Link({
            url: APP_ROUTES.editProfile,
            text: 'Изменить данные',
            mix: 'profile-info__action-link',
            isRouter: true,
        });

        const changePasswordLink = new Link({
            url: APP_ROUTES.changePassword,
            text: 'Изменить пароль',
            mix: 'profile-info__action-link',
            isRouter: true,
        });

        const logOutLink = new Link({
            url: APP_ROUTES.login,
            text: 'Выйти',
            mix: 'profile-info__action-link profile-info__action-link_color_red',
            events: [
                [
                    'click',
                    async (event) => {
                        event.preventDefault();

                        try {
                            await AuthApi.logOut();
                            router.go(APP_ROUTES.login);
                        } catch (error) {
                            console.error(error);
                        }
                    },
                ],
            ],
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
