interface _accessToken {
    access_token: string;
    token_type?: string;
    expires_in?: number;
    refresh_token?: string;
    scope?: string;
}

export enum UserRoles {
    ADMIN,
    DEFAULT
}

interface _user {
    id: string;
    username: string;
    avatarUrl: string;
    role: UserRoles
}

export declare namespace Auth {
    export interface AccessToken extends _accessToken {}
    export interface User extends _user {}
}
