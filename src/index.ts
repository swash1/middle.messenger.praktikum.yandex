import { APP_ROUTES, ROOT_NODE_SELECTOR } from './constants';
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
import { HTTPTransport, Store, Router } from './utils';
import { apiUrls } from './common-components/apiUrls';
import { User } from './typings';

import './style.scss';

const router = new Router(ROOT_NODE_SELECTOR);

const store = new Store();

const onRouterStart = async () => {
    try {
        const response = (await HTTPTransport.get({ url: apiUrls.getUser })) as string;
        const userInfo: User = JSON.parse(response);

        store.set('userInfo', userInfo);

        if (window.location.pathname === APP_ROUTES.login || window.location.pathname === APP_ROUTES.signIn) {
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
    .use(APP_ROUTES.signIn, siginPage)
    .use(APP_ROUTES.chats, chatsPage)
    .use(APP_ROUTES.profile, profilePage)
    .use(APP_ROUTES.editProfile, editProfilePage)
    .use(APP_ROUTES.changePassword, changePasswordPage)
    .start(onRouterStart);
