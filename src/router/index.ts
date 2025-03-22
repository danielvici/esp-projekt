// File: `src/router/index.ts`
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import wip from "../components/wip.vue";
import settings from "../components/settings.vue";
import notifications from "../components/notifications.vue";
import register from "../components/register.vue";
import search from "../components/search.vue";
import post from "../components/posts.vue";
import profile from "../components/profile.vue";
import messages from "../components/messages.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/wip",
        name: "Work in Progress",
        component: wip,
        meta: { requiresAuth: true }
    },
    {
        path: "/settings",
        name: "Settings",
        component: settings,
        meta: { requiresAuth: true }
    },
    {
        path: "/notifications",
        name: "Notifications",
        component: notifications,
        meta: { requiresAuth: true }
    },
    {
        path: "/register",
        name: "Register",
        component: register
    },
    {
        path: "/search",
        name: "Search",
        component: search,
        meta: { requiresAuth: true }
    },
    {
        path: "/post/:id",
        name: "PostDetail",
        component: post,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: "/profile/:username",
        name: "Profile",
        component: profile,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: "/messages",
        name: "Messages",
        component: messages,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && localStorage.getItem("isLoggedIn") !== "true") {
        console.log("User not logged in: redirecting to login.");
        next({ name: "login" });
    } else {
        console.log("User logged in or no auth required.");
        next();
    }
});

export default router;