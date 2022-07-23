import Handlebars from 'handlebars';
import template from './input.hbs';
import './input.scss';

Handlebars.registerPartial('input', template);

export default input = ({ placeholder, descr, type = 'text', mix, name, view = 'default', disabled = false } = {}) => {
	return template({ placeholder, descr, type, mix, name, view, disabled });
}
