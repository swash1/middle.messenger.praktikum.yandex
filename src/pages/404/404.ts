import { ErrorPage } from '../modules/error-page/error-page';

class NotFound extends ErrorPage {
    static __instance: NotFound;

    public constructor() {
        if (NotFound.__instance) {
            return NotFound.__instance;
        }

        super({ title: '404', descr: 'Не туда попали' });

        NotFound.__instance = this;
    }
}

export default NotFound;
