import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/login/LoginView";
import addView from "../views/addView/AddRecord";
import DetailInfo from "../views/homePage/DetailInfo";
import ChartInfo from "../views/homePage/ChartInfo";
import ForumInfo from "../views/homePage/ForumInfo";
import PersonSet from "../views/homePage/PersonSet";
import assetsPage from "../views/detailView/assetsPage";
import billPage from "../views/detailView/billPage";
import budgetPage from "../views/detailView/budgetPage";
import morePage from "../views/detailView/morePage";
import billDetail from "../views/detailView/billDetail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "/",
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
    path: "/assetsPage",
    name: "assetsPage",
    component: assetsPage,
  },
  {
    path: "/billPage",
    name: "billPage",
    component: billPage,
  },
  {
    path: "/budgetPage",
    name: "budgetPage",
    component: budgetPage,
  },
  {
    path: "/morePage",
    name: "morePage",
    component: morePage,
  },
  {
    path: "/billDetail",
    name: "billDetail",
    component: billDetail,
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

// 获取原型对象push函数
const originalPush = VueRouter.prototype.push;

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace;

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

export default router;
