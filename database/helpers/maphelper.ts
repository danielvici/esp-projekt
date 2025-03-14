/// <reference lib="deno.ns" />
/**
 * @author Esad Mustafoski
 * @description This file makes accessing the Database easier by creating a map for each type of data
 * @file maphelper.ts
 */

// +++ IMPORTS ------------------------------------------------------ //
import { Row } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import {
  Accounts,
  Chat,
  Comments,
  Message,
  Post,
} from "../helpers/interfaces.ts";

function mapPostRow(row: Row): Post {
  const [
    posts_uuid,
    user_id,
    created_at,
    post_text,
    post_type,
    likes,
    comments,
  ] = row;
  return {
    posts_uuid: Number(posts_uuid),
    user_id: Number(user_id),
    created_at: String(created_at),
    post_text: String(post_text),
    post_type: String(post_type),
    likes: Number(likes),
    comments: Number(comments),
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

function mapChatRow(row: Row): Chat {
  const [chat_id, chat_name, participants, created_at] = row;
  return {
    chat_id: Number(chat_id),
    chat_name: String(chat_name),
    participants: String(participants),
    created_at: String(created_at),
  };
}

function mapMessageRow(row: Row): Message {
  const [message_id, chat_id, sender_id, content, timestamp] = row;
  return {
    message_id: Number(message_id),
    chat_id: Number(chat_id),
    sender_id: Number(sender_id),
    content: String(content),
    timestamp: String(timestamp),
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

export {
    mapAccountRow,
    mapChatRow,
    mapCommentRow,
    mapMessageRow,
    mapPostRow
};