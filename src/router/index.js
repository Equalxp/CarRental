import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import('../views/index'),
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/user')
      },
      {
        path: '/safe',
        name: 'Safe',
        component: () => import('../views/safe/index')
      },
      {
        path: '/password',
        name: 'Password',
        meta: {
          title: "重置密码"
        },
        component: () => import('../views/safe/password.vue')
      },
      // 设置资金密码
      {
        path: "/capital",
        name: "Capital",
        meta: {
          title: "设置资金密码"
        },
        component: () => import("../views/safe/capital")
      },
      // 绑定银行卡
      {
        path: "/bank",
        name: "Bank",
        meta: {
          title: "绑定银行卡"
        },
        component: () => import("../views/safe/bank")
      },
      // 绑定银行卡
      {
        path: "/bankAdd",
        name: "BankAdd",
        meta: {
          title: "添加银行卡"
        },
        component: () => import("../views/safe/bankAdd")
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
