const host = 'https://ya-praktikum.tech';

const path = '/api/v2';

const base = `${host}${path}`;

const apiPaths = {
    postSignUp: '/auth/signup',
    postSignIn: '/auth/signin',
    getUser: '/auth/user',
    postLogOut: '/auth/logout',
    putUserProfile: '/user/profile',
    putUserPassword: '/user/password',
    putUserAvatar: '/user/profile/avatar',
    getChats: '/chats',
    postChats: '/chats',
    postGetToken: '/chats/token', //+id
    postUserSearch: '/user/search',
    putChatUsers: '/chats/users',
    deleteChatUser: '/chats/users',
};

export const apiUrls: Record<keyof typeof apiPaths, string> = Object.fromEntries(
    Object.entries(apiPaths).map(([key, url]) => [key, `${base}${url}`] as [keyof typeof apiPaths, string])
) as Record<keyof typeof apiPaths, string>;
