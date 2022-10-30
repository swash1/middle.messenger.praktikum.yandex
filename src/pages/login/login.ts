import { Button, Input, Link } from '../../common-components';
import { apiUrls } from '../../common-components/apiUrls';
import { INPUT_VIEWS } from '../../common-components/components/input/input';
import { LINK_TARGETS } from '../../common-components/components/link/link';
import { APP_ROUTES } from '../../constants';
import { Block, Router, sendForm, validateLogin } from '../../utils';

import './login.scss';

const contentTemplate = `
    <form class="login-page__form" action="#" enctype="multipart/form-data">
        <div class="login-page__main-info">
            <h1 class="login-page__title">Вход</h1>
            {{{ inputs }}}
            <div class="login-page__controls">
                {{{ button }}}
                {{{ link }}}
            </div>
        </div>
    </form>
`;

const inputs = [
    {
        descr: 'Логин',
        type: 'text',
        name: 'login',
        disabled: false,
        validateFunc: validateLogin,
        invalidMessage: 'Некорректный логин',
    },
    {
        descr: 'Пароль',
        type: 'password',
        name: 'password',
        disabled: false,
    },
];

const router = new Router();

export class Login extends Block {
    static __instance: Login;

    public constructor() {
        if (Login.__instance) {
            return Login.__instance;
        }

        const link = new Link({
            url: APP_ROUTES.signIn,
            target: LINK_TARGETS.SELF,
            text: 'Создать аккаунт',
            isRouter: true,
        });

        const inputsArray = inputs.map((inputParams) => {
            return new Input({
                view: INPUT_VIEWS.DEFAULT,
                mix: 'login-page__input',
                ...inputParams,
            });
        });

        const button = new Button({
            text: 'Вход',
            mix: 'login-page__auth-button',
            events: [
                [
                    'click',
                    (event) => {
                        event.preventDefault();

                        sendForm({
                            inputs: inputsArray,
                            formSelector: '.login-page__form',
                            url: apiUrls.postSignIn,
                            onSuccess: () => {
                                router.go(APP_ROUTES.chats);
                            },
                            onError: (error) => console.error(`Error: ${error.reason}`),
                        });
                    },
                ],
            ],
        });

        super({
            tagName: 'div',
            attributes: { class: 'login-page' },
            propsAndChildren: { inputs: inputsArray, link, button },
            contentTemplate,
        });

        Login.__instance = this;
    }
}

export default Login;
