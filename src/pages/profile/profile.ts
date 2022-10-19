import { Input } from '../../common-components';
import { INPUT_VIEWS } from '../../common-components/components/input/input';
import { ProfileInfo } from '../modules/profile-info/profile-info';

const inputs = [
    {
        descr: 'Почта',
        type: 'email',
        name: 'email',
        disabled: true,
    },
    {
        descr: 'Логин',
        type: 'text',
        name: 'login',
        disabled: true,
    },
    {
        descr: 'Имя',
        type: 'text',
        name: 'first_name',
        disabled: true,
    },
    {
        descr: 'Фамилия',
        type: 'text',
        name: 'second_name',
        disabled: true,
    },
    {
        descr: 'Имя в чате',
        type: 'text',
        name: 'display_name',
        disabled: true,
    },
    {
        descr: 'Телефон',
        type: 'tel',
        name: 'phone',
        disabled: true,
    },
];

class Profile extends ProfileInfo {
    constructor() {
        const inputsArray = inputs.map((inputParams) => {
            return new Input({
                ...inputParams,
                view: INPUT_VIEWS.TWO_SIDED,
            });
        });

        super({ inputs: inputsArray, name: 'Иван', isEditable: false });
    }
}

export default new Profile();
