-- SQL script to create user_accounts and user_account_details tables
CREATE TABLE IF NOT EXISTS user_accounts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_account_details (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES user_accounts(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    email VARCHAR(255),
    address TEXT,
    phone VARCHAR(50),
    UNIQUE(user_id)
);