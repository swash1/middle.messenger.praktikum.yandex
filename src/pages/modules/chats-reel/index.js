import Handlebars from 'handlebars';

import template from './chats-reel.hbs';

import './chats-reel.scss';

// eslint-disable-next-line no-unused-vars
import { divider, chatItem } from '../../../common-components';

Handlebars.registerPartial('chatsReel', template);

export const chatsReel = (chatItems) => template({ chats: chatItems });
