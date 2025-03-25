/// <reference lib="deno.ns" />
/**
 * @author Esad Mustafoski
 * @description Main API file, Handles all the routing/api stuff
 */

// +++ IMPORTS ------------------------------------------------------ //
import {
  Application,
  Context,
  Next,
  Router,
} from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import * as db_utils from "../database/utils.ts";
import * as helper_utils from "./helpers.ts";

import {
  // --- Chat --- //
  api_createChat,
  api_createComment,
  api_createPost,
  api_deleteChat,
  api_deleteComment,
  api_deletePost,
  // --- User --- //
  api_getAllUsers,
  api_getChatById,
  api_getChats,
  // --- Post --- //
  api_getPostById,
  // --- Comment --- //
  api_getPostComments,
  api_likeComment,
  api_likePost,
  api_sendMessage,
  api_updateComment,
  api_updatePost,
} from "./helpers/mod.ts";

// +++ VARIABLES / TYPES --------------------------------------------- //
const router = new Router();
const app = new Application();

// unused for now
type ApiResponse = {
  status: number;
  body: unknown;
};

// +++ ROUTER ------------------------------------------------------- //
// Creates the routes for the API server.
// Example: localhost:8000/api will show "testAPIPoint"
// in the HTML page.

// Docs Routes
router
  .get("/", (ctx: any) => {
    ctx.response.body = "For endpoints, use /api/{name}";
  })
  .get("/api", (ctx: any) => {
    ctx.response.body = "For API Documentation, visit /docs";
  });

// -- Account routes --
router
  .post("/api/account/login", api_login)
  .post("/api/account/register", api_register)
  .post("/api/account/logout", () => {}) // TODO
  .post("/api/account/password/forgot", () => {}) // TODO
  .post("/api/account/password/reset", () => {}) // TODO
  .post("/api/account/password/change", () => {}) // TODO
  .post("/api/account/email/change-email", () => {}) // TODO
  .post("/api/account/email/verify-email", () => {}) // TODO
  .post("/api/account/delete-account", () => {}) // TODO
  .post("/api/account/block", () => {}); // TODO

// -- Auth Routes -- //
router
  .get("/api/auth", () => {}) // TODO
  .get("/api/auth/verify", () => {}) // TODO
  .get("/api/auth/refresh", () => {}); // TODO

// -- User routes -- //
router.get("/api/users", api_getAllUsers);
// .get("/api/user/:id/info", api_user_getInfo);

// -- Chat routes -- //
router
  .get("/api/chats", api_getChats)
  .get("/api/chat/:id", api_getChatById)
  .post("/api/chat/create", api_createChat)
  .post("/api/chat/:id/message", api_sendMessage)
  .delete("/api/chat/:id", api_deleteChat);

// -- Post routes -- //
router
  .get("/api/posts", api_posts_getAll)
  .get("/api/post/:id", api_getPostById)
  .post("/api/post/create", api_createPost)
  .put("/api/post/:id", api_updatePost)
  .delete("/api/post/:id", api_deletePost)
  .post("/api/post/:id/like", api_likePost);

// -- Comment Routes -- //
router
  .get("/api/post/:id/comments", api_getPostComments)
  .post("/api/post/:id/comment", api_createComment)
  .put("/api/comment/:id", api_updateComment)
  .delete("/api/comment/:id", api_deleteComment)
  .post("/api/comment/:id/like", api_likeComment);

// +++ FUNCTIONS ----------------------------------------------------- //

// ABANDONED FUNCTIONS //
async function _authenticator(ctx: Context, next: Next): Promise<void> {
  const authHeader = ctx.request.headers.get("Authorization");

  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = { error: "No header" };
    return;
  }

  // Bearer check
  // Bearer is often used for authentication in API's and is a standard, I check it using RegEx (Regular Expressions)
  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid format" };
    return;
  }

  const token = match[1];

  try {
    // Token logic missing, unattempted.
    await next();
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid token" };
  }
}

async function _tokenChecker(ctx: Context, next: Next): Promise<void> {
  // logic below (TODO):
  /**
   * 1. check if the token is valid
   * 2. if valid, set the user in the context
   * 3. if not valid, return 401
   * 4. if: token missing, expired, blacklisted, !DB, !user or !correct user, return 401 with associated error
   * eg: wrong user: 401 -> "Token not associated with this user"
   */
}

// API: Posts //
async function api_posts_getAll(ctx: Context): Promise<void> {
  const posts = await db_utils.getPostsFromDB();
  ctx.response.body = posts;
}

// API: login/register //
async function api_register(ctx: Context): Promise<void> {
  try {
    const body = ctx.request.body;
    const result = await body.json();
    const {
      username,
      password,
      userGroup,
      displayname,
      user_email,
      firstname,
      surname,
    } = result;
    // Claude 3-5 Sonnet was used for the first Date formatting
    const account_created = `${Math.floor(Date.now() / 1000)}-${
      new Date()
        .toLocaleDateString("en-GB")
        .split("/")
        .join("-")
    }`;

    if (
      !username ||
      !password ||
      !userGroup ||
      !displayname ||
      !user_email ||
      !firstname ||
      !surname
    ) {
      helper_utils.errorResponse(ctx, 400, "Missing required fields");
      return;
    }

    // First salt the password
    const { saltedPassword, salt } = await helper_utils.saltPassword(password);
    // Then hash the salted password
    const hash = await helper_utils.hashPassword(saltedPassword);

    const userId = db_utils.registerUser(
      username,
      hash,
      salt,
      userGroup,
      displayname,
      user_email,
      firstname,
      surname,
      account_created,
    );

    const user = await db_utils.getUserByUsername(username);

    const responseBody: any = {
      success: true,
      message: "Register successful",
    };

    if (user.user_id !== undefined) {
      responseBody.userId = user.user_id;
    }

    helper_utils.sendResponse(ctx, {
      status: 200,
      body: responseBody,
    });
  } catch (error) {
    console.log(error);
    helper_utils.errorResponse(ctx, 500, "Invalid request");
    return;
  }
}

async function api_login(ctx: Context): Promise<string> {
  try {
    const body = ctx.request.body;
    const result = await body.json();
    const { username, password } = result;

    if (!username || !password) {
      helper_utils.errorResponse(ctx, 400, "Missing required fields");
      return "Error";
    }

    const user = await db_utils.getUserByUsername(username);
    if (!user) {
      helper_utils.errorResponse(ctx, 404, "User not found");
      return "Error";
    }

    const storedSalt = user.password_salt;
    const saltedPassword = `${password}${storedSalt}`;
    const hash = await helper_utils.hashPassword(saltedPassword);

    // Compare the hashed password with the stored hash
    if (user.password !== hash) {
      helper_utils.errorResponse(ctx, 401, "Invalid password");
      return "Error";
    }

    // Return success with the user ID if it exists
    const responseBody: any = {
      success: true,
      message: "Login successful",
    };

    // Only add userId if it exists
    if (user.user_id !== undefined) {
      responseBody.userId = user.user_id;
    }

    helper_utils.sendResponse(ctx, {
      status: 200,
      body: responseBody,
    });

    return "Success";
  } catch (error) {
    console.log(error);
    helper_utils.errorResponse(ctx, 500, "Invalid request");
    return "Error";
  }
}

// +++ APP ---------------------------------------------------------- //
app.use(
  oakCors({
    origin: "*",
    credentials: true,
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());

export { app };
await app.listen({ port: 8000 });
