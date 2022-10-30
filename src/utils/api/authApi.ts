import { apiUrls } from './apiUrls';
import { User } from '../../typings';
import { HTTPTransport } from '../HTTPTransport';

export class AuthApi {
    static async signin(requestData: string): Promise<unknown> {
        return await HTTPTransport.post({
            url: apiUrls.postSignUp,
            options: {
                data: requestData,
            },
        });
    }

    static async login(requestData: string): Promise<unknown> {
        return await HTTPTransport.post({
            url: apiUrls.postSignIn,
            options: {
                data: requestData,
            },
        });
    }

    static async logOut(): Promise<unknown> {
        return await HTTPTransport.post({
            url: apiUrls.postLogOut,
        });
    }

    static async getUser(): Promise<User> {
        const response = await HTTPTransport.get<string>({
            url: apiUrls.getUser,
        });

        return JSON.parse(response);
    }
}
