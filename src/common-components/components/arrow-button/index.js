import Handlebars from 'handlebars';

import template from './arrow-button.hbs';

import './arrow-button.scss';

Handlebars.registerPartial('arrowButton', template);

export default ({ direction = 'right' } = {}) => template({ direction });
