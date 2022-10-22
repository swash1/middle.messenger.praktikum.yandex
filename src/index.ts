import { Block } from './common-components';
import { render } from './common-components/utils/helpers/renderDOM';
import {
    loginPage,
    notFoundPage,
    serverErrorPage,
    siginPage,
    chatsPage,
    profilePage,
    editProfilePage,
    changePasswordPage,
} from './pages';

import './style.scss';

const routes: Record<string, Block> = {
    '/login': loginPage,
    '/404': notFoundPage,
    '/500': serverErrorPage,
    '/signin': siginPage,
    '/chats': chatsPage,
    '/profile': profilePage,
    '/profile/edit': editProfilePage,
    '/profile/change-password': changePasswordPage,
};

window.onload = () => {
    const pathName = window.location.pathname;
    const block = Object.keys(routes).includes(pathName) ? routes[pathName] : null;
    if (block) {
        render('.root', block)
    } else {
        window.location.href = '/404';
    }
};
