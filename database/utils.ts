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
  // --- Account Functions --- //
  getAllUsersFromDB as getAllUsersFromDBInternal,
  getUserByUsername as getUserByUsernameInternal,
  // getAllUserInfoByID as getAllUserInfoByIDInternal,
  // Accidentally deleted function...
  registerUser as registerUserInternal,

  // --- Post Functions --- //
  getPostsFromDB as getPostsFromDBInternal,
  getPostById as getPostByIdInternal,
  createPost as createPostInternal,
  updatePost as updatePostInternal,
  deletePost as deletePostInternal,
  likePost as likePostInternal,
  filterPosts,

  // --- Comment Functions --- //
  getCommentsFromDB as getCommentsFromDBInternal,
  // getCommentsForComments as getCommentsForCommentsInternal,
  // Accidentally deleted function...
  createComment as createCommentInternal,
  updateComment as updateCommentInternal,
  deleteComment as deleteCommentInternal,
  likeComment as likeCommentInternal,

  // --- Chat Functions --- //
  getUserChats as getUserChatsInternal,
  getChatById as getChatByIdInternal,
  getChatMessages as getChatMessagesInternal,
  createChat as createChatInternal,
  addMessageToChat as addMessageToChatInternal,
  deleteChat as deleteChatInternal,

  // --- Mapper Functions --- //
  queryDatabase as queryDatabaseInternal,
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
  Post,
  Accounts,
  Comments,
  Chat,
  Message,
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
export function createDatabaseIfNotExist(): void {
  db_create.createDatabase();
}

export function insertSamples(): void {
  db_create.insertSampleData();
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
