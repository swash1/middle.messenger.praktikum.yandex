import { Route } from './Route';
import { Block } from './Block';
import { rootNodeSelector as rootNode } from '../../constants';

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
        this._rootNode = rootNodeSelector || rootNode;

        Router.__instance = this;
    }

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block, { rootNode: this._rootNode });
        this.routes.push(route);
        return this;
    }

    start() {
        window.addEventListener('popstate', () => {
            this._onRoute(window.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
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
