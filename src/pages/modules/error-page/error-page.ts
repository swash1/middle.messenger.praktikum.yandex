import { Block, Link } from '../../../common-components';
import { APP_ROUTES } from '../../../common-components/constants';

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
    public constructor(props: Props) {
        const link = new Link({ text: 'Назад к чатам', url: APP_ROUTES.chats, isRouter: true });

        super({
            tagName: 'div',
            attributes: { class: 'error-page' },
            propsAndChildren: { ...props, link },
            contentTemplate,
        });
    }
}
