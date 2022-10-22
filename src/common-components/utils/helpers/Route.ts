import { Block } from './Block';
import { renderDOM } from './renderDOM';

interface Props {
    rootNode: string;
}

export class Route {
    private _pathname: string;
    private _block: Block;
    private _props: Props;

    constructor(pathname: string, view: Block, props: Props) {
        this._pathname = pathname;
        this._block = view;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        this._block.hide();
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        renderDOM(this._props.rootNode, this._block);
        return;
    }
}
