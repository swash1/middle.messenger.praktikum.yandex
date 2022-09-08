import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';

import { EventBus } from './eventBus';

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
    _rootElement: HTMLElement;
    _meta: Meta;
    eventBus: EventBus;
    props: Record<string, any>;
    _id: string;
    children: Record<string, Block>;

    constructor({ tagName = 'div', attributes, events = [], propsAndChildren = {}, contentTemplate = '' }: BlockProps) {
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

    _separatePropsAndChildren(propsAndChildren: Record<string, any>) {
        const children: Record<string, Block> = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(EVENTS.INIT, this.init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._createRootElement();

        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    _createRootElement() {
        const { tagName, attributes } = this._meta;
        this._rootElement = this._createDocumentElement(tagName, attributes);
    }

    _createDocumentElement(tagName: string, attributes?: Record<string, string | undefined>) {
        const element = document.createElement(tagName);

        if (attributes) {
            this._setAttributes(element, attributes);
        }

        return element;
    }

    _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus.emit(EVENTS.FLOW_CDM);
    }

    _componentDidUpdate({ oldProps, newProps }: { oldProps: Record<string, any>; newProps: Record<string, any> }) {
        this.componentDidUpdate({ oldProps, newProps });

        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    //  можно переопределить, если хотим что-то делать на обновление
    componentDidUpdate(props: { oldProps: Record<string, any>; newProps: Record<string, any> }) {
        return true;
    }

    setProps = (propsToSet: Record<string, any>) => {
        if (!propsToSet) {
            return;
        }

        const newProps = Object.assign({}, this.props, propsToSet);

        // TODO - написать функцию сравнения объектов
        if (JSON.stringify(this.props) !== JSON.stringify(newProps)) {
            Object.assign(this.props, propsToSet);
        }
    };

    _setAttributes = (element: HTMLElement, attributes: Record<string, string | undefined>) => {
        Object.entries(attributes).forEach(([attribute, attributeValue]) => {
            if (attributeValue) {
                element.setAttribute(attribute, attributeValue);
            }
        });
    };

    getAttribute = (attributeName: string) => {
        return this.getContent().getAttribute(attributeName);
    };

    getEvents(): [string, (event: Event) => void][] {
        return this._meta.events || [];
    }

    setEvents(events: [string, (event: Event) => void][]) {
        this._removeEvents();
        this._meta.events = events;
        this._addEvents();
    }

    addEvents(events: [string, (event: Event) => void][]) {
        this.setEvents([...this._meta.events, ...events]);
    }

    _addEvents() {
        if (this._meta.events) {
            for (const [eventName, handler] of this._meta.events) {
                this._rootElement.addEventListener(eventName, handler);
            }
        }
    }

    _removeEvents() {
        if (this._meta.events) {
            for (const [eventName, handler] of this._meta.events) {
                this._rootElement.removeEventListener(eventName, handler);
            }
        }
    }

    compile(contentTemplate: string, props: Record<string, any>) {
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

    _render() {
        const compiledContentTemplate = this.render();

        this._removeEvents();

        this._rootElement.innerHTML = '';

        this._rootElement.appendChild(compiledContentTemplate);

        this._addEvents();
    }

    render() {
        return this.compile(this._meta.contentTemplate, this.props);
    }

    _makePropsProxy(props: Record<string, any>) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldProps = JSON.parse(JSON.stringify(target));

                target[prop] = value;

                self.eventBus.emit(EVENTS.FLOW_CDU, { oldProps, newProps: target });

                return true;
            },
            deleteProperty() {
                throw new Error('Отказано в доступе');
            },
        });
    }

    getContent() {
        return this._rootElement;
    }
}
