import { createRouter, createWebHistory } from "vue-router";

// Vue components imported here.
// the vue components are the Pages that will be rendered
// at these URL's.
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import wip from "../components/wip.vue";
import settings from "../components/settings.vue";
import nottifications from "../components/notifications.vue";
import register from "../components/register.vue";
import search from "../components/search.vue";
import post from '../components/posts.vue';
// The routing does not happen automatically
// Each route has to be defined here, or it won't work.
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
    },
    {
        path: "/wip",
        name: "Work in Progress",
        component: wip,
    },
    {
        path: "/settings",
        name: "Settings",
        component: settings,
    },
    {
        path: "/notifications",
        name: "Notifications",
        component: nottifications,
    },
    {
        path: "/register",
        name: "Register",
        component: register,
    },
    {
        path: "/search",
        name: "Search",
        component: search,
    },
    {
        path: '/post/:id',
        name: 'PostDetail',
        component: post,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

export default router;