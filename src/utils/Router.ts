import { Route } from './Route';
import { Block } from './Block';
import { HTTPTransport } from './HTTPTransport';
import { apiUrls } from '../../common-components/apiUrls';
import { urls } from '../../urls';
import { Store } from './Store';
import { ROOT_NODE_SELECTOR } from '../../common-components/constants';

const store = new Store();

export class Router {
    routes: Route[];
    history: History;
    _currentRoute: Route | null;
    _rootNode: string;
    static __instance: Router | null;

    constructor(rootNodeSelector?: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootNode = rootNodeSelector || ROOT_NODE_SELECTOR;

        Router.__instance = this;
    }

    use(pathname: string, block: new () => Block) {
        const route = new Route(pathname, block, { rootNode: this._rootNode });
        this.routes.push(route);
        return this;
    }

    start() {
        window.addEventListener('popstate', () => {
            this._onRoute(window.location.pathname);
        });

        HTTPTransport.get({ url: apiUrls.getUser })
            .then((response) => {
                const userInfo = JSON.parse(response as string);

                store.set('userInfo', userInfo);

                if (window.location.pathname === urls.login || window.location.pathname === urls.signIn) {
                    this.go(urls.chats);
                } else {
                    this.go(window.location.pathname);
                }
            })
            .catch(() => {
                this.go(urls.login);
            });
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            this.go(urls.notFound);
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}
