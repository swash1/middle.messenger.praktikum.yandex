import { Block, Link } from '../../../common-components';

import './error-page.scss';

interface Props {
    title: string;
    descr: string;
}

const contentTemplate = `
    <h1 class="error-page__title">{{title}}</h1>
    <span class="error-page__descr">{{descr}}</span>
    {{{link}}}
`;

export class ErrorPage extends Block {
    constructor(props: Props) {
        const link = new Link({ text: 'Назад к чатам', url: '/chats' });

        super({
            tagName: 'div',
            attributes: { class: 'error-page' },
            propsAndChildren: { ...props, link },
            contentTemplate,
        });
    }
}
