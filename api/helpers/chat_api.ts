/// <reference lib="deno.ns" />
/**
 * @author Esad Mustafoski
 * @description API file for Comments
 */

import * as db_utils from "../../database/utils.ts";
import * as helper_utils from "../helpers.ts";
import { Context } from "https://deno.land/x/oak@v17.1.2/mod.ts";

// Post functions
async function api_getPostById(ctx: any): Promise<void> {
  try {
    const postId = ctx.params.id;
    if (!postId) {
      helper_utils.errorResponse(ctx, 400, "Post ID required");
      return;
    }

    const post = await db_utils.getPostById(postId);
    if (!post) {
      helper_utils.errorResponse(ctx, 404, "Post not found");
      return;
    }

    ctx.response.body = post;
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error retrieving post");
  }
}

async function api_createPost(ctx: Context): Promise<void> {
  try {
    const body = ctx.request.body;
    const result = await body.json();
    const { userId, postText, postType } = result;

    if (!userId || !postText || !postType) {
      helper_utils.errorResponse(
        ctx,
        400,
        "User ID, post text, and post type required",
      );
      return;
    }

    // Create timestamp in the format expected by the database
    const createdAt = `${Math.floor(Date.now() / 1000)}-${
      new Date().toLocaleDateString("en-GB").split("/").join("-")
    }`;

    const postId = await db_utils.createPost(
      userId,
      createdAt,
      postText,
      postType,
    );
    helper_utils.sendResponse(ctx, {
      status: 201,
      body: { postId },
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error creating post");
  }
}

async function api_updatePost(ctx: any): Promise<void> {
  try {
    const postId = ctx.params.id;
    if (!postId) {
      helper_utils.errorResponse(ctx, 400, "Post ID required");
      return;
    }

    const body = ctx.request.body;
    const result = await body.json();
    const { postText, postType } = result;

    if (!postText && !postType) {
      helper_utils.errorResponse(ctx, 400, "No update data provided");
      return;
    }

    await db_utils.updatePost(postId, postText, postType);
    helper_utils.sendResponse(ctx, {
      status: 200,
      body: { message: "Post updated successfully" },
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error updating post");
  }
}

async function api_deletePost(ctx: any): Promise<void> {
  try {
    const postId = ctx.params.id;
    if (!postId) {
      helper_utils.errorResponse(ctx, 400, "Post ID required");
      return;
    }

    await db_utils.deletePost(postId);
    helper_utils.sendResponse(ctx, {
      status: 200,
      body: { message: "Post deleted successfully" },
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error deleting post");
  }
}

async function api_likePost(ctx: any): Promise<void> {
  try {
    const postId = ctx.params.id;
    if (!postId) {
      helper_utils.errorResponse(ctx, 400, "Post ID required");
      return;
    }

    const body = ctx.request.body;
    const result = await body.json();
    const { userId } = result;

    if (!userId) {
      helper_utils.errorResponse(ctx, 400, "User ID required");
      return;
    }

    await db_utils.likePost(postId, userId);
    helper_utils.sendResponse(ctx, {
      status: 200,
      body: { message: "Post liked successfully" },
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error liking post");
  }
}
