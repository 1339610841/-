import Vue from "vue";
import Vuex from "vuex";
// 引入获取菜单列表接口
import { getMenuList } from "@/api";


// 引入 allRoutes（全部路由）
import allRoutes from "../router/allRoutes"
// 引入动态路由
import dynamicRoutes from "../router/dynamicRoutes "
//引入递归方法（对比）
import recursionRoutes from "../utils/recursionRoutes"
// 引入router
import router from "../router"

Vue.use(Vuex);

// 刷新页面会丢失用户信息 ，所有要从localStorage中取
let userInfo = localStorage.getItem("wf-userInfo") || '{}'
 userInfo = JSON.parse(userInfo)

export default new Vuex.Store({
  state: {
    userInfo,
    sideMenu:[]//定义用户侧边栏菜单
  },
  mutations: {
//得到本地存储用户数据
   GETUSERINFO(state,payload){
        state.userInfo = payload
    },

    SET_MENULIST(state,payload){//接收到 对比过的权限菜单传给sideMenu
       state.sideMenu = payload
        // console.log(sideMenu);
       //将菜单数据添加到动态路由 dynamicRoutes里面，
        let target = dynamicRoutes.find(item => item.path === "/")
        target.children = [...state.sideMenu]
       // console.log(dynamicRoutes);//动态路由 配置到最大的router里面
        // 将动态路由添加到route中 ，核心方法： router.addRoutes(符合路由配置规则的数据)
          router.addRoutes(dynamicRoutes)
      }
  },
  actions: {
//1发送请求，获取用户菜单数据
async FETCH_MENULIST({commit}){//
  // 2通过请求回来的用户菜单数据和allRoutes经行对比，将结果提交给mutations里面的SET_MENULIST方法，来改变state里面sideMenu的数据
  // async await 把异步变成同步  等待返回的结果
      let userMenu = await getMenuList()
      console.log(userMenu);//得到菜单数据//对象
// 对比时我们需要传入的是数组，所有我们把userMenu里面的数组点（菜单数据）出来经行对比
      let sideMenu = recursionRoutes(allRoutes,userMenu.data.menuList)//对比//用一个变量接收对比结果（每个用户的权限菜单）
      //console.log(sideMenu);//得到对比后的权限菜单数据
  // 3把数据提交给mutation
  commit("SET_MENULIST",sideMenu)
    }
},
  modules: {}
});
