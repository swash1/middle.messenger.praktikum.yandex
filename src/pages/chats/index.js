import tpl from './chats.hbs';

// eslint-disable-next-line no-unused-vars
import { chatsReel } from '../modules/chats-reel';

import './chats.scss';

import { chats } from '../../common-components/components/mocks/chats-list';

export default tpl({chats});
