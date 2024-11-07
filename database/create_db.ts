/**
 * @author Esad Mustafoski
 * @description This file is responsible for creating the database and the tables
 */

/// <reference lib="deno.ns" />

// +++ IMPORTS ------------------------------------------------------ //
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { dirname, fromFileUrl, join } from "https://deno.land/std/path/mod.ts";

// +++ VARIABLES ---------------------------------------------------- //
const _dirname: string = dirname(fromFileUrl(import.meta.url));
const dbPath: string = join(_dirname, "../database/esp-projekt.sqlite");
const db = new DB(dbPath);

export function createDatabase(): void {
    db.execute(`
        CREATE TABLE IF NOT EXISTS accounts (
            uuid INTEGER PRIMARY KEY AUTOINCREMENT,
            user_group TEXT,
            user_bio TEXT,
            user_displayname TEXT,
            user_username TEXT,
            user_e-mail TEXT,
            password TEXT,
            firstname TEXT,
            surname TEXT,
            account_created TEXT,
            followers ANY,
            following ANY,
            contacts ANY
        )
        
        CREATE TABLE IF NOT EXISTS posts (
            posts_uuid INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            created_at TEXT,
            post_text TEXT,
            likes INTEGER,
            comments INTEGER
        )
    
        CREATE TABLE IF NOT EXISTS comments (
            commentd_id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id INTEGER,
            author_user_id INTEGER,
            date_created_at TEXT,
            text TEXT,
            likes INTEGER
        )
    `);
}

// Sample data generated using online generators
export function insertSampleData(): void {
    db.query(`INSERT INTO accounts (user_group, user_bio, user_displayname, user_username, user_email, password, firstname, surname, account_created, followers, following, contacts) VALUES
        ('admin', 'Admin bio', 'Admin User', 'admin', 'admin@example.com', 'hashedpass1', 'Admin', 'User', '2024-01-01', '[]', '[]', '[]', '[]'),
        ('user', 'I love coding!', 'John Dev', 'johndev', 'john@example.com', 'hashedpass2', 'John', 'Smith', '2024-01-02', '[]', '[3,4]', '[1,2]', '[]'),
        ('user', 'Photography enthusiast', 'Alice', 'alice_photo', 'alice@example.com', 'hashedpass3', 'Alice', 'Johnson', '2024-01-03', '[5]', '[1]', '[2]', '[]')
    `);

    db.query(`INSERT INTO posts (user_id, created_at, post_text, likes, comments) VALUES
        (1, '2024-01-15 10:00:00', 'First post about programming!', 5, 2),
        (1, '2024-01-15 11:30:00', 'Check out this new feature', 10, 3),
        (2, '2024-01-16 09:15:00', 'Just learned about TypeScript', 8, 1),
        (3, '2024-01-16 14:20:00', 'Posted my new photo collection', 15, 4)
    `);

    db.query(`INSERT INTO comments (post_id, author_user_id, date_created_at, text, likes) VALUES
        (1, 2, '2024-01-15 10:05:00', 'Great post!', 3),
        (1, 3, '2024-01-15 10:10:00', 'Very informative', 2),
        (2, 3, '2024-01-15 11:35:00', 'Nice feature', 4),
        (3, 1, '2024-01-16 09:20:00', 'TypeScript is awesome', 5),
        (4, 2, '2024-01-16 14:25:00', 'Beautiful photos!', 6)
    `);
};