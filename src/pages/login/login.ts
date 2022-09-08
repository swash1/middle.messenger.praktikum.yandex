import { Block, Button, Input, Link } from '../../common-components';
import { validateLogin } from '../../common-components/utils/helpers/validators';

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

export class Login extends Block {
    constructor() {
        const link = new Link({
            url: '/signin',
            target: Link.TARGET.SELF,
            text: 'Создать аккаунт',
        });

        const inputsArray = inputs.map((inputParams) => {
            return new Input({
                view: Input.INPUT_VIEWS.DEFAULT,
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

                        let formIsValid = true;
                        for (const inputItem of inputsArray) {
                            const inputIsValid = inputItem.validate();

                            if (!formIsValid) {
                                continue;
                            }

                            formIsValid = inputIsValid;
                        }

                        if (!formIsValid) {
                            return;
                        }

                        const form: HTMLFormElement | null = document.querySelector('.login-page__form');

                        if (form) {
                            const formData = new FormData(form);
                            const data: Record<string, FormDataEntryValue | null> = {};
                            for (const input of inputs) {
                                if (input.name) {
                                    data[input.name] = formData.get(input.name);
                                }
                            }

                            console.log(data);
                        }
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
    }
}

export default new Login();
