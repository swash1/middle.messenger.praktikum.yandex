import Handlebars from 'handlebars';

import template from './link.hbs';

import './link.scss';

Handlebars.registerPartial('link', template);

export default ({ url, target = '_self', text, mix } = {}) => template({ url, target, text, mix });
