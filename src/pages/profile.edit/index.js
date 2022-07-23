import { profileInfo } from '../modules/profile-info';

const inputs = [
    {
        descr: 'Почта',
        type: 'email',
        name: 'email',
        disabled: false,
    },
    {
        descr: 'Логин',
        type: 'text',
        name: 'login',
        disabled: false,
    },
    {
        descr: 'Имя',
        type: 'text',
        name: 'first_name',
        disabled: false,
    },
    {
        descr: 'Фамилия',
        type: 'text',
        name: 'second_name',
        disabled: false,
    },
    {
        descr: 'Имя в чате',
        type: 'text',
        name: 'display_name',
        disabled: false,
    },
    {
        descr: 'Телефон',
        type: 'tel',
        name: 'phone',
        disabled: false,
    },
];

export default profileInfo({ isEditable: true, inputs });
