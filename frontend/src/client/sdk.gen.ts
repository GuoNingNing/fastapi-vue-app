// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-axios';
import type { GetData, TokenData, TokenError, TokenResponse, CellphoneTokenData, CellphoneTokenError, CellphoneTokenResponse, SendVerificationCodeData, SendVerificationCodeError, MeData, MeResponse, AddUserData, AddUserError, NewSessionData, NewSessionResponse, DelSessionData, DelSessionError, GetSessionData, GetSessionError, GetSessionResponse, ListSessionData, ListSessionResponse, TitleData, TitleError, TitleResponse, AskData, AskError, SetSysPromptData, SetSysPromptError, GetSysPromptData, SetCookiesData, SetCookiesError, GetEventsData } from './types.gen';

export const client = createClient(createConfig());

export class DemoService {
    /**
     * Get
     */
    public static get<ThrowOnError extends boolean = false>(options?: Options<GetData, ThrowOnError>) {
        return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
            ...options,
            url: '/api/demo/'
        });
    }
    
}

export class AuthService {
    /**
     * Token
     * 用户名+密码登录
     */
    public static token<ThrowOnError extends boolean = false>(options: Options<TokenData, ThrowOnError>) {
        return (options?.client ?? client).post<TokenResponse, TokenError, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            url: '/api/auth/token'
        });
    }
    
    /**
     * Cellphone Token
     * 手机号+验证码登录
     */
    public static cellphoneToken<ThrowOnError extends boolean = false>(options: Options<CellphoneTokenData, ThrowOnError>) {
        return (options?.client ?? client).post<CellphoneTokenResponse, CellphoneTokenError, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            url: '/api/auth/cellphone/token'
        });
    }
    
    /**
     * Send Verification Code
     * 发送验证码
     */
    public static sendVerificationCode<ThrowOnError extends boolean = false>(options: Options<SendVerificationCodeData, ThrowOnError>) {
        return (options?.client ?? client).post<unknown, SendVerificationCodeError, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            url: '/api/auth/cellphone/verification_code'
        });
    }
    
}

export class UsersService {
    /**
     * Me
     * 当前登录用户信息
     */
    public static me<ThrowOnError extends boolean = false>(options?: Options<MeData, ThrowOnError>) {
        return (options?.client ?? client).get<MeResponse, unknown, ThrowOnError>({
            ...options,
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/users/me'
        });
    }
    
    /**
     * Add User
     */
    public static addUser<ThrowOnError extends boolean = false>(options: Options<AddUserData, ThrowOnError>) {
        return (options?.client ?? client).post<unknown, AddUserError, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/users/add_user'
        });
    }
    
}

export class ChatsService {
    /**
     * New Session
     */
    public static newSession<ThrowOnError extends boolean = false>(options?: Options<NewSessionData, ThrowOnError>) {
        return (options?.client ?? client).get<NewSessionResponse, unknown, ThrowOnError>({
            ...options,
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/chats/new'
        });
    }
    
    /**
     * Del Session
     */
    public static delSession<ThrowOnError extends boolean = false>(options: Options<DelSessionData, ThrowOnError>) {
        return (options?.client ?? client).get<unknown, DelSessionError, ThrowOnError>({
            ...options,
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/chats/del'
        });
    }
    
    /**
     * Get Session
     */
    public static getSession<ThrowOnError extends boolean = false>(options: Options<GetSessionData, ThrowOnError>) {
        return (options?.client ?? client).get<GetSessionResponse, GetSessionError, ThrowOnError>({
            ...options,
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/chats/get'
        });
    }
    
    /**
     * List Session
     * 获取所有session
     * :param auth_user:
     * :return:
     */
    public static listSession<ThrowOnError extends boolean = false>(options?: Options<ListSessionData, ThrowOnError>) {
        return (options?.client ?? client).get<ListSessionResponse, unknown, ThrowOnError>({
            ...options,
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/chats/list'
        });
    }
    
    /**
     * Title
     * 生成标题
     * :param session_id:
     * :param auth_user:
     * :return:
     */
    public static title<ThrowOnError extends boolean = false>(options: Options<TitleData, ThrowOnError>) {
        return (options?.client ?? client).get<TitleResponse, TitleError, ThrowOnError>({
            ...options,
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/chats/title'
        });
    }
    
    /**
     * Ask
     */
    public static ask<ThrowOnError extends boolean = false>(options: Options<AskData, ThrowOnError>) {
        return (options?.client ?? client).post<unknown, AskError, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/chats/ask'
        });
    }
    
    /**
     * Set Sys Prompt
     */
    public static setSysPrompt<ThrowOnError extends boolean = false>(options: Options<SetSysPromptData, ThrowOnError>) {
        return (options?.client ?? client).post<unknown, SetSysPromptError, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/chats/set_sys_prompt'
        });
    }
    
    /**
     * Get Sys Prompt
     */
    public static getSysPrompt<ThrowOnError extends boolean = false>(options?: Options<GetSysPromptData, ThrowOnError>) {
        return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
            ...options,
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/chats/get_sys_prompt'
        });
    }
    
    /**
     * Set Cookies
     */
    public static setCookies<ThrowOnError extends boolean = false>(options: Options<SetCookiesData, ThrowOnError>) {
        return (options?.client ?? client).post<unknown, SetCookiesError, ThrowOnError>({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/api/chats/set_cookies'
        });
    }
    
    /**
     * Get Events
     */
    public static getEvents<ThrowOnError extends boolean = false>(options?: Options<GetEventsData, ThrowOnError>) {
        return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
            ...options,
            url: '/api/chats/events'
        });
    }
    
}