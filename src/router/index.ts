import { createRouter, createWebHistory } from "vue-router";

// Vue components imported here.
// the vue components are the Pages that will be rendered
// at these URL's.
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";

// The routing does not happen automatically
// Each route has to be defined here, or it wont work.
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    }
]

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

export default router;