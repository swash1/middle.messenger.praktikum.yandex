import { Button, Input } from '../../common-components';
import { INPUT_VIEWS } from '../../common-components/components/input/input';
import { APP_ROUTES, AVATARS_PATH } from '../../constants';
import { User } from '../../typings';
import {
    Router,
    sendForm,
    validateEmail,
    validateLogin,
    validateName,
    validatePhone,
    UsersApi,
    AuthApi,
    Store
} from '../../utils';

import { ProfileInfo } from '../modules/profile-info/profile-info';
import Profile from '../profile/profile';

const store = new Store();
const router = new Router();

class ProfileEdit extends ProfileInfo {
    private static __instance: ProfileEdit;
    static shouldUpdate: boolean = false;

    public constructor() {
        if (ProfileEdit.__instance) {
            if (ProfileEdit.shouldUpdate) {
                ProfileEdit.updateComponent();
            }
            return ProfileEdit.__instance;
        }
        const inputs = [] as Input[];

        const button = new Button({
            text: 'Сохранить',
        });

        super({ inputs, isEditable: true, button });

        ProfileEdit.__instance = this;

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
                        inputs: this.props.inputs,
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

        ProfileEdit.updateComponent();
    }

    static fetchData = async (): Promise<User> => {
        try {
            return await AuthApi.getUser();
        } catch (error) {
            throw Error(error);
        }
    };

    static updateComponent = async () => {
        try {
            const userInfo = await ProfileEdit.fetchData();

            store.set('userInfo', userInfo);

            ProfileEdit.__instance.setProps({
                inputs: ProfileEdit.getInputs(userInfo),
                name: userInfo.display_name,
            });

            ProfileEdit.components.avatar?.setProps({
                imgSrc: `${AVATARS_PATH}${userInfo.avatar}`,
            });

            ProfileEdit.shouldUpdate = false;
        } catch (error) {
            console.error(error);
        }
    };

    private static getInputs = (userInfo: User) => {
        return [
            {
                descr: 'Почта',
                type: 'email',
                name: 'email',
                disabled: false,
                validateFunc: validateEmail,
                value: userInfo.email
            },
            {
                descr: 'Логин',
                type: 'text',
                name: 'login',
                disabled: false,
                validateFunc: validateLogin,
                value: userInfo.login
            },
            {
                descr: 'Имя',
                type: 'text',
                name: 'first_name',
                disabled: false,
                validateFunc: validateName,
                value: userInfo.first_name
            },
            {
                descr: 'Фамилия',
                type: 'text',
                name: 'second_name',
                disabled: false,
                validateFunc: validateName,
                value: userInfo.second_name
            },
            {
                descr: 'Имя в чате',
                type: 'text',
                name: 'display_name',
                disabled: false,
                validateFunc: validateName,
                value: userInfo.display_name
            },
            {
                descr: 'Телефон',
                type: 'tel',
                name: 'phone',
                disabled: false,
                validateFunc: validatePhone,
                value: userInfo.phone
            },
        ].map((inputParams) => {
            return new Input({
                ...inputParams,
                view: INPUT_VIEWS.TWO_SIDED,
                events: [
                    [
                        'click',
                        () => {
                            ProfileEdit.__instance.setProps({
                                errorMessage: null,
                            });
                        },
                    ],
                ]
            });
        });
    };
}

export default ProfileEdit;
