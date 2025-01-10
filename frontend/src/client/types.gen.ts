// This file is auto-generated by @hey-api/openapi-ts

export type BodyAuthSendVerificationCode = {
    cellphone: string;
};

export type BodyChatsSetCookies = {
    cookies: string;
};

export type BodyChatsSetSysPrompt = {
    name: string;
    content: string;
};

export type BodyUsersAddUser = {
    username: string;
    password: string;
};

export type ChatBase = {
    id: number;
    title: string;
    user_id: string;
    session_id: string;
    message?: string;
};

export type ChatRequest = {
    content: string;
    session_id?: string;
    stream?: boolean;
};

export type HttpValidationError = {
    detail?: Array<ValidationError>;
};

export type Item = {
    name: string;
    price: number;
};

export type OAuth2CellphoneRequest = {
    grant_type?: string;
    cellphone: string;
    verification_code: string;
    scope?: string;
    client_id?: string;
    client_secret?: string;
};

/**
 * 参照 fastapi.security.OAuth2PasswordRequestForm，把请求体从form改为json格式
 */
export type OAuth2PasswordRequest = {
    grant_type?: string;
    username: string;
    password: string;
    scope?: string;
    client_id?: string;
    client_secret?: string;
};

export type ResponseMessage = {
    message: string;
};

export type Token = {
    token_type: string;
    expires_in: number;
    access_token: string;
};

export type User = {
    username: string;
    email: string;
};

export type UserDetail = {
    id: number;
    username: string;
    nickname: string;
    gender: string;
    avatar: string;
    cellphone?: string;
    email?: string;
    email_verified_at?: string;
    state: string;
    created_at: string;
};

export type ValidationError = {
    loc: Array<string | number>;
    msg: string;
    type: string;
};

export type IndexData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/demo/';
};

export type IndexResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type DbTestData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/demo/db_test';
};

export type DbTestResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type RedisTestData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/demo/redis_test';
};

export type RedisTestResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type ShowData = {
    body?: never;
    path: {
        demo_id: string;
    };
    query?: never;
    url: '/api/demo/{demo_id}';
};

export type ShowErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type ShowError = ShowErrors[keyof ShowErrors];

export type ShowResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type TokenData = {
    body: OAuth2PasswordRequest;
    path?: never;
    query?: never;
    url: '/api/auth/token';
};

export type TokenErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type TokenError = TokenErrors[keyof TokenErrors];

export type TokenResponses = {
    /**
     * Successful Response
     */
    200: Token;
};

export type TokenResponse = TokenResponses[keyof TokenResponses];

export type CellphoneTokenData = {
    body: OAuth2CellphoneRequest;
    path?: never;
    query?: never;
    url: '/api/auth/cellphone/token';
};

export type CellphoneTokenErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CellphoneTokenError = CellphoneTokenErrors[keyof CellphoneTokenErrors];

export type CellphoneTokenResponses = {
    /**
     * Successful Response
     */
    200: Token;
};

export type CellphoneTokenResponse = CellphoneTokenResponses[keyof CellphoneTokenResponses];

export type SendVerificationCodeData = {
    body: BodyAuthSendVerificationCode;
    path?: never;
    query?: never;
    url: '/api/auth/cellphone/verification_code';
};

export type SendVerificationCodeErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type SendVerificationCodeError = SendVerificationCodeErrors[keyof SendVerificationCodeErrors];

export type SendVerificationCodeResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type MeData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/users/me';
};

export type MeResponses = {
    /**
     * Successful Response
     */
    200: UserDetail;
};

export type MeResponse = MeResponses[keyof MeResponses];

export type AddUserData = {
    body: BodyUsersAddUser;
    path?: never;
    query?: never;
    url: '/api/users/add_user';
};

export type AddUserErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type AddUserError = AddUserErrors[keyof AddUserErrors];

export type AddUserResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type NewSessionData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/chats/new';
};

export type NewSessionResponses = {
    /**
     * Successful Response
     */
    200: ChatBase;
};

export type NewSessionResponse = NewSessionResponses[keyof NewSessionResponses];

export type DelSessionData = {
    body?: never;
    path?: never;
    query: {
        session_id: string;
    };
    url: '/api/chats/del';
};

export type DelSessionErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type DelSessionError = DelSessionErrors[keyof DelSessionErrors];

export type DelSessionResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type GetSessionData = {
    body?: never;
    path?: never;
    query: {
        session_id: string;
    };
    url: '/api/chats/get';
};

export type GetSessionErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetSessionError = GetSessionErrors[keyof GetSessionErrors];

export type GetSessionResponses = {
    /**
     * Successful Response
     */
    200: ChatBase;
};

export type GetSessionResponse = GetSessionResponses[keyof GetSessionResponses];

export type ListSessionData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/chats/list';
};

export type ListSessionResponses = {
    /**
     * Successful Response
     */
    200: Array<ChatBase>;
};

export type ListSessionResponse = ListSessionResponses[keyof ListSessionResponses];

export type AskData = {
    body: ChatRequest;
    path?: never;
    query?: never;
    url: '/api/chats/ask';
};

export type AskErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type AskError = AskErrors[keyof AskErrors];

export type AskResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type SetSysPromptData = {
    body: BodyChatsSetSysPrompt;
    path?: never;
    query?: never;
    url: '/api/chats/set_sys_prompt';
};

export type SetSysPromptErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type SetSysPromptError = SetSysPromptErrors[keyof SetSysPromptErrors];

export type SetSysPromptResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type GetSysPromptData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/chats/get_sys_prompt';
};

export type GetSysPromptResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type SetCookiesData = {
    body: BodyChatsSetCookies;
    path?: never;
    query?: never;
    url: '/api/chats/set_cookies';
};

export type SetCookiesErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type SetCookiesError = SetCookiesErrors[keyof SetCookiesErrors];

export type SetCookiesResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type GetEventsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/chats/events';
};

export type GetEventsResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type CreateItemData = {
    body: Item;
    path?: never;
    query?: never;
    url: '/items/';
};

export type CreateItemErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateItemError = CreateItemErrors[keyof CreateItemErrors];

export type CreateItemResponses = {
    /**
     * Successful Response
     */
    200: ResponseMessage;
};

export type CreateItemResponse = CreateItemResponses[keyof CreateItemResponses];

export type GetItemsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/items/';
};

export type GetItemsResponses = {
    /**
     * Successful Response
     */
    200: Array<Item>;
};

export type GetItemsResponse = GetItemsResponses[keyof GetItemsResponses];

export type CreateUserData = {
    body: User;
    path?: never;
    query?: never;
    url: '/users/';
};

export type CreateUserErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateUserError = CreateUserErrors[keyof CreateUserErrors];

export type CreateUserResponses = {
    /**
     * Successful Response
     */
    200: ResponseMessage;
};

export type CreateUserResponse = CreateUserResponses[keyof CreateUserResponses];