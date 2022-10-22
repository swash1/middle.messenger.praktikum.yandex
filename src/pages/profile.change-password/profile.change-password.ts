import { Button, Input } from '../../common-components';
import { INPUT_VIEWS } from '../../common-components/components/input/input';
import { sendForm, validatePassword } from '../../common-components/utils/helpers';

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

class ChangePassword extends ProfileInfo {
    constructor() {
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

export default new ChangePassword();
