/**
 * @author Esad Mustafoski
 * @file db.test.ts
 * This file is made to test the Database Functions
 */

/// <reference lib="deno.ns" />

// +++ IMPORTS ------------------------------------------------------ //
import {
  assert,
  assertEquals,
  assertMatch,
} from "https://deno.land/std/assert/mod.ts";

import * as db_utils from "../database/db_utils.ts";

// +++ TESTS ------------------------------------------------------- //
// Database Tests
Deno.test("Database Connection", async () => {
  const users = await db_utils.getAllUsersFromDB();
  assert(users !== null, "Database connection should be established");
});

// User Tests
Deno.test("getAllUsersFromDB returns array of users with correct properties", async () => {
  const users = await db_utils.getAllUsersFromDB();
  assert(Array.isArray(users), "Expected users to be an array");

  if (users.length > 0) {
    const user = users[0];
    assert(typeof user.user_id === "number", "user_id should be a number");
    assert(typeof user.username === "string", "username should be a string");
    assert(
      typeof user.user_email === "string",
      "user_email should be a string",
    );
  }
});

// Posts Tests
Deno.test("getPostsFromDB returns array of posts with correct structure", async () => {
  const posts = await db_utils.getPostsFromDB();
  assert(Array.isArray(posts), "Expected posts to be an array");

  if (posts.length > 0) {
    const post = posts[0];
    assert(
      typeof post.posts_uuid === "number",
      "posts_uuid should be a number",
    );
    assert(typeof post.user_id === "number", "user_id should be a number");
    assert(typeof post.post_text === "string", "post_text should be a string");
    assert(typeof post.likes === "number", "likes should be a number");
  }
});

Deno.test("countPosts returns valid number", async () => {
  const count = await db_utils.countPosts();
  assert(typeof count === "number", "Count should be a number");
  assert(count >= 0, "Count should be non-negative");

  const posts = await db_utils.getPostsFromDB();
  assertEquals(count, posts.length, "Count should match number of posts");
});

// Filter Tests (Will not work until the functions are implemented)
Deno.test("filterForImagePosts returns array", () => {
  const mockPosts: Array<any> = [];
  const result = db_utils.filterForImagePosts(mockPosts);
  assert(Array.isArray(result), "Should return an array");
});

Deno.test("filterForVideoPosts returns array", () => {
  const result = db_utils.filterForVideoPosts([]);
  assert(Array.isArray(result), "Should return an array");
});

Deno.test("filterForTextPosts returns array", () => {
  const result = db_utils.filterForTextPosts([]);
  assert(Array.isArray(result), "Should return an array");
});

// Error Handling Tests
Deno.test("getAllUsersFromDB handles errors gracefully", async () => {
  const users = await db_utils.getAllUsersFromDB();
  assert(Array.isArray(users), "Should return empty array on error");
});

Deno.test("getPostsFromDB handles errors gracefully", async () => {
  const posts = await db_utils.getPostsFromDB();
  assert(Array.isArray(posts), "Should return empty array on error");
});

// Comments Tests
Deno.test("getCommentsFromDB handles invalid post_id", async () => {
  const result = await db_utils.getCommentsFromDB(-1);
  assertEquals(result, [], "Should handle invalid post_id");
});

Deno.test("getCommentsFromDB handles invalid comment_id", () => {
  const result = db_utils.getCommentsForComments(-1);
  assertEquals(result, undefined, "Should handle invalid comment_id");
});

// User Info Tests
Deno.test("getUserInfoByID handles invalid user_id", async () => {
  const result = await db_utils.getAllUserInfoByID(-1);
  assertEquals(result, [], "Should handle invalid user_id");
});

Deno.test("getPostsFromDB handles invalid user_id", async () => {
  const result = await db_utils.getPostsFromDB("-1");
  assertEquals(result, [], "Should handle invalid user_id");
});

// Data Validation Tests
Deno.test("User data types are correct", async () => {
  const users = await db_utils.getAllUsersFromDB();
  if (users.length > 0) {
    const user = users[0];
    assertMatch(
      user.user_email,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email should be valid format",
    );
    assert(user.password.length >= 1, "Password should not be empty");
  }
});

Deno.test("Post data types are correct", async () => {
  const posts = await db_utils.getPostsFromDB();
  if (posts.length > 0) {
    const post = posts[0];
    assert(post.likes >= 0, "Likes should be non-negative");
    assert(post.comments >= 0, "Comments should be non-negative");
    assert(post.post_text.length > 0, "Post text should not be empty");
  }
});
