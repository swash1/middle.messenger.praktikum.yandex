import Handlebars from 'handlebars';
import template from './chats-reel.hbs';
import './chats-reel.scss';

import { divider, chatItem } from '../../../common-components';

Handlebars.registerPartial('chatsReel', template);

export const chatsReel = (chatItems) => {
	return template({chats: chatItems});
}
