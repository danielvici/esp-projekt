// main API file. Handles all the routing/api stuff
import { Router, Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";


const router = new Router();
const app = new Application();

// Creates the routes for the API server.
// Example: localhost:8000/api will show "testAPIPoint"
// in the HTML
router
    .get("/", (ctx) => {
        ctx.response.body = "ESP Api";
    })

    .get("/api", (ctx) => {
        ctx.response.body = "testAPIPoint";
    });


app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });