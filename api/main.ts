// main API file. Handles all the routing/api stuff

// Due to the Language servers, the import statements are
// shown as errors, @ts-ignore is used to ignore them.
// This is a Deno file, but the Vue LSP is still
// attempting to find errors, which causes
// confusing False errors

// @ts-ignore
import { Router, Application } from "https://deno.land/x/oak/mod.ts";
// @ts-ignore
import { oakCors } from "https://deno.land/x/cors/mod.ts";


const router = new Router();
const app = new Application();

// Creates the routes for the API server.
// Example: localhost:8000/api will show "testAPIPoint"
// in the HTML
router
    .get("/", (ctx) => {
        ctx.response.body = "ESP API Site";
    })

    .get("/api", (ctx) => {
        ctx.response.body = "testAPIPoint";
    });


app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

// @ts-ignore
await app.listen({ port: 8000 });