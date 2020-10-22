// 定义动态路由
import Home from "../pages/Home"
const  dynamicRoutes = [
     {
        path: "/",
        component:Home,
        children:[]
      },
      {
        path: "*",
        component: () =>
          import(/* webpackChunkName: "about" */ "../pages/404/index.vue")
      }
]
export default dynamicRoutes