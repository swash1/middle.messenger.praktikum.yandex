import Handlebars from 'handlebars';

import template from './chat-item.hbs';

import './chat-item.scss';

Handlebars.registerPartial('chatItem', template);

export default ({ avatar, name, sender, latestMessage, timestamp, unreadMessagesCount } = {}) =>
    template({ avatar, name, sender, latestMessage, timestamp, unreadMessagesCount });
