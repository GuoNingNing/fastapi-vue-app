-- 创建用户表 users
CREATE TABLE users
(
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    username          TEXT     NOT NULL UNIQUE,
    password          TEXT     NOT NULL DEFAULT '',
    cellphone         TEXT              DEFAULT NULL UNIQUE,
    email             TEXT              DEFAULT NULL UNIQUE,
    email_verified_at DATETIME          DEFAULT NULL,
    state             TEXT     NOT NULL DEFAULT 'enabled',
    nickname          TEXT     NOT NULL DEFAULT '',
    gender            TEXT     NOT NULL DEFAULT 'unknown',
    avatar            TEXT     NOT NULL DEFAULT '',
    created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 插入用户，密码均为 123456
INSERT INTO users (username, password, created_at, updated_at)
VALUES ('tamer', '$2b$12$6JaM5cYFoPdgdW0nrkRAuOz6teVS6JPRYSM1nnyZP0z/ej2tJeh4G', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 创建chats表 chats
CREATE TABLE chats
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT     NOT NULL,
    user_id    TEXT     NOT NULL,
    session_id TEXT     NOT NULL,
    message    TEXT     NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);