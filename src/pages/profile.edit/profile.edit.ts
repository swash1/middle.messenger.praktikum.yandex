import { Button, Input } from '../../common-components';
import { INPUT_VIEWS } from '../../common-components/components/input/input';
import { APP_ROUTES } from '../../constants';
import {
    Router,
    sendForm,
    validateEmail,
    validateLogin,
    validateName,
    validatePhone,
    UsersApi
} from '../../utils';

import { ProfileInfo } from '../modules/profile-info/profile-info';
import Profile from '../profile/profile';

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

const router = new Router();

class ProfileEdit extends ProfileInfo {
    static __instance: ProfileEdit;

    public constructor() {
        if (ProfileEdit.__instance) {
            return ProfileEdit.__instance;
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

        ProfileEdit.__instance = this;

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

                    const onValidationFail = () => {
                        this.setProps({
                            errorMessage: 'Есть некорректно заполненные поля',
                        });
                    };

                    sendForm({
                        inputs: inputsArray,
                        formSelector: '.info',
                        validationFailureCallback: onValidationFail,
                        api: UsersApi.updateUser,
                        onSuccess: () => {
                            Profile.shouldUpdate = true;
                            router.go(APP_ROUTES.profile);
                        },
                        onError: (error) => console.error(`Error: ${error.reason}`),
                    });
                },
            ],
        ]);
    }
}

export default ProfileEdit;
