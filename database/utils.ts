/**
 * @author Esad Mustafoski
 * @description This file is responsible for creating Functions to easily access the Database, Intended for use in the API
 */

/// <reference lib="deno.ns" />

// +++ IMPORTS ------------------------------------------------------ //
import { DB, Row } from "https://deno.land/x/sqlite/mod.ts";
import { dirname, fromFileUrl, join } from "https://deno.land/std/path/mod.ts";

// +++ VARIABLES ---------------------------------------------------- //
// __dirname Is never getting used again, It's only needed because the DB Import
// from SQLite doesn't like relative paths, so I use this as
// A Workaround

const _dirname: string = dirname(fromFileUrl(import.meta.url));
const dbPath: string = join(_dirname, "../database/esp-projekt.sqlite");
const db = new DB(dbPath);

// +++ INTERFACES --------------------------------------------------- //
// Used in the Functions to define the return type/Avoid type errors
interface Post {
    posts_uuid: number;
    user_id: number;
    created_at: string;
    post_text: string;
    likes: number;
    comments: number;
}

interface Accounts {
    user_id: number;
    user_group: string;
    bio: string;
    displayname: string;
    username: string;
    user_email: string;
    password: string;
    firstname: string;
    surname: string;
    account_created: string;
    blocked_users: string;
    followers: string;
    following: string;
    contacts: string;
}

interface Comments {
    comment_id: number;
    post_id: number;
    author_user_id: number;
    date_created_at: string;
    text: string;
    likes: number;
}


// +++ FUNCTIONS---------------------------------------------------- //

/**
 * @param user_uuid The UUID of the User to get the Posts for. Not required
 * @description If no user_uuid is provided, all Posts will be returned
 * @description If a user_uuid is provided, only the Posts from that User will be returned
 * @returns Array of all Posts in the Database
 */
async function getPostsFromDB(user_uuid?: string): Promise<Post[]> {
    const data_result: Array<Post> = [];
    let rows: Row[];

    try {
        if (user_uuid === undefined) {
            rows = await db.query(`SELECT * FROM posts`);
        } else {
            rows = await db.query(`SELECT * FROM posts WHERE user_id = ${user_uuid}`);
        }

        for (const row of rows) {
            const [
                posts_uuid,
                user_id,
                created_at,
                post_text,
                likes,
                comments,
            ] = row;

            data_result.push({
                posts_uuid: Number(posts_uuid),
                user_id: Number(user_id),
                created_at: String(created_at),
                post_text: String(post_text),
                likes: Number(likes),
                comments: Number(comments),
            });
        }
    } catch (error) {
        console.error("Error fetching posts", error);
    }
    return data_result;
}

/**
 * @returns Array of all Users in the Database
 */
async function getAllUsersFromDB(): Promise<Accounts[]> {
    const accounts_list: Array<Accounts> = [];
    try {
        const rows = await db.query("SELECT * FROM accounts");

        for (const row of rows) {
            const [
                user_id,
                user_group,
                bio,
                displayname,
                username,
                user_email,
                password,
                firstname,
                surname,
                account_created,
                blocked_users,
                followers,
                following,
                contacts,
            ] = row;
            accounts_list.push({
                user_id: Number(user_id),
                user_group: String(user_group),
                bio: String(bio),
                displayname: String(displayname),
                username: String(username),
                user_email: String(user_email),
                password: String(password),
                firstname: String(firstname),
                surname: String(surname),
                account_created: String(account_created),
                blocked_users: String(blocked_users),
                followers: String(followers),
                following: String(following),
                contacts: String(contacts),
            });
        }
    } catch (error) {
        console.error("Error fetching users", error);
    }
    return accounts_list;
}

// Test Function, not useful
// Promise needed because of "await"
// It indicates that the function resolves something
async function countPosts(): Promise<number> {
    let count = 0;
    try {
        for (const [c] of await db.query("SELECT COUNT(*) FROM posts")) {
            count = c as number;
        }
    } catch (error) {
        console.error("Error counting posts:", error);
    }
    console.log("Total posts:", count);
    return count;
}

/**
 * @param post_id The ID of the Post to get the Comments for. Not required
 * @description If no post_id is provided, all Comments will be returned
 * @description If a post_id is provided, only the Comments for that Post will be returned
 * @returns Array of Comments for the Post, or an empty Array if there are no Comments
 */
async function getCommentsFromDB(post_id?: number): Promise<Comments[]> {
    const data_result:Array<Comments> = [];
    let rows: Row[] = [];

    try {
        if (post_id === undefined) {
            rows = await db.query(`SELECT * FROM comments`);
        } else {
            rows = await db.query(`SELECT * FROM comments WHERE post_id = ${post_id}`);
        }

        for (const row of rows) {
            const [
                comment_id,
                post_id,
                author_user_id,
                date_created_at,
                text,
                likes,
            ] = row;

            data_result.push({
                comment_id: Number(comment_id),
                post_id: Number(post_id),
                author_user_id: Number(author_user_id),
                date_created_at: String(date_created_at),
                text: String(text),
                likes: Number(likes),
            });
        }
    } catch (error) {
        console.error("Error fetching comments", error, "Post ID:", post_id);
        return [];
    }

    return data_result;
}

/**
 * @param comment_id The ID of the Comment to get the Comments for
 * @returns Array of Comments for the Comment, or an empty Array if there are no Comments
 */
function getCommentsForComments(comment_id: number) {
}

/**
 * @param user_id The ID of the User to get
 * @returns All of an users Data from the Database
 * Included: Comments, Posts... Everything including the specific user_uuid in the database
 */
function getAllUserInfoByID(user_id: number) {
}

/**
 * @param user_id The ID of the User to get the Posts for
 * @returns Array of Posts from the User, or an empty Array if the User doesn't exist or has no Posts
 */
// Filter Functions
function filterForImagePosts(posts_to_filter: Array<any>) {
    return [];
}

function filterForVideoPosts() {
    return [];
}

function filterForTextPosts() {
    return [];
}

// Exporting all functions as this is a module
export {
    countPosts,
    filterForImagePosts,
    filterForTextPosts,
    filterForVideoPosts,
    getAllUsersFromDB,
    getCommentsForComments,
    getCommentsFromDB,
    getPostsFromDB,
    getAllUserInfoByID,
};
