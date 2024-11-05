/** 
 * @author Esad Mustafoski
 * @description This file is responsible for creating Functions to easily access the Database, Intended for use in the API
 */

/// <reference lib="deno.ns" />

import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { dirname, fromFileUrl, join } from "https://deno.land/std/path/mod.ts";

// __dirname Is never getting used again, It's only needed because the DB Import
// from SQLite doesn't like relative paths, so I use this as
// A Workaround

// +++ VARIABLES ---------------------------------------------------- //
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

// +++ FUNCTIONS---------------------------------------------------- //

/**
 * @returns Array of all Posts in the Database
 */
async function getPostsFromDB() {
    const data_result: Array<Post> = [];
    try {
        const rows = await db.query(`SELECT * FROM posts`);

        // Assuming `db.query` returns an array of arrays or tuples
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
                posts_uuid: Number(posts_uuid), // Convert to string if necessary
                user_id: Number(user_id),
                created_at: String(created_at), // Convert to Date if necessary
                post_text: String(post_text),
                likes: Number(likes), // Convert to number if necessary
                comments: Number(comments), // Convert to number if necessary
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
async function getAllUsersFromDB() {
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
 * @param post_id The ID of the Post to get the Comments for
 * @returns Array of Comments for the Post, or an empty Array if there are no Comments
 */
function getCommentsForPost(post_id: number) {
}

/**
 * @param comment_id The ID of the Comment to get the Comments for
 * @returns Array of Comments for the Comment, or an empty Array if there are no Comments
 */
function getCommentsForComments(comment_id: number) {
}

/**
 * @param user_id The ID of the User to get
 * @returns The User with the given ID, or null if the User doesn't exist
 */
function getUserInfoByID(user_id: number) {
}

/**
 * @param user_id The ID of the User to get the Posts for
 * @returns Array of Posts from the User, or an empty Array if the User doesn't exist or has no Posts
 */
function getAllPostsFromUser(user_id: number) {
}

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

// Export all Functions to make this a module
export {
    countPosts,
    filterForImagePosts,
    filterForTextPosts,
    filterForVideoPosts,
    getAllPostsFromUser,
    getAllUsersFromDB,
    getCommentsForComments,
    getCommentsForPost,
    getPostsFromDB,
    getUserInfoByID,
};
