import { Block, Button, Link, Input } from '../../common-components';
import {
    validateEmail,
    validateLogin,
    validateName,
    validatePassword,
    validatePhone,
} from '../../common-components/utils/helpers/validators';
import { Props as InputParams } from '../../common-components/components/input/input';

import './signin.scss';

const contentTemplate = `
    <form class="signin-page__form" action="#" enctype="multipart/form-data">
        <h1 class="signin-page__title">Регистрация</h1>               
        {{{inputs}}}
        <span class="signin-page__error-message">{{errorMessage}}</span>
        {{{button}}}
        {{{link}}}
    </form>
`;

const inputs: InputParams[] = [
    {
        descr: 'Почта',
        type: 'email',
        name: 'email',
        disabled: false,
        validateFunc: validateEmail,
        invalidMessage: 'Неверная почта',
    },
    {
        descr: 'Логин',
        type: 'text',
        name: 'login',
        disabled: false,
        validateFunc: validateLogin,
        invalidMessage: 'Неверный логин',
    },
    {
        descr: 'Имя',
        type: 'text',
        name: 'first_name',
        disabled: false,
        validateFunc: validateName,
        invalidMessage: 'Некорректно введено имя',
    },
    {
        descr: 'Фамилия',
        type: 'text',
        name: 'second_name',
        disabled: false,
        validateFunc: validateName,
        invalidMessage: 'Некорректно введена фамилия',
    },
    {
        descr: 'Телефон',
        type: 'tel',
        name: 'phone',
        disabled: false,
        validateFunc: validatePhone,
        invalidMessage: 'Некорректный номер телефона',
    },
    {
        descr: 'Пароль',
        type: 'password',
        name: 'password',
        disabled: false,
        validateFunc: validatePassword,
        invalidMessage: 'Некорректный пароль',
        events: [
            [
                'mousedown',
                () => {
                    document
                        .querySelector('.signin-page__error-message')
                        ?.classList.remove('signin-page__error-message_visible');
                },
            ],
        ],
    },
    {
        descr: 'Пароль еще раз',
        type: 'password',
        name: 'password-again',
        disabled: false,
        validateFunc: validatePassword,
        invalidMessage: 'Некорректный пароль',
        events: [
            [
                'mousedown',
                () => {
                    document
                        .querySelector('.signin-page__error-message')
                        ?.classList.remove('signin-page__error-message_visible');
                },
            ],
        ],
    },
];

export class SignIn extends Block {
    constructor() {
        const inputsArray = inputs.map(
            (inputParams) =>
                new Input({
                    view: Input.INPUT_VIEWS.DEFAULT,
                    mix: 'signin-page__input',
                    ...inputParams,
                })
        );

        const button = new Button({
            text: 'Зарегестрироваться',
            mix: 'signin-page__button',
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

                        const form: HTMLFormElement | null = document.querySelector('.signin-page__form');

                        if (form) {
                            const formData = new FormData(form);
                            const data: Record<string, FormDataEntryValue | null> = {};
                            for (const input of inputs) {
                                if (input.name) {
                                    data[input.name] = formData.get(input.name);
                                }
                            }

                            if (data.password !== data['password-again']) {
                                document
                                    .querySelector('.signin-page__error-message')
                                    ?.classList.add('signin-page__error-message_visible');
                                return;
                            }

                            delete data['password-again'];

                            console.log(data);
                        }
                    },
                ],
            ],
        });

        const link = new Link({
            url: '/profile',
            target: Link.TARGET.SELF,
            text: 'Войти',
        });

        super({
            tagName: 'div',
            attributes: { class: 'signin-page' },
            propsAndChildren: { inputs: inputsArray, button, link, errorMessage: 'Пароли не совпадают' },
            contentTemplate,
        });
    }
}

export default new SignIn();