import { apiUrls } from './apiUrls';
import { User } from '../../typings';
import { HTTPTransport } from '../HTTPTransport';

export class UsersApi {
    static async updateUser(requestData: string): Promise<User> {
        const response = await HTTPTransport.put<string>({
            url: apiUrls.putUserProfile,
            options: {
                data: requestData,
            },
        });

        return JSON.parse(response);
    }

    static async changePassword(requestData: string): Promise<unknown> {
        return await HTTPTransport.put<string>({
            url: apiUrls.putUserPassword,
            options: {
                data: requestData,
            },
        });
    }

    static async updateAvatar(requestData: FormData): Promise<User> {
        const response = await HTTPTransport.put<string>({
            url: apiUrls.putUserAvatar,
            options: {
                data: requestData,
                headers: {},
            },
        });

        return JSON.parse(response);
    }
}
