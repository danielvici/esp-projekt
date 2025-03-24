/// <reference lib="deno.ns" />

/**
 * @author Esad Mustafoski
 * @description This file is responsible for creating Functions to easily access the Database, Specifically for Posts
 * @file postUtil.ts
 */

// +++ IMPORTS ------------------------------------------------------ //
import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import { Post } from "../interfaces.ts";
import { mapPostRow, queryDatabase } from "./mod.ts";

async function getPostsFromDB(db: DB, user_uuid?: string): Promise<Post[]> {
  const query = user_uuid
    ? `SELECT * FROM posts WHERE user_id = ?`
    : `SELECT * FROM posts`;
  const params = user_uuid ? [user_uuid] : [];
  return await queryDatabase<Post>(db, query, params, mapPostRow);
}

async function getPostById(db: DB, postId: string): Promise<Post | null> {
  const query = `SELECT * FROM posts WHERE posts_uuid = ?`;
  const posts = await queryDatabase<Post>(db, query, [postId], mapPostRow);
  return posts.length > 0 ? posts[0] : null;
}

async function createPost(
  db: DB,
  userId: string,
  createdAt: string,
  postText: string,
  postType: string,
): Promise<string> {
  const query = `
    INSERT INTO posts (user_id, created_at, post_text, post_type, likes, comments)
    VALUES (?, ?, ?, ?, 0, 0)
  `;

  db.query(query, [userId, createdAt, postText, postType]);
  return db.lastInsertRowId.toString();
}

async function updatePost(
  db: DB,
  postId: string,
  postText?: string,
  postType?: string,
): Promise<void> {
  let query = `UPDATE posts SET `;
  const params: any[] = [];

  if (postText) {
    query += `post_text = ?`;
    params.push(postText);

    if (postType) {
      query += `, post_type = ?`;
      params.push(postType);
    }
  } else if (postType) {
    query += `post_type = ?`;
    params.push(postType);
  }

  query += ` WHERE posts_uuid = ?`;
  params.push(postId);

  db.query(query, params);
}

// This function deletes the comments on the post first, then
// deletes the post to avoid errors
async function deletePost(db: DB, postId: string): Promise<void> {
  const deleteCommentsQuery = `DELETE FROM comments WHERE post_id = ?`;
  db.query(deleteCommentsQuery, [postId]);

  const deletePostQuery = `DELETE FROM posts WHERE posts_uuid = ?`;
  db.query(deletePostQuery, [postId]);
}

// This is simplified and doesn't work as it would in a real application
// or website like twitter, this only exists as a test
async function likePost(db: DB, postId: string, userId: string): Promise<void> {
  const query = `UPDATE posts SET likes = likes + 1 WHERE posts_uuid = ?`;
  db.query(query, [postId]);
}

/**
 * @param posts_to_filter The Posts in an array to filter
 * @param post_types The types of Posts to filter for
 * @returns Array of Posts
 */
// Filter functions merged to one
function filterPosts(posts_to_filter: Post[], post_types: string[]): Post[] {
  if (post_types.length === 0) {
    return posts_to_filter;
  }

  // Set is a type that we can specify the values to
  // example: const set = new Set<number>();
  // set.add(1); Will work
  // set.add("2"); Will not work, it will error because
  // it is a string.
  const includedPostIds = new Set<number>();
  const result: Post[] = [];

  for (const type of post_types) {
    for (const post of posts_to_filter) {
      if (!includedPostIds.has(post.posts_uuid) && post.post_type === type) {
        result.push(post);
        includedPostIds.add(post.posts_uuid);
      }
    }
  }

  return result;
}

export {
  getPostsFromDB,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  filterPosts,
};
