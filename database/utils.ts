/// <reference lib="deno.ns" />

/**
 * @author Esad Mustafoski
 * @description This file is responsible for creating Functions to easily access the Database, Intended for use in the API
 */

// +++ IMPORTS ------------------------------------------------------ //
import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.224.0/path/mod.ts";
import * as db_create from "./create_db.ts";

// Import all internal utilities with renamed imports to avoid naming conflicts
import {
  addMessageToChat as addMessageToChatInternal,
  createChat as createChatInternal,
  // getCommentsForComments as getCommentsForCommentsInternal,
  // Accidentally deleted function...
  createComment as createCommentInternal,
  createPost as createPostInternal,
  deleteChat as deleteChatInternal,
  deleteComment as deleteCommentInternal,
  deletePost as deletePostInternal,
  filterPosts,
  // --- Account Functions --- //
  getAllUsersFromDB as getAllUsersFromDBInternal,
  getChatById as getChatByIdInternal,
  getChatMessages as getChatMessagesInternal,
  // --- Comment Functions --- //
  getCommentsFromDB as getCommentsFromDBInternal,
  getPostById as getPostByIdInternal,
  // --- Post Functions --- //
  getPostsFromDB as getPostsFromDBInternal,
  getUserByUsername as getUserByUsernameInternal,
  // --- Chat Functions --- //
  getUserChats as getUserChatsInternal,
  likeComment as likeCommentInternal,
  likePost as likePostInternal,
  // --- Mapper Functions --- //
  queryDatabase as queryDatabaseInternal,
  // getAllUserInfoByID as getAllUserInfoByIDInternal,
  // Accidentally deleted function...
  registerUser as registerUserInternal,
  updateComment as updateCommentInternal,
  updatePost as updatePostInternal,
} from "./helpers/utils/mod.ts";

// +++ VARIABLES ---------------------------------------------------- //
// _dirname Is never getting used again, It's only needed because the DB Import
// from SQLite doesn't like relative paths, so I use this as
// A Workaround
const _dirname: string = dirname(fromFileUrl(import.meta.url));
const dbPath: string = join(_dirname, "../database/esp-projekt.sqlite");
const db = new DB(dbPath);

// +++ INTERFACES --------------------------------------------------- //
// Only re-export interfaces that are needed by external code
export type {
  Accounts,
  Chat,
  Comments,
  Message,
  Post,
} from "./helpers/interfaces.ts";
// +++ HELPER FUNCTIONS --------------------------------------------- //
export function queryDatabase<T>(
  query: string,
  params: any[],
  mapRow: (row: any) => T,
): Promise<T[]> {
  return queryDatabaseInternal(db, query, params, mapRow);
}

// +++ DATABASE INITIALIZATION -------------------------------------- //
export async function ensureDatabaseExists(): Promise<void> {
  const dbDir = dirname(dbPath);
  let dbInstance: DB | null = null; // Avoids hard to decode errors because it Throws one if it cant continue.

  try {
    try {
      await Deno.stat(dbDir);
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) { // Deno.errors.NotFound is a type of error that is thrown when a file or directory is not found.
        // In short, It's a type, and it makes sure that the "error" variable is of type Deno.errors.NotFound.
        console.log(`Created database directory: ${dbDir}`);
      } else {
        throw error;
      }
    }
    console.log(`Opening database connection: ${dbPath}`);
    dbInstance = new DB(dbPath);

    try {
      dbInstance.query("SELECT 1 FROM marker LIMIT 1;");
      console.log("Database already initialized (marker table found).");
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          "Marker table not found or query failed. Initializing database tables.",
        );
        db_create.createDatabase(dbInstance);
        db_create.insertSampleData(dbInstance);
        console.log("Database initialization complete.");
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(
      "Error during database existence check or initialization:",
      error,
    );
  } finally {
    if (dbInstance) {
      dbInstance.close();
      console.log("Database connection closed.");
    } else {
      console.log("Database connection was not opened.");
    }
  }
}

// +++ ACCOUNT FUNCTIONS -------------------------------------------- //
export const getAllUsersFromDB = () => getAllUsersFromDBInternal(db);
export const getUserByUsername = (username: string) =>
  getUserByUsernameInternal(db, username);
// export const getAllUserInfoByID = (user_id: string) => getAllUserInfoByIDInternal(db, user_id);
export const registerUser = (
  user: string,
  password: string,
  salt: string,
  userGroup: string,
  displayname: string,
  user_email: string,
  firstname: string,
  surname: string,
  account_created: string,
) =>
  registerUserInternal(
    db,
    user,
    password,
    salt,
    userGroup,
    displayname,
    user_email,
    firstname,
    surname,
    account_created,
  );

// +++ POST FUNCTIONS ----------------------------------------------- //
export const getPostsFromDB = (user_uuid?: string) =>
  getPostsFromDBInternal(db, user_uuid);
export const getPostById = (postId: string) => getPostByIdInternal(db, postId);
export const createPost = (
  userId: string,
  createdAt: string,
  postText: string,
  postType: string,
) => createPostInternal(db, userId, createdAt, postText, postType);
export const updatePost = (
  postId: string,
  postText?: string,
  postType?: string,
) => updatePostInternal(db, postId, postText, postType);
export const deletePost = (postId: string) => deletePostInternal(db, postId);
export const likePost = (postId: string, userId: string) =>
  likePostInternal(db, postId, userId);

// +++ COMMENT FUNCTIONS -------------------------------------------- //
export const getCommentsFromDB = (post_id?: number) =>
  getCommentsFromDBInternal(db, post_id);
// export const getCommentsForComments = (comment_id: number) => getCommentsForCommentsInternal(db, comment_id);
export const createComment = (
  postId: string,
  userId: string,
  createdAt: string,
  text: string,
) => createCommentInternal(db, postId, userId, createdAt, text);
export const updateComment = (commentId: string, text: string) =>
  updateCommentInternal(db, commentId, text);
export const deleteComment = (commentId: string) =>
  deleteCommentInternal(db, commentId);
export const likeComment = (commentId: string, userId: string) =>
  likeCommentInternal(db, commentId, userId);

// +++ CHAT FUNCTIONS ----------------------------------------------- //
export const getUserChats = (userId: string) =>
  getUserChatsInternal(db, userId);
export const getChatById = (chatId: string) => getChatByIdInternal(db, chatId);
export const getChatMessages = (chatId: string) =>
  getChatMessagesInternal(db, chatId);
export const createChat = (participants: string[], chatName: string) =>
  createChatInternal(db, participants, chatName);
export const addMessageToChat = (
  chatId: string,
  senderId: string,
  content: string,
) => addMessageToChatInternal(db, chatId, senderId, content);
export const deleteChat = (chatId: string) => deleteChatInternal(db, chatId);

// +++ UTILITY FUNCTIONS -------------------------------------------- //
export { filterPosts };
