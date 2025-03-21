/// <reference lib="deno.ns" />

/**
 * @author Esad Mustafoski
 * @description This file is responsible for creating the database and the tables
 */

// +++ IMPORTS ------------------------------------------------------ //
import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.224.0/path/mod.ts";

// +++ VARIABLES ---------------------------------------------------- //
const _dirname: string = dirname(fromFileUrl(import.meta.url));
const dbPath: string = join(_dirname, "../database/esp-projekt.sqlite");
const db = new DB(dbPath);

export function createDatabase(): void {
  db.execute(`
        CREATE TABLE IF NOT EXISTS accounts (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_group TEXT,
            bio TEXT,
            displayname TEXT,
            username TEXT,
            user_email TEXT,
            password TEXT,
            password_salt TEXT,
            firstname TEXT,
            surname TEXT,
            account_created TEXT,
            blocked_users TEXT,
            followers TEXT,
            following TEXT,
            contacts TEXT
        );

        CREATE TABLE IF NOT EXISTS posts (
            posts_uuid INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            created_at TEXT,
            post_text TEXT,
            post_type TEXT,
            likes INTEGER,
            comments INTEGER
        );

        CREATE TABLE IF NOT EXISTS comments (
            comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id INTEGER,
            author_user_id INTEGER,
            date_created_at TEXT,
            text TEXT,
            likes INTEGER
        ); -- Added semicolon here

        CREATE TABLE IF NOT EXISTS messages (
            message_id INTEGER PRIMARY KEY AUTOINCREMENT,
            chat_id INTEGER,
            sender_id INTEGER,
            content TEXT,
            timestamp TEXT,
            FOREIGN KEY (chat_id) REFERENCES chats (chat_id),
            FOREIGN KEY (sender_id) REFERENCES accounts (user_id)
        );

    CREATE TABLE IF NOT EXISTS chats (
    chat_id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_name TEXT,
    participants TEXT,
    created_at TEXT
  )
    `);
}

// Sample data generated using AI, does not work yet and will be adjusted
export function insertSampleData(): void {
  db.query(
    `INSERT INTO accounts (user_group, bio, displayname, username, user_email, password, password_salt, firstname, surname, account_created, blocked_users, followers, following, contacts) VALUES
        ('admin', 'Admin bio', 'Admin User', 'admin', 'admin@example.com', 'pw1', 'salt1', 'Admin', 'User', '2024-01-01', '[]', '[]', '[]', '[]'),
        ('user', 'I love coding!', 'John Dev', 'johndev', 'john@example.com', 'pw2', 'salt2', 'John', 'Smith', '2024-01-02', '[]', '[]', '[3,4]', '[1,2]'),
        ('user', 'Photography enthusiast', 'Alice', 'alice_photo', 'alice@example.com', 'pw3', 'salt3', 'Alice', 'Johnson', '2024-01-03', '[]', '[5]', '[1]', '[2]')
    `,
  );

  db.query(
    `INSERT INTO posts (user_id, created_at, post_text, post_type, likes, comments) VALUES
        (1, '2024-01-15 10:00:00', 'First post about programming!', 'text', 5, 2),
        (1, '2024-01-15 11:30:00', 'Check out this new feature', 'text', 10, 3),
        (2, '2024-01-16 09:15:00', 'Just learned about TypeScript', 'text', 8, 1),
        (3, '2024-01-16 14:20:00', 'Posted my new photo collection', 'image', 15, 4)
    `,
  );

  db.query(
    `INSERT INTO comments (post_id, author_user_id, date_created_at, text, likes) VALUES
        (1, 2, '2024-01-15 10:05:00', 'Great post!', 3),
        (1, 3, '2024-01-15 10:10:00', 'Very informative', 2),
        (2, 3, '2024-01-15 11:35:00', 'Nice feature', 4),
        (3, 1, '2024-01-16 09:20:00', 'TypeScript is awesome', 5),
        (4, 2, '2024-01-16 14:25:00', 'Beautiful photos!', 6)
    `,
  );
}

createDatabase();
insertSampleData();
