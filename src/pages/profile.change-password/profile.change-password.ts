import { Button, Input } from '../../common-components';
import { INPUT_VIEWS } from '../../common-components/components/input/input';
import { APP_ROUTES } from '../../constants';
import { Router, sendForm, UsersApi, validatePassword } from '../../utils';

import { ProfileInfo } from '../modules/profile-info/profile-info';

const inputs = [
    {
        descr: 'Старый пароль',
        type: 'password',
        name: 'oldPassword',
        disabled: false,
    },
    {
        descr: 'Новый пароль',
        type: 'password',
        name: 'newPassword',
        validateFunc: validatePassword,
        disabled: false,
    },
    {
        descr: 'Повторите новый пароль',
        type: 'password',
        name: 'passwordAgain',
        validateFunc: validatePassword,
        disabled: false,
    },
];

const router = new Router();

class ChangePassword extends ProfileInfo {
    static __instance: ChangePassword;

    public constructor() {
        if (ChangePassword.__instance) {
            return ChangePassword.__instance;
        }

        const inputsArray = inputs.map((inputParams) => {
            return new Input({
                ...inputParams,
                view: INPUT_VIEWS.TWO_SIDED,
            });
        });

        const button = new Button({
            text: 'Сохранить',
        });

        super({ inputs: inputsArray, isEditable: true, button });

        ChangePassword.__instance = this;

        button.addEvents([
            [
                'click',
                (event) => {
                    event.preventDefault();

                    const extraValidationFunc = (formData: FormData) => {
                        if (formData.get('newPassword') !== formData.get('passwordAgain')) {
                            this.setProps({
                                errorMessage: 'Пароли не совпадают',
                            });
                            return false;
                        }

                        formData.delete('passwordAgain');
                        return true;
                    };

                    sendForm({
                        inputs: inputsArray,
                        formSelector: '.info',
                        extraValidationFunc,
                        api: UsersApi.changePassword,
                        onSuccess: () => {
                            router.go(APP_ROUTES.profile);
                        },
                        onError: (error) => console.error(`Error: ${error.reason}`),
                    });
                },
            ],
        ]);

        inputsArray.forEach((input) => {
            input.setEvents([
                [
                    'click',
                    () => {
                        this.setProps({
                            errorMessage: null,
                        });
                    },
                ],
            ]);
        });
    }
}

export default ChangePassword;
