import { APP_ROUTES, ROOT_NODE_SELECTOR } from './constants';
import {
    loginPage,
    notFoundPage,
    serverErrorPage,
    signUpPage,
    chatsPage,
    profilePage,
    editProfilePage,
    changePasswordPage,
} from './pages';
import { Store, Router, AuthApi } from './utils';

import './style.scss';

const router = new Router(ROOT_NODE_SELECTOR);

const store = new Store();

const onRouterStart = async () => {
    try {
        const userInfo = await AuthApi.getUser();

        store.set('userInfo', userInfo);

        if (window.location.pathname === APP_ROUTES.login || window.location.pathname === APP_ROUTES.signUp) {
            router.go(APP_ROUTES.chats);
        } else {
            router.go(window.location.pathname);
        }
    } catch {
        router.go(APP_ROUTES.login);
    }
};

router
    .use(APP_ROUTES.index, chatsPage)
    .use(APP_ROUTES.login, loginPage)
    .use(APP_ROUTES.notFound, notFoundPage)
    .use(APP_ROUTES.serverError, serverErrorPage)
    .use(APP_ROUTES.signUp, signUpPage)
    .use(APP_ROUTES.chats, chatsPage)
    .use(APP_ROUTES.profile, profilePage)
    .use(APP_ROUTES.editProfile, editProfilePage)
    .use(APP_ROUTES.changePassword, changePasswordPage)
    .start(onRouterStart);
