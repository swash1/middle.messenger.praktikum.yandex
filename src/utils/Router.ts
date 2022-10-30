import { Route } from './Route';
import { Block } from './Block';
import { APP_ROUTES, ROOT_NODE_SELECTOR } from '../constants';

export class Router {
    private routes: Route[];
    private history: History;
    private currentRoute: Route | null;
    private rootNode: string;
    private static __instance: Router | null;

    constructor(rootNodeSelector?: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootNode = rootNodeSelector || ROOT_NODE_SELECTOR;

        Router.__instance = this;
    }

    public use(pathname: string, block: new () => Block) {
        const route = new Route(pathname, block, { rootNode: this.rootNode });
        this.routes.push(route);
        return this;
    }

    public start(callback?: () => void) {
        window.addEventListener('popstate', () => {
            this.onRoute(window.location.pathname);
        });

        if (callback) {
            callback();
        }
    }

    private onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            this.go(APP_ROUTES.notFound);
            return;
        }

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;
        route.render();
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    private getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}
