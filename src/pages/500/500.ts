import { ErrorPage } from '../modules/error-page/error-page';

class ServerError extends ErrorPage {
    static __instance: ServerError;

    public constructor() {
        if (ServerError.__instance) {
            return ServerError.__instance;
        }

        super({ title: '500', descr: 'Кажется, что-то поломалось, уже чиним!' });

        ServerError.__instance = this;
    }
}

export default ServerError;
