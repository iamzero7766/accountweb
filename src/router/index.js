import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/login/LoginView";
import addView from "../views/addView/AddRecord";
import DetailInfo from "../views/homePage/DetailInfo";
import ChartInfo from "../views/homePage/ChartInfo";
import ForumInfo from "../views/homePage/ForumInfo";
import PersonSet from "../views/homePage/PersonSet";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
<<<<<<< HEAD
    name: "/",
=======
    name: "LoginView",
>>>>>>> d218ca58b74637f76bfbaf38cc49f3eb48481e63
    component: LoginView,
  },
  {
    path: "/LoginView",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/addView",
    name: "addView",
    component: addView,
  },
  {
    path: "/HomeView",
    name: "HomeView",
    component: HomeView,
    children: [
      {
        path: "/DetailInfo",
        name: "DetailInfo",
        component: DetailInfo,
      },
      {
        path: "/ChartInfo",
        name: "ChartInfo",
        component: ChartInfo,
      },
      {
        path: "/ForumInfo",
        name: "ForumInfo",
        component: ForumInfo,
      },
      {
        path: "/PersonSet",
        name: "PersonSet",
        component: PersonSet,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path != "/LoginView") {
    if (localStorage.getItem("userKey")) {
      next();
    } else {
      next({ name: "LoginView" });
    }
  }
  next();
});

export default router;
