import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home";

//解决路由导航到统一路径重复报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);




const routes = [
  {
    path: "/Login",
    name: "Login",
   component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Login/index.vue")
  
  },
  
];




const router = new VueRouter({
  routes
});

export default router;
