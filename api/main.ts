/// <reference lib="deno.ns" />
/**
 * @author Esad Mustafoski
 * @ðescription Main API file, Handles all the routing/api stuff
 */

// +++ IMPORTS ------------------------------------------------------ //
import {
  Application,
  Context,
  Next,
  Router,
} from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import * as db_utils from "../database/utils.ts";
import * as helper_utils from "./helpers.ts";

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
  .get("/", (ctx) => {
    ctx.response.body = "For endpoints, use /api/{name}";
  })
  .get("/api", (ctx) => {
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

// -- Auth Routes --
router
  .get("/api/auth", () => {}) // TODO
  .get("/api/auth/verify", () => {}) // TODO
  .get("/api/auth/refresh", () => {}); // TODO

// -- User routes --
router
  .get("/api/users", api_getAllUsers)
  .get("/api/user/:id/info", api_user_getInfo);

// -- Post routes --
router
  .get("/api/posts", api_posts_getAll);


// +++ FUNCTIONS ----------------------------------------------------- //
async function authenticator(ctx: Context, next: Next): Promise<void> {
  const authHeader = ctx.request.headers.get("Authorization");

  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = { error: "No header" };
    return;
  }

  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid format" };
    return;
  }

  const token = match[1];

  try {
    // Token logic missing, not tried or attempted yet.
    await next();
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid token" };
  }
}

async function tokenChecker(ctx: Context, next: Next): Promise<void> {
  // logic below (TODO):
  /**
   * 1. check if the token is valid
   * 2. if valid, set the user in the context
   * 3. if not valid, return 401
   * 4. if: token missing, expired, blacklisted, !DB, !user or !correct user, return 401 with associated error
   * eg: wrong user: 401 -> "Token not associated with this user"
   */
}

async function api_getAllUsers(ctx: Context): Promise<void> {
  const getUsers = await db_utils.getAllUsersFromDB();
  ctx.response.body = getUsers;
}

// Users
async function api_user_getInfo(ctx: any): Promise<void> {
  const id = ctx.params.id;

  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { error: "User ID required" };
    return;
  }

  try {
    const user = await db_utils.getAllUserInfoByID(id);
    if (user === null || user === undefined) {
      helper_utils.errorResponse(ctx, 404, "User not found");
      return;
    }

    ctx.response.body = user;
  } catch (error) {
    helper_utils.errorResponse(ctx, 500, error as string);
  }
}

// Posts
async function api_posts_getAll(ctx: Context): Promise<void> {
  const posts = await db_utils.getPostsFromDB();
  ctx.response.body = posts;
}

// Comments (missing)

// login/register
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
    const account_created = `${Math.floor(Date.now() / 1000)}-${
      new Date().toLocaleDateString("en-GB").split("/").join("-")
    }`;

    if (
      !username || !password || !userGroup || !displayname || !user_email ||
      !firstname || !surname
    ) {
      helper_utils.errorResponse(ctx, 400, "Missing required fields");
      return;
    }

    // First salt the password
    const { saltedPassword, salt } = await helper_utils.saltPassword(password);
    // Then hash the salted password
    const hash = await helper_utils.hashPassword(saltedPassword);

    const userId = await db_utils.registerUser(
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

    helper_utils.sendResponse(ctx, {
      status: 200,
      body: `Registered under name: ${userId}`,
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

    // Get the stored salt for this user
    const storedSalt = user.password_salt;
    // Salt the provided password with the stored salt
    const saltedPassword = `${password}${storedSalt}`;
    // Hash the salted password
    const hash = await helper_utils.hashPassword(saltedPassword);

    // Compare with stored hash
    if (user.password !== hash) {
      helper_utils.errorResponse(ctx, 401, "Invalid password");
      return "Error";
    }

    helper_utils.sendResponse(ctx, { status: 200, body: "Success" });
    return "Success";
  } catch (error) {
    console.log(error);
    helper_utils.errorResponse(ctx, 500, "Invalid request");
    return "Error";
  }
}

// +++ APP ---------------------------------------------------------- //
app.use(oakCors({
  origin: "*",
  credentials: true,
}));
app.use(router.routes());
app.use(router.allowedMethods());

export { app };
await app.listen({ port: 8000 });
