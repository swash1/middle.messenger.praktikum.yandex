import { Button, Input } from '../../common-components';
import { validateEmail, validateLogin, validateName, validatePhone } from '../../common-components/utils/helpers';

import { ProfileInfo } from '../modules/profile-info/profile-info';

const inputs = [
    {
        descr: 'Почта',
        type: 'email',
        name: 'email',
        disabled: false,
        validateFunc: validateEmail,
    },
    {
        descr: 'Логин',
        type: 'text',
        name: 'login',
        disabled: false,
        validateFunc: validateLogin,
    },
    {
        descr: 'Имя',
        type: 'text',
        name: 'first_name',
        disabled: false,
        validateFunc: validateName,
    },
    {
        descr: 'Фамилия',
        type: 'text',
        name: 'second_name',
        disabled: false,
        validateFunc: validateName,
    },
    {
        descr: 'Имя в чате',
        type: 'text',
        name: 'display_name',
        disabled: false,
        validateFunc: validateName,
    },
    {
        descr: 'Телефон',
        type: 'tel',
        name: 'phone',
        disabled: false,
        validateFunc: validatePhone,
    },
];

class ProfileEdit extends ProfileInfo {
    constructor() {
        const inputsArray = inputs.map((inputParams) => {
            return new Input({
                ...inputParams,
                view: Input.INPUT_VIEWS.TWO_SIDED,
            });
        });

        const button = new Button({
            text: 'Сохранить',
        });

        super({ inputs: inputsArray, isEditable: true, button });

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
                        this.setProps({
                            errorMessage: 'Есть некорректно заполненные поля',
                        });
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

                        console.log(data);
                    }
                },
            ],
        ]);
    }
}

export default new ProfileEdit();
