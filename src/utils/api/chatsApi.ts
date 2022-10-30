import { apiUrls } from './apiUrls';
import { ChatItemParams, User } from '../../typings';
import { HTTPTransport } from '../HTTPTransport';

export class ChatsApi {
    static async getChats(): Promise<ChatItemParams[]> {
        const response = await HTTPTransport.get<string>({
            url: apiUrls.getChats,
        });

        return JSON.parse(response);
    }

    static async createChat(requestData: string): Promise<void> {
        await HTTPTransport.post<string>({
            url: apiUrls.postChats,
            options: {
                data: requestData,
            },
        });
    }

    static async getChatToken(chatId: number): Promise<{ token: string }> {
        const response = await HTTPTransport.post<string>({
            url: `${apiUrls.postGetToken}/${chatId}`,
        });

        return JSON.parse(response);
    }

    static async searchUsersByLogin(login: string): Promise<User[]> {
        const response = await HTTPTransport.post<string>({
            url: apiUrls.postUserSearch,
            options: {
                data: JSON.stringify({
                    login,
                }),
            },
        });

        return JSON.parse(response);
    }

    static async addUserToChat(login: string, chatId: number): Promise<void> {
        const users = await this.searchUsersByLogin(login);
        const userId = users[0].id;

        await HTTPTransport.put({
            url: apiUrls.putChatUsers,
            options: {
                data: JSON.stringify({
                    users: [userId],
                    chatId,
                }),
            },
        });
    }

    static async removeUserFromChat(login: string, chatId: number): Promise<void> {
        const users = await this.searchUsersByLogin(login);
        const userId = users[0].id;

        await HTTPTransport.put({
            url: apiUrls.deleteChatUser,
            options: {
                data: JSON.stringify({
                    users: [userId],
                    chatId,
                }),
            },
        });
    }
}
