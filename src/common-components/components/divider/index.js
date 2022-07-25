import Handlebars from 'handlebars';

import template from './divider.hbs';

import './divider.scss';

Handlebars.registerPartial('divider', template);

export default ({ mix } = {}) => template({ mix });
