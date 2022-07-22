import Handlebars from 'handlebars';

import { choose, isYouSender, arrayIsNotEmpty } from './utils';

Handlebars.registerHelper('isYouSender', isYouSender);
Handlebars.registerHelper('arrayIsNotEmpty', arrayIsNotEmpty);

export {default as button} from './components/button';
export {default as link} from './components/link';
export {default as input} from './components/input';
export {default as chatItem} from './components/chat-item';
export {default as divider} from './components/divider';
