import Block, { CommonProps } from './Block';
import Route from './Route';
import { MyStore, Store, StoreEvents } from './store';

class Router {
    private static __instance: Router | null = null;
    private routes: Route[] = [];
    private history: History = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery!: string;
    private _loginPagePath?: string;
    private _mainPagePath?: string;
    private _notFoundPath?: string;
    private _isAuth?: boolean;

    constructor(rootQuery: string, store: Store<MyStore>) {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }

        this._rootQuery = rootQuery;

        store.on(StoreEvents.Updated, () => {
            this._isAuth = !!store.getState().user;
            return true;
        });

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        Router.__instance = this;
    }

    use(
        pathname: string,
        block: typeof Block<CommonProps>,
        options?: {
            blockProps?: CommonProps;
            protectedRoute?: boolean;
            leaveIfIsAuth?: boolean;
            loginRoute?: boolean;
            mainPageRoute?: boolean;
            notFoundRoute?: boolean;
        }
    ) {
        const { loginRoute, mainPageRoute, notFoundRoute, ...rest } = options || {};
        this._notFoundPath = notFoundRoute ? pathname : this._notFoundPath;
        this._loginPagePath = loginRoute ? pathname : this._loginPagePath;
        this._mainPagePath = mainPageRoute ? pathname : this._mainPagePath;

        const route = new Route(pathname, block, this._rootQuery, rest);

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname?: string) {
        const route = this.getRoute(pathname) || this.getRoute(this._notFoundPath);
        if (!route) {
            return;
        }

        if (route.protectedRoute && !this._isAuth) {
            this.go(this._loginPagePath || '');
            return;
        }

        if (route.leaveIfIsAuth && this._isAuth) {
            this.go(this._mainPagePath || '');
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
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

    getRoute(pathname?: string) {
        return this.routes.find((route) => route.match(pathname));
    }

    getCurrentRoute() {
        return this._currentRoute;
    }
}

export default Router;
