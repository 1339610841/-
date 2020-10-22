import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入css文件
import "./assets/styles/base.css"
import "./assets/styles/el-rest.css"
// 引入iconfont
import '../src/assets/iconfont/iconfont.css'

//引入 整个 ElementUI 外部资源
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;

// 引入subMenu组件(侧边栏渲染插件)
import qfSubMenu from "qf-sub-menu"

//引入 整个 ElementUI
Vue.use(ElementUI);
// 全局注册subMenu
Vue.use(qfSubMenu)
//按需 引入（减少体积）
//import { CarouselItem, Carousel} from "element-ui"

//按需  注册引入的组件
// Vue.component("el-carousel",Carousel)
// Vue.component("el-carousel-item",CarouselItem)



// 路由前置钩子(全局的)（导航守卫）
// to:去哪里(对象)
// from:从哪来(对象)
// next:放行
//不放行，页面视图加载不出来 // next()放行
router.beforeEach((to, from, next) => {
  //用户登入之后，localStorage中有token
  //拿下来
  let token = localStorage.getItem("wf-token");
  // 判断
  if (token) {//有token
    //判断是否有路由
    if (store.state.sideMenu.length == 0) {//数组长度为0,说明没有
      //说明没有用户路由,触发action获取用户路由
      store.dispatch('FETCH_MENULIST')
        .then(() => {
          next({ path: to.path })//这句是固定语法//这里要注意, next里面要传参数即要进入的页面的路由信息，因为next传参数后，当前要进入的路由会被废止，转而进入参数对应的路由，虽然是同一个路由，这么做主要是为了确保addRoutes生效了。
        })
    } else {
      next()
    }


  } else {//没token//访问的不是登录页，就要跳转到登录页
    if (to.path === "/login") {//去登录页可以放行
      next()
    } else {
      next({ path: "/login" })//不去也让他去登陆（自动跳到登陆）
    }
  }
})



// 调试
import "./utils/recursionRoutes.js"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
