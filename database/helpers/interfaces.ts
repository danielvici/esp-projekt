/// <reference lib="deno.ns" />

/**
 * @author Esad Mustafoski
 * @description This file is responsible for making Interfaces accessible by every file, deduplicating it.
 * @file interfaces.ts
 */

interface Post {
  posts_uuid: number;
  user_id: number;
  created_at: string;
  post_text: string;
  post_type: string;
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

interface Chat {
  chat_id: number;
  chat_name: string;
  participants: string;
  created_at: string;
}

interface Message {
  message_id: number;
  chat_id: number;
  sender_id: number;
  content: string;
  timestamp: string;
}

export type { Accounts, Chat, Comments, Message, Post };
