/**
 * @author Esad Mustafoski
 * @description This file is responsible for creating Functions to easily access the Database, Intended for use in the API
 */

/// <reference lib="deno.ns" />

// +++ IMPORTS ------------------------------------------------------ //
import { DB, Row } from "https://deno.land/x/sqlite/mod.ts";
import { dirname, fromFileUrl, join } from "https://deno.land/std/path/mod.ts";
import * as db_create from "./create_db.ts";

// +++ VARIABLES ---------------------------------------------------- //
// _dirname Is never getting used again, It's only needed because the DB Import
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
  password_salt: string;
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

// +++ Helper ------------------------------------------------------ //
function mapPostRow(row: Row): Post {
  const [posts_uuid, user_id, created_at, post_text, likes, comments] = row;
  return {
    posts_uuid: Number(posts_uuid),
    user_id: Number(user_id),
    created_at: String(created_at),
    post_text: String(post_text),
    likes: Number(likes),
    comments: Number(comments),
  };
}

function mapAccountRow(row: Row): Accounts {
  const [
    user_id,
    user_group,
    bio,
    displayname,
    username,
    user_email,
    password,
    password_salt,
    firstname,
    surname,
    account_created,
    blocked_users,
    followers,
    following,
    contacts,
  ] = row;
  return {
    user_id: Number(user_id),
    user_group: String(user_group),
    bio: String(bio),
    displayname: String(displayname),
    username: String(username),
    user_email: String(user_email),
    password: String(password),
    password_salt: String(password_salt),
    firstname: String(firstname),
    surname: String(surname),
    account_created: String(account_created),
    blocked_users: String(blocked_users),
    followers: String(followers),
    following: String(following),
    contacts: String(contacts),
  };
}

function mapCommentRow(row: Row): Comments {
  const [
    comment_id,
    post_id,
    author_user_id,
    date_created_at,
    text,
    likes,
  ] = row;
  return {
    comment_id: Number(comment_id),
    post_id: Number(post_id),
    author_user_id: Number(author_user_id),
    date_created_at: String(date_created_at),
    text: String(text),
    likes: Number(likes),
  };
}

// "T" is a generic type, it can be anything and makes the function "flexible"(?)
async function queryDatabase<T>(
  query: string,
  params: any[],
  mapRow: (row: Row) => T,
): Promise<T[]> {
  const results: T[] = [];
  try {
    const rows = await db.query(query, params);
    for (const row of rows) {
      results.push(mapRow(row));
    }
  } catch (error) {
    console.error("Database query error:", error);
  }
  return results;
}

// +++ FUNCTIONS --------------------------------------------------- //

/**
 * See:
 * @file ./create_db.ts
 */
function insertSamples(): void {
  db_create.insertSampleData();
}

function createDatabaseIfNotExist(): void {
  db_create.createDatabase();
}

/**
 * @param user_uuid The UUID of the User to get the Posts for. Not required
 * @description If no user_uuid is provided, all Posts will be returned
 * @description If a user_uuid is provided, only the Posts from that User will be returned
 * @returns Array of all Posts in the Database
 */
async function getPostsFromDB(user_uuid?: string): Promise<Post[]> {
  const query = user_uuid
    ? `SELECT * FROM posts WHERE user_id = ?`
    : `SELECT * FROM posts`;
  const params = user_uuid ? [user_uuid] : [];
  return await queryDatabase<Post>(query, params, mapPostRow);
}

/**
 * @returns Array of all Users in the Database
 */
async function getAllUsersFromDB(): Promise<Accounts[]> {
  const query = `SELECT * FROM accounts`;
  return await queryDatabase<Accounts>(query, [], mapAccountRow);
}

/**
 * @param username
 * @returns Returns the Accounts for the User with the given username
 */
async function getUserByUsername(username: string): Promise<Accounts> {
  const query = `SELECT * FROM accounts WHERE user_username = '${username}'`;
  const params: string[] = [];
  const result = await queryDatabase<Accounts>(query, params, mapAccountRow);
  return result[0];
}

/**
 * @param post_id The ID of the Post to get the Comments for. Not required
 * @description If no post_id is provided, all Comments will be returned
 * @description If a post_id is provided, only the Comments for that Post will be returned
 * @returns Array of Comments for the Post, or an empty Array if there are no Comments
 */
async function getCommentsFromDB(post_id?: number): Promise<Comments[]> {
  const query = post_id
    ? `SELECT * FROM comments WHERE post_id = ?`
    : `SELECT * FROM comments`;
  const params = post_id ? [post_id] : [];
  return await queryDatabase<Comments>(query, params, mapCommentRow);
}

/**
 * @param comment_id The ID of the Comment to get the Comments for
 * @returns Array of Comments for the Comment, or an empty Array if there are no Comments
 */
function getCommentsForComments(comment_id: number) {
  // Will be rewritten to use the queryDatabase function
}

/**
 * @param user_id The ID of the User to get
 * @returns All of an users Data from the Database
 * Included: Comments, Posts... Everything including the specific user_uuid in the database
 * Might be required for Administrating the User
 */
async function getAllUserInfoByID(user_id: string) {
  // Will be rewritten to use the queryDatabase function
}

/**
 * @param user_id The ID of the User to get the Posts for
 * @returns Array of Posts from the User, or an empty Array if the User doesn't exist or has no Posts
 */
// Filter Functions, Not yet implemented
function filterForImagePosts(posts_to_filter: Array<any>) {
  return [];
}

function filterForVideoPosts(posts_to_filter: Array<any>) {
  return [];
}

function filterForTextPosts(posts_to_filter: Array<any>) {
  return [];
}

// Register/Login/User

/**
 * @param user The username of the User to add
 * @param password The hashed password of the User to add
 * @param salt The salt used for the password
 * @returns "noUser" if user exists, "newUser" if registration successful
 */
function registerUser(
  user: string,
  password: string,
  salt: string,
  userGroup: string,
  displayname: string,
  user_email: string,
  firstname: string,
  surname: string,
  account_created: string,
): string {
  const query_user_exists =
    `SELECT * FROM accounts WHERE user_username = '${user}'`;
  if (!query_user_exists) {
    return "noUser";
  }

  const query_add_user = `
        INSERT INTO accounts (
            user_username, 
            password, 
            password_salt,
            user_group, 
            user_displayname, 
            user_email, 
            firstname, 
            surname, 
            account_created
        ) VALUES (
            '${user}', 
            '${password}', 
            '${salt}',
            '${userGroup}', 
            '${displayname}', 
            '${user_email}', 
            '${firstname}', 
            '${surname}', 
            '${account_created}'
        )`;
  db.query(query_add_user);
  console.log(`New user: ${user}`);

  return "newUser";
}

// Exporting all functions as this is a module
export {
  createDatabaseIfNotExist,
  getAllUserInfoByID,
  getAllUsersFromDB,
  getCommentsForComments,
  getCommentsFromDB,
  getPostsFromDB,
  getUserByUsername,
  insertSamples,
  registerUser,
};
