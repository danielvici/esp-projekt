/// <reference lib="deno.ns" />
/**
 * @author Esad Mustafoski
 * @description API file for Comments
 */

// +++ IMPORTS ------------------------------------------------------ //
import * as db_utils from "../../database/utils.ts";
import * as helper_utils from "../helpers.ts";

// +++ FUNCTIONS ----------------------------------------------------- //
async function api_getChats(ctx: any): Promise<void> {
    try {
      const authHeader = ctx.request.headers.get("Authorization");
      if (!authHeader) {
        helper_utils.errorResponse(ctx, 401, "Authentication Required");
        return;
      }

      // Get userId from query parameter (for testing) or use 1 as default (avoid errors because of userid)
      // Assumes 1 is a test account
      const userId = ctx.request.url.searchParams.get("userId") || "1";
      
      const chats = await db_utils.getUserChats(userId);
      ctx.response.body = chats;
    } catch (error) {
      helper_utils.errorResponse(ctx, 500, "Error retrieving chats");
      console.log(error);
    }
  }

async function api_getChatById(ctx: any): Promise<void> {
  try {
    const chatId = ctx.params.id;
    if (!chatId) {
      helper_utils.errorResponse(ctx, 400, "Chat ID required");
      return;
    }

    const chat = await db_utils.getChatById(chatId);
    if (!chat) {
      helper_utils.errorResponse(ctx, 404, "Chat not found");
      return;
    }

    ctx.response.body = chat;
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error retrieving chat");
    console.log(error);
  }
}

async function api_createChat(ctx: any): Promise<void> {
  try {
    const body = ctx.request.body;
    const result = await body.json();
    const { participants, chatName } = result;

    if (
      !participants || !Array.isArray(participants) || participants.length < 2
    ) {
      helper_utils.errorResponse(
        ctx,
        400,
        "Two people required to create a chat",
      );
      return;
    }

    const chatId = await db_utils.createChat(participants, chatName || "");
    helper_utils.sendResponse(ctx, {
      status: 201,
      body: { chatId },
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error creating chat");
    console.log(error);
  }
}

async function api_sendMessage(ctx: any): Promise<void> {
  try {
    const chatId = ctx.params.id;
    if (!chatId) {
      helper_utils.errorResponse(ctx, 400, "Chat ID required");
      return;
    }

    const body = ctx.request.body;
    const result = await body.json();
    const { senderId, content } = result;

    if (!senderId || !content) {
      helper_utils.errorResponse(
        ctx,
        400,
        "Sender ID and message content required",
      );
      return;
    }

    const messageId = await db_utils.addMessageToChat(
      chatId,
      senderId,
      content,
    );
    helper_utils.sendResponse(ctx, {
      status: 201,
      body: { messageId },
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error sending message");
    console.log(error);
  }
}

async function api_deleteChat(ctx: any): Promise<void> {
  try {
    const chatId = ctx.params.id;
    if (!chatId) {
      helper_utils.errorResponse(ctx, 400, "Chat ID required");
      return;
    }

    await db_utils.deleteChat(chatId);
    helper_utils.sendResponse(ctx, {
      status: 200,
      body: { message: "Chat deleted successfully" },
    });
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, "Error deleting chat");
    console.log(error);
  }
}

export {
  api_createChat,
  api_deleteChat,
  api_getChatById,
  api_getChats,
  api_sendMessage,
};
