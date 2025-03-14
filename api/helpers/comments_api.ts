/// <reference lib="deno.ns" />
/**
 * @author Esad Mustafoski
 * @description API file for Comments
 */


import * as db_utils from "../../database/utils.ts";
import * as helper_utils from "../helpers.ts";

async function api_getPostComments(ctx: any): Promise<void> {
  try {
    const postId = ctx.params.id;
    if (!postId) {
      helper_utils.errorResponse(ctx, 400, "Post ID required");
      return;
    }
    
    const comments = await db_utils.getCommentsFromDB(Number(postId));
    ctx.response.body = comments;
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error retrieving comments");
  }
}

async function api_createComment(ctx: any): Promise<void> {
  try {
    const postId = ctx.params.id;
    if (!postId) {
      helper_utils.errorResponse(ctx, 400, "Post ID required");
      return;
    }
    
    const body = ctx.request.body;
    const result = await body.json();
    const { userId, text } = result;
    
    if (!userId || !text) {
      helper_utils.errorResponse(ctx, 400, "User ID and comment text required");
      return;
    }
    
    // Create timestamp in the format expected by the database
    const createdAt = `${Math.floor(Date.now() / 1000)}-${
      new Date().toLocaleDateString("en-GB").split("/").join("-")
    }`;
    
    const commentId = await db_utils.createComment(postId, userId, createdAt, text);
    helper_utils.sendResponse(ctx, {
      status: 201,
      body: { commentId }
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error creating comment");
  }
}

async function api_updateComment(ctx: any): Promise<void> {
  try {
    const commentId = ctx.params.id;
    if (!commentId) {
      helper_utils.errorResponse(ctx, 400, "Comment ID required");
      return;
    }
    
    const body = ctx.request.body;
    const result = await body.json();
    const { text } = result;
    
    if (!text) {
      helper_utils.errorResponse(ctx, 400, "Comment text required");
      return;
    }
    
    await db_utils.updateComment(commentId, text);
    helper_utils.sendResponse(ctx, {
      status: 200,
      body: { message: "Comment updated successfully" }
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error updating comment");
  }
}

async function api_deleteComment(ctx: any): Promise<void> {
  try {
    const commentId = ctx.params.id;
    if (!commentId) {
      helper_utils.errorResponse(ctx, 400, "Comment ID required");
      return;
    }
    
    await db_utils.deleteComment(commentId);
    helper_utils.sendResponse(ctx, {
      status: 200,
      body: { message: "Comment deleted successfully" }
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error deleting comment");
  }
}

async function api_likeComment(ctx: any): Promise<void> {
  try {
    const commentId = ctx.params.id;
    if (!commentId) {
      helper_utils.errorResponse(ctx, 400, "Comment ID required");
      return;
    }
    
    const body = ctx.request.body;
    const result = await body.json();
    const { userId } = result;
    
    if (!userId) {
      helper_utils.errorResponse(ctx, 400, "User ID required");
      return;
    }
    
    await db_utils.likeComment(commentId, userId);
    helper_utils.sendResponse(ctx, {
      status: 200,
      body: { message: "Comment liked successfully" }
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error liking comment");
  }
}