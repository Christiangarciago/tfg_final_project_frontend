
//import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";
//import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import UploadPhoto from "../views/UploadPhoto.vue";
import Login from "../views/LogIn.vue";

//Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/upload", name: "UploadPhoto", component: UploadPhoto },
  { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;