import { Button, Link, Input } from '../../common-components';
import { INPUT_VIEWS, Props as InputParams } from '../../common-components/components/input/input';
import { LINK_TARGETS } from '../../common-components/components/link/link';
import {
    AuthApi,
    Block,
    Router,
    sendForm,
    validateEmail,
    validateLogin,
    validateName,
    validatePassword,
    validatePhone,
} from '../../utils';
import { APP_ROUTES } from '../../constants';

import './signup.scss';

const contentTemplate = `
    <form class="signup-page__form" action="#" enctype="multipart/form-data">
        <h1 class="signup-page__title">Регистрация</h1>               
        {{{inputs}}}
        <span class="signup-page__error-message">{{errorMessage}}</span>
        {{{button}}}
        {{{link}}}
    </form>
`;

const hideErrorMessage = () => {
    document.querySelector('.signup-page__error-message')?.classList.remove('signup-page__error-message_visible');
};

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
        events: [['mousedown', hideErrorMessage]],
    },
    {
        descr: 'Пароль еще раз',
        type: 'password',
        name: 'password-again',
        disabled: false,
        validateFunc: validatePassword,
        invalidMessage: 'Некорректный пароль',
        events: [['mousedown', hideErrorMessage]],
    },
];

const router = new Router();

export class SignUp extends Block {
    static __instance: SignUp;

    public constructor() {
        if (SignUp.__instance) {
            return SignUp.__instance;
        }

        const inputsArray = inputs.map(
            (inputParams) =>
                new Input({
                    view: INPUT_VIEWS.DEFAULT,
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

                        const extraFormValidationFunc = (formData: FormData) => {
                            if (formData.get('password') !== formData.get('password-again')) {
                                document
                                    .querySelector('.signup-page__error-message')
                                    ?.classList.add('signup-page__error-message_visible');
                                return false;
                            }

                            formData.delete('password-again');
                            return true;
                        };

                        sendForm({
                            inputs: inputsArray,
                            formSelector: '.signup-page__form',
                            extraValidationFunc: extraFormValidationFunc,
                            api: AuthApi.signin,
                            onSuccess: async () => {
                                try {
                                    router.go(APP_ROUTES.chats);
                                } catch (error) {
                                    console.error(error);
                                }
                            },
                            onError: (error) => console.error(`Error: ${error.reason}`),
                        });
                    },
                ],
            ],
        });

        const link = new Link({
            url: APP_ROUTES.profile,
            target: LINK_TARGETS.SELF,
            text: 'Войти',
            isRouter: true,
        });

        super({
            tagName: 'div',
            attributes: { class: 'signup-page' },
            propsAndChildren: { inputs: inputsArray, button, link, errorMessage: 'Пароли не совпадают' },
            contentTemplate,
        });

        SignUp.__instance = this;
    }
}

export default SignUp;
