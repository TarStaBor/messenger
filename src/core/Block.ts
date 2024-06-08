import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

export type EventType = keyof HTMLElementEventMap;

export type ComponentList<T extends CommonProps> = {
    Component: typeof Block<T>;
    propList: T[];
};

export type ChildrenBlock = Block<Record<string, unknown>>;

export interface CommonProps extends Record<string, unknown> {
    events?: Partial<Record<EventType, EventListener>>;
}

class Block<Props extends CommonProps> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_CWU: 'flow:component-will-unmount',
        FLOW_RENDER: 'flow:render',
    };

    public id = nanoid(6);
    public children: Record<string, ChildrenBlock> = {};
    protected props: Props;
    protected _element: HTMLElement | null = null;
    private eventBus: () => EventBus;

    constructor(props: Props) {
        const { children, listKeys } = this._getPropsChildren(props);
        this.children = children;
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;
        this.props = this._makePropsProxy({ ...props, ...listKeys });
        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEventListeners() {
        const { events } = this.props;
        if (!events) return;

        (Object.keys(events) as EventType[]).forEach((eventName) => {
            const handler = events[eventName];
            if (handler) {
                this._element?.addEventListener(eventName, handler);
            }
        });
    }

    private _removeEventListeners() {
        const { events } = this.props;
        if (!events) return;

        (Object.keys(events) as EventType[]).forEach((eventName) => {
            const handler = events[eventName];
            if (handler) {
                this._element?.removeEventListener(eventName, handler);
            }
        });
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {}

    private _componentDidMount() {
        this._checkInDom();
        this.componentDidMount();
    }

    protected componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(...args: unknown[]) {
        if (this.componentDidUpdate.apply(this, args)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(...args: unknown[]) {
        return !!args;
    }

    private _componentWillUnmount() {
        this.componentWillUnmount();
    }

    protected componentWillUnmount() {}

    private _checkInDom() {
        const elementInDOM = document.body.contains(this._element);
        if (elementInDOM) {
            setTimeout(() => this._checkInDom(), 1000);
            return;
        }
        this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
    }

    public setProps = (nextProps: Partial<Props>) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        this._removeEventListeners();
        const propsAndStubs: Record<string, string | unknown> = { ...this.props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
        });

        const element = Handlebars.compile(this.render())(propsAndStubs);
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = element;
        const newElement = fragment.content.firstElementChild as HTMLElement | null;

        (Object.values(this.children) as Block<Record<string, unknown>>[]).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
            stub?.replaceWith(child.getContent() || '');
        });

        if (this._element) {
            this._element.replaceWith(newElement || '');
        }

        this._element = newElement;

        this._addEventListeners();
    }

    public render(): string {
        return '';
    }

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    public getContent() {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }

        return this._element;
    }

    private isComponentList = <T extends CommonProps>(x: unknown): x is ComponentList<T> => {
        return (
            x !== null &&
            typeof x === 'object' &&
            'Component' in x &&
            typeof x.Component === 'function' &&
            'propList' in x &&
            Array.isArray(x.propList)
        );
    };

    private _getPropsChildren(propsAndChildren: Props) {
        let children: Record<string, Block<Record<string, unknown>>> = {};
        const listKeys: Record<string, string[]> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            }
            if (this.isComponentList(value)) {
                const { Component, propList } = value;
                const componentDict = propList.reduce<Record<string, ChildrenBlock>>(
                    (acc, data) => {
                        const component = new Component(data);
                        acc[component.id] = component;
                        return acc;
                    },
                    {}
                );
                children = { ...children, ...componentDict };
                const listKey = `${key}Keys`;
                listKeys[listKey] = Object.keys(componentDict);
            }
        });

        return { children, listKeys };
    }

    private _makePropsProxy(props: Props) {
        const eventBus = this.eventBus();

        return new Proxy(props, {
            get(proxyTarget: Props, prop) {
                const value = proxyTarget[prop as keyof Props];
                return typeof value === 'function' ? value.bind(proxyTarget) : value;
            },
            set(proxyTarget: Props, prop, value) {
                const oldTarget = { ...proxyTarget };
                (proxyTarget as Record<keyof Props, unknown>)[prop as keyof Props] = value;
                eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, proxyTarget);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    public show() {
        this.getContent()!.style.display = 'block';
    }

    public hide() {
        this.getContent()!.style.display = 'none';
    }
}

export default Block;
