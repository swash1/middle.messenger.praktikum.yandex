import {
    loginTmpl,
    notFoundTmpl,
    serverErrorTmpl,
    siginTmpl,
    chatsTmpl,
    profileTmpl,
    editProfileTmpl,
    changePasswordTmpl,
} from './pages';

import './style.scss';

const routes = {
    '/login': loginTmpl,
    '/404': notFoundTmpl,
    '/505': serverErrorTmpl,
    '/signin': siginTmpl,
    '/chats': chatsTmpl,
    '/profile': profileTmpl,
    '/profile/edit': editProfileTmpl,
    '/profile/change-password': changePasswordTmpl,
};

window.onload = () => {
    const pathName = window.location.pathname;
    const template = Object.keys(routes).includes(pathName) ? routes[pathName] : null;
    if (template) {
        document.querySelector('.root').innerHTML = template;
    } else {
        window.location.href = '/404';
    }
};
