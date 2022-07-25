import { profileInfo } from '../modules/profile-info';

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

export default profileInfo({ name: 'Иван', isEditable: false, inputs });
