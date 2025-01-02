-- 创建用户表 users
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL DEFAULT '',
    cellphone TEXT DEFAULT NULL UNIQUE,
    email TEXT DEFAULT NULL UNIQUE,
    email_verified_at DATETIME DEFAULT NULL,
    state TEXT NOT NULL DEFAULT 'enabled',
    nickname TEXT NOT NULL DEFAULT '',
    gender TEXT NOT NULL DEFAULT 'unknown',
    avatar TEXT NOT NULL DEFAULT '',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 插入用户，密码均为 123456
INSERT INTO users (username, password, created_at, updated_at) VALUES
('fake_user1', '$2b$12$qn3Hjh8zCfYsSnbqHBq63eXjaTwWs4r/SH3yLycDAOTFUi80em6Ju', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('fake_user2', '$2b$12$qn3Hjh8zCfYsSnbqHBq63eXjaTwWs4r/SH3yLycDAOTFUi80em6Ju', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);