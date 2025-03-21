/// <reference lib="deno.ns" />

/**
 * @author Esad Mustafoski
 * @description This file is responsible for creating Functions to easily access the Database, Specifically for Comments
 * @file commentUtil.ts
 */

import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import { Comments } from "../interfaces.ts";
import { mapCommentRow, queryDatabase } from "./mod.ts";

async function getCommentsFromDB(
  db: DB,
  post_id?: number,
): Promise<Comments[]> {
  const query = post_id
    ? `SELECT * FROM comments WHERE post_id = ?`
    : `SELECT * FROM comments`;
  const params = post_id ? [post_id] : [];
  return await queryDatabase<Comments>(db, query, params, mapCommentRow);
}

function createComment(
  db: DB,
  postId: string,
  userId: string,
  createdAt: string,
  text: string,
): string {
  const query = `
    INSERT INTO comments (post_id, author_user_id, date_created_at, text, likes)
    VALUES (?, ?, ?, ?, 0)
  `;
  db.query(query, [postId, userId, createdAt, text]);

  const updatePostQuery =
    `UPDATE posts SET comments = comments + 1 WHERE posts_uuid = ?`;
  db.query(updatePostQuery, [postId]);

  return db.lastInsertRowId.toString();
}

async function updateComment(
  db: DB,
  commentId: string,
  text: string,
): Promise<void> {
  const query = `UPDATE comments SET text = ? WHERE comment_id = ?`;
  db.query(query, [text, commentId]);
}

async function deleteComment(db: DB, commentId: string): Promise<void> {
  const getPostIdQuery = `SELECT post_id FROM comments WHERE comment_id = ?`;
  const result = db.query(getPostIdQuery, [commentId]);
  const postId: any = result[0][0];

  const deleteCommentQuery = `DELETE FROM comments WHERE comment_id = ?`;
  db.query(deleteCommentQuery, [commentId]);

  const updatePostQuery =
    `UPDATE posts SET comments = comments - 1 WHERE posts_uuid = ?`;
  db.query(updatePostQuery, [postId]);
}

async function likeComment(
  db: DB,
  commentId: string,
  userId: string,
): Promise<void> {
  const query = `UPDATE comments SET likes = likes + 1 WHERE comment_id = ?`;
  db.query(query, [commentId]);
}

export {
  createComment,
  deleteComment,
  getCommentsFromDB,
  likeComment,
  updateComment,
};
