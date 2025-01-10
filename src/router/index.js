
//import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";
//import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import UploadPhoto from "../views/UploadPhoto.vue";
import Login from "../views/LogIn.vue";
import PhotoDetail from "../views/PhotoDetail.vue";
import CreateUser from "@/views/CreateUser.vue";
import EditUserInfo from "@/views/EditUserProfile.vue";
import UserProfile from "@/views/UserProfile.vue";
import AlbumsView from "@/views/AlbumsView.vue";
import CreateAlbum from "@/views/CreateAlbums.vue";
import AlbumContent from "@/views/AlbumContent.vue";
import { useSession } from "../store/user";

//Vue.use(VueRouter);

const routes = [
  { path: "/", name: "HomeView", component: Home, meta: { requiresAuth: true } },
  { path: "/upload", name: "UploadPhoto", component: UploadPhoto, meta: { requiresAuth: true } },
  { path: "/login", name: "Login", component: Login },
  { path: "/photoDetail/:id", name: "PhotoDetail", component: PhotoDetail, meta: { requiresAuth: true } },
  { path : "/createUser", name: "CreateUser", component: CreateUser },
  { path: "/userProfile", name: "UserProfile", component: UserProfile, meta: { requiresAuth: true } },
  { path: "/editUserData", name: "EditUserData", component: EditUserInfo, meta: { requiresAuth: true } },
  { path: "/albums", name: "AlbumsView", component: AlbumsView, meta: { requiresAuth: true } },
  { path: "/createAlbum", name: "CreateAlbum", component: CreateAlbum, meta: { requiresAuth: true } },
  { path: "/albumContent/:id", name: "AlbumContent", component: AlbumContent, meta: { requiresAuth: true } },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});



router.beforeEach((to, from, next) => {
  const userPinia = useSession();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userPinia.logged) {
      if(to.name !== 'Login'){
        next({ name: 'Login' });
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});



export default router;