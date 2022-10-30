import { Block } from './Block';
import { renderDOM } from './renderDOM';

interface Props {
    rootNode: string;
}

export class Route {
    private _pathname: string;
    private _blockConstructor: new () => Block;
    private _props: Props;
    private _blockInstance?: Block;

    constructor(pathname: string, view: new () => Block, props: Props) {
        this._pathname = pathname;
        this._blockConstructor = view;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._blockInstance) {
            this._blockInstance.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    async render() {
        this._blockInstance = new this._blockConstructor();
        renderDOM(this._props.rootNode, this._blockInstance);
    }
}
