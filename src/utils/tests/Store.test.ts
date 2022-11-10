import { expect } from 'chai';

import { User } from '../../typings';

import { Store } from '../Store';

const store = new Store();

const userInfo: User = {
    id: 1,
    first_name: 'a',
    second_name: 'b',
    display_name: 'c',
    avatar: 'd',
    login: 'e',
    email: 'f',
    phone: 'g',
};

describe('Стор', () => {
    it('Сохраняет значение', () => {
        store.set('userInfo', userInfo);

        expect(store.get('userInfo')).to.eq(userInfo);
    });

    it('Не создается новый экземпляр', () => {
        const newStore = new Store();

        expect(newStore).to.eq(store);
    });
});
