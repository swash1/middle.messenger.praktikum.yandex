import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';

import { EventBus } from './EventBus';

interface Meta {
    tagName: string;
    attributes?: Record<string, string | undefined>;
    events: [string, (event: Event) => void][];
    contentTemplate: string;
}

interface BlockProps {
    tagName?: string;
    attributes?: Record<string, string | undefined>;
    propsAndChildren?: Record<string, any>;
    events?: [string, (event: Event) => void][];
    contentTemplate?: string;
}

enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render',
}

export class Block {
    protected _rootElement: HTMLElement;
    private _meta: Meta;
    public eventBus: EventBus;
    public props: Record<string, any>;
    private _id: string;
    public children: Record<string, Block>;
    static fetchData?: () => any;

    public constructor({ tagName = 'div', attributes, events = [], propsAndChildren = {}, contentTemplate = '' }: BlockProps) {
        this._id = makeUUID();

        const { children, props } = this._separatePropsAndChildren(propsAndChildren);

        if (attributes) {
            props._attributes = attributes;
        }

        this.children = children;
        this.props = this._makePropsProxy({ ...props, _id: this._id });

        this._meta = {
            tagName,
            attributes,
            events,
            contentTemplate,
        };

        const eventBus = new EventBus();
        this.eventBus = eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(EVENTS.INIT);
    }

    private _separatePropsAndChildren(propsAndChildren: Record<string, any>) {
        const children: typeof this.children = {};
        const props: typeof this.props = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(EVENTS.INIT, this._init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this._createRootElement();

        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    private _createRootElement() {
        const { tagName, attributes } = this._meta;
        this._rootElement = this._createDocumentElement(tagName, attributes);
    }

    private _createDocumentElement(tagName: string, attributes?: Record<string, string | undefined>) {
        const element = document.createElement(tagName);

        if (attributes) {
            this._setAttributes(element, attributes);
        }

        return element;
    }

    private _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    public componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus.emit(EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate({
        oldProps,
        newProps,
    }: {
        oldProps: Record<string, any>;
        newProps: Record<string, any>;
    }) {
        this.componentDidUpdate({ oldProps, newProps });

        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    public componentDidUpdate(props: { oldProps: Record<string, any>; newProps: Record<string, any> }) {
        return true;
    }

    public setProps = (propsToSet: Record<string, any>) => {
        if (!propsToSet) {
            return;
        }

        const newProps = Object.assign({}, this.props, propsToSet);

        // TODO - написать функцию сравнения объектов
        if (JSON.stringify(this.props) !== JSON.stringify(newProps)) {
            Object.assign(this.props, propsToSet);
        }
    };

    private _setAttributes = (element: HTMLElement, attributes: Record<string, string | undefined>) => {
        Object.entries(attributes).forEach(([attribute, attributeValue]) => {
            if (attributeValue) {
                element.setAttribute(attribute, attributeValue);
            }
        });
    };

    public getAttribute = (attributeName: string) => {
        return this.getContent().getAttribute(attributeName);
    };

    public getEvents(): [string, (event: Event) => void][] {
        return this._meta.events || [];
    }

    public setEvents(events: [string, (event: Event) => void][]) {
        this._removeEvents();
        this._meta.events = events;
        this._addEvents();
    }

    public addEvents(events: [string, (event: Event) => void][]) {
        this.setEvents([...this._meta.events, ...events]);
    }

    private _addEvents() {
        if (this._meta.events) {
            for (const [eventName, handler] of this._meta.events) {
                this._rootElement.addEventListener(eventName, handler);
            }
        }
    }

    private _removeEvents() {
        if (this._meta.events) {
            for (const [eventName, handler] of this._meta.events) {
                this._rootElement.removeEventListener(eventName, handler);
            }
        }
    }

    private _compile(contentTemplate: string, props: Record<string, any>) {
        const propsAndStubs = { ...props };

        const childrenDictionary: Record<string, Element[]> = {};

        // Если передается массив child-ов
        for (const [propName, children] of Object.entries(propsAndStubs)) {
            if (Array.isArray(children)) {
                propsAndStubs[propName] = `<div data-id="${propName}"></div>`;

                childrenDictionary[propName] = [];

                for (const child of children) {
                    if (child instanceof Block) {
                        childrenDictionary[propName].push(child.getContent());
                    }
                }
            }
        }

        Object.entries(this.children).forEach(([childName, childComponent]) => {
            propsAndStubs[childName] = `<div data-id="${childComponent._id}"></div>`;
        });

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

        fragment.innerHTML = Handlebars.compile(contentTemplate)(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        for (const key in childrenDictionary) {
            const stub = fragment.content.querySelector(`[data-id="${key}"]`);

            if (stub) {
                for (const child of childrenDictionary[key]) {
                    stub.appendChild(child);
                }
                stub.replaceWith(...Array.from(stub.childNodes));
            }
        }

        return fragment.content;
    }

    private async _render() {
        const compiledContentTemplate = this._compile(this._meta.contentTemplate, this.props);

        await this.render();

        this._removeEvents();

        this._rootElement.innerHTML = '';

        this._rootElement.appendChild(compiledContentTemplate);

        this._addEvents();
    }

    public async render() {}

    private _makePropsProxy(props: Record<string, any>) {
        return new Proxy(props, {
            get: (target, prop: string) => {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target, prop: string, value) => {
                let oldProps;
                try {
                    oldProps = JSON.parse(JSON.stringify(target));
                } catch (error) {
                    throw error;
                }

                target[prop] = value;

                this.eventBus.emit(EVENTS.FLOW_CDU, { oldProps, newProps: target });

                return true;
            },
            deleteProperty: () => {
                throw new Error('Отказано в доступе');
            },
        });
    }

    public getContent() {
        return this._rootElement;
    }

    public hide() {
        this._rootElement.remove();
    }
}
