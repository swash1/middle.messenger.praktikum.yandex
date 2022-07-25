import tpl from './profile-info.hbs';

// eslint-disable-next-line no-unused-vars
import { input, link, button, arrowButton } from '../../../common-components';

import './profile-info.scss';

export const profileInfo = ({
    avatarImgSrc = 'https://via.placeholder.com/130x130',
    name,
    inputs = [],
    isEditable,
} = {}) => tpl({ avatarImgSrc, name, inputs, isEditable });
