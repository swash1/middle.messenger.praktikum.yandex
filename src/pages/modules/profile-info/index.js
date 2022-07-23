import tpl from './profile-info.hbs';

import { input, link, button } from '../../../common-components';

import './profile-info.scss';

export const profileInfo = ({ avatarImgSrc = 'https://via.placeholder.com/130x130', name, inputs = [], isEditable } = {}) => {
	return tpl({ avatarImgSrc, name, inputs, isEditable });
}
