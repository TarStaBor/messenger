import { render } from '../utils/render';
import Block, { CommonProps } from './Block';

class Route {
    private _pathname: string;
    private _blockClass: typeof Block<CommonProps>;
    private _block: null | Block<CommonProps>;
    private _props: CommonProps;
    private _rootQuery: string;
    private _protectedRoute = false;
    private _leaveIfIsAuth = false;

    constructor(
        pathname: string,
        view: typeof Block<CommonProps>,
        rootQuery: string,
        options?: {
            blockProps?: CommonProps;
            protectedRoute?: boolean;
            leaveIfIsAuth?: boolean;
        }
    ) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = options?.blockProps || {};
        this._rootQuery = rootQuery;
        this._protectedRoute = options?.protectedRoute || false;
        this._leaveIfIsAuth = options?.leaveIfIsAuth || false;
    }

    get protectedRoute() {
        return this._protectedRoute;
    }

    get leaveIfIsAuth() {
        return this._leaveIfIsAuth;
    }

    get pathname() {
        return this._pathname;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block = null;
        }
    }

    match(pathname?: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
            render(this._rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

export default Route;
