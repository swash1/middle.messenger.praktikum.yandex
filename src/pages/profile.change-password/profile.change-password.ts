import { Button, Input } from '../../common-components';
import { INPUT_VIEWS } from '../../common-components/components/input/input';
import { validatePassword } from '../../common-components/utils/helpers';

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

                    const form: HTMLFormElement | null = document.querySelector('.info');

                    if (form) {
                        const formData = new FormData(form);
                        const data: Record<string, FormDataEntryValue | null> = {};
                        for (const input of inputs) {
                            if (input.name) {
                                data[input.name] = formData.get(input.name);
                            }
                        }

                        if (data.newPassword !== data.passwordAgain) {
                            this.setProps({
                                errorMessage: 'Пароли не совпадают',
                            });
                            return;
                        }

                        delete data.passwordAgain;

                        console.log(data);
                    }
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
