import { ChatItemParams, User } from '../typings';

interface StoreData {
    userInfo: User;
    activeChatInfo: ChatItemParams;
}

export class Store {
    private static __instance: Store | null;
    private __store: StoreData;

    public constructor() {
        if (Store.__instance) {
            return Store.__instance;
        }

        this.__store = {} as StoreData;

        Store.__instance = this;
    }

    public set = (key: keyof StoreData, value: any) => {
        this.__store[key] = value;
        return this;
    };

    public get = (key: keyof StoreData) => {
        return this.__store[key];
    };
}
