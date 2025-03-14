/// <reference lib="deno.ns" />

/**
 * @author Esad Mustafoski
 * @description This file is responsible for creating Functions to easily access the Database, Specifically for Chats
 * @file chatUtil.ts
 */

// +++ IMPORTS ------------------------------------------------------ //
import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import { Chat, Message } from "../interfaces.ts";
import { mapChatRow, mapMessageRow, queryDatabase } from "./mod.ts";

async function getUserChats(db: DB, userId: string): Promise<Chat[]> {
  const query = `SELECT * FROM chats WHERE participants LIKE '%${userId}%'`;
  return await queryDatabase<Chat>(db, query, [], mapChatRow);
}

async function getChatById(db: DB, chatId: string): Promise<Chat | null> {
  const query = `SELECT * FROM chats WHERE chat_id = ?`;
  const chats = await queryDatabase<Chat>(db, query, [chatId], mapChatRow);
  return chats.length > 0 ? chats[0] : null;
}

async function getChatMessages(db: DB, chatId: string): Promise<Message[]> {
  const query =
    `SELECT * FROM messages WHERE chat_id = ? ORDER BY timestamp ASC`;
  return await queryDatabase<Message>(db, query, [chatId], mapMessageRow);
}

async function createChat(
  db: DB,
  participants: string[],
  chatName: string,
): Promise<string> {
  const participantsJson = JSON.stringify(participants);
  const timestamp = `${Math.floor(Date.now() / 1000)}-${
    new Date().toLocaleDateString("en-GB").split("/").join("-")
  }`;

  const query = `
    INSERT INTO chats (chat_name, participants, created_at)
    VALUES (?, ?, ?)
  `;

  db.query(query, [chatName, participantsJson, timestamp]);
  return db.lastInsertRowId.toString();
}

async function addMessageToChat(
  db: DB,
  chatId: string,
  senderId: string,
  content: string,
): Promise<string> {
  const timestamp = `${Math.floor(Date.now() / 1000)}-${
    new Date().toLocaleDateString("en-GB").split("/").join("-")
  }`;

  const query = `
    INSERT INTO messages (chat_id, sender_id, content, timestamp)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [chatId, senderId, content, timestamp]);
  return db.lastInsertRowId.toString();
}

async function deleteChat(db: DB, chatId: string): Promise<void> {
  // First delete all messages in the chat
  const deleteMessagesQuery = `DELETE FROM messages WHERE chat_id = ?`;
  db.query(deleteMessagesQuery, [chatId]);

  // Then delete the chat itself
  const deleteChatQuery = `DELETE FROM chats WHERE chat_id = ?`;
  db.query(deleteChatQuery, [chatId]);
}

export {
  getUserChats,
  getChatById,
  getChatMessages,
  createChat,
  addMessageToChat,
  deleteChat
};