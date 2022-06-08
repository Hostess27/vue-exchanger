import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: routes.name,
      component: () => import("@/vue/pages/MainPage.vue"),
      props: true,
    },
    {
      path: "/success",
      name: routes.success.name,
      component: () => import("@/vue/pages/SuccesPage.vue"),
      props: true,
    },
  ],
});
export default router
