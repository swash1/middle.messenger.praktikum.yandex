import Handlebars from 'handlebars';
import template from './link.hbs';
import './link.scss';

Handlebars.registerPartial('link', template);

export default link = ({ url, target = '_self', text, mix } = {}) => {
	return template({ url, target, text, mix });
}
