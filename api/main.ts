// main API file. Handles all the routing/api stuff

// Due to the Language servers, the import statements are
// shown as errors, @ts-ignore is used to ignore them.
// This is a Deno file, but the Vue LSP is still
// attempting to find errors, which causes
// confusing False errors

// +++ IMPORTS ------------------------------------------------------ //
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import * as db_utils from "../database/utils.ts";

// +++ VARIABLES ---------------------------------------------------- //
const router = new Router();
const app = new Application();


// +++ ROUTER ------------------------------------------------------- //
// Creates the routes for the API server.
// Example: localhost:8000/api will show "testAPIPoint"
// in the HTML
router
    .get("/", (ctx) => {
        ctx.response.body = "ESP API Site";
    })
    .get("/api", (ctx) => {
        ctx.response.body = "testAPIPoint";
    })
    .get("/api/users", (ctx) => {
        ctx.response.body = "Info from all users here"; //getAllUsers();
    })
    .get("/api/posts", async (ctx) => {
        const getPosts = await db_utils.getPostsFromDB();
        const countedPosts = await db_utils.countPosts();
        ctx.response.body = { getPosts, countedPosts };
    });

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

// @ts-ignore: start app
await app.listen({ port: 8000 });
