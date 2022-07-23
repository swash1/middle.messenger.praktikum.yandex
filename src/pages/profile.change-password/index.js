import { profileInfo } from '../modules/profile-info';

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
        disabled: false,
    },
    {
        descr: 'Повторите новый пароль',
        type: 'password',
        disabled: false,
    },
];

export default profileInfo({ isEditable: true, inputs });
