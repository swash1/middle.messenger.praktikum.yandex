import tpl from './error-page.hbs';

// eslint-disable-next-line no-unused-vars
import { link } from '../../../common-components';

import './error-page.scss';

export const errorPage = ({ title, descr } = {}) => tpl({ title, descr });
