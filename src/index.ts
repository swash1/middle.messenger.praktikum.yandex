import { rootNodeSelector } from './common-components/constants';
import { urls } from './common-components/urls';
import { Router } from './common-components/utils/helpers';
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

const router = new Router(rootNodeSelector);

router
    .use(urls.index, chatsPage)
    .use(urls.login, loginPage)
    .use(urls.notFound, notFoundPage)
    .use(urls.serverError, serverErrorPage)
    .use(urls.signIn, siginPage)
    .use(urls.chats, chatsPage)
    .use(urls.profile, profilePage)
    .use(urls.editProfile, editProfilePage)
    .use(urls.changePassword, changePasswordPage)
    .start();
