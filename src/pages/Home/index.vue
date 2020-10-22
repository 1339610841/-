<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
<el-aside width="200">

 <div class="LG">世豪智慧</div>
                  
 <!-- 设置这个属性   :router="true"  点击(子级列表：象1-1 等等)会跳转index指定的路径-->
 <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <qf-sub-menu  :sideMenu="sideMenu"></qf-sub-menu>
</el-menu> 

  <!-- 侧变底部 -->
  <div class="bott"></div>
</el-aside>

    <!-- 顶部栏 -->
  <el-container>
          <el-header>
             <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6"><div class="grid-content bg-purple paddin">
                <!-- 收起 -->
                  <i class="iconfont icon-shouqi1" @click="isCollapse = !isCollapse" v-if="isCollapse"></i>
                <!-- 展开 -->
                   <i class="iconfont icon-zhankai"  @click="isCollapse = !isCollapse" v-else></i>
   
                </div></el-col>

                <el-col :span="6"><div class="grid-content bg-purple-light">世豪管理系统</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                 <span class="hh"><img :src="msg" alt=""></span>
                 欢迎您：<a href="">{{userInfo.nickname}}</a>
                 <button @click="btn">退出</button>
                </div></el-col>
             </el-row>
          </el-header>
          
          <!-- 主体 -->
          <el-main>
              <router-view></router-view>
          </el-main>

       </el-container>
    </el-container>
  
  </div>
</template>
<script>
import {getLoginLog} from "../../api"
import {mapState} from "vuex"
 export default{
   data () {
     return {
       isCollapse:false,
       msg:"https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1728577482,2585850803&fm=26&gp=0.jpg"
     }
   },
   computed: {
     ...mapState(["userInfo","sideMenu"])
   },
    mounted() {//获取登陆日志
      getLoginLog()
        .then(res => {
       //   console.log(res);
        })
      

    },
    methods: {
      handleOpen(key, keyPath) {//ul
       // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {//ul
       // console.log(key, keyPath);
      },
      btn(){
        // 点击退出时把token，和用户信息本地存储删除
        // 跳转回登录页
        localStorage.removeItem("wf-token")
        localStorage.removeItem("wf-userInfo")
        this.$router.push("/login")
        // 退出的时候 刷新页面//解决页面不出现或者显示的是上一次登陆的页面，需要刷新一次
         window.location.reload()
      }
    }
 }

</script>
<style scoped>
/* 加上scoped之后样式可能看就不生效了 */
/* 主体布局 */
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
html,body,#app,.home-page,.el-container,.el-aside{
  height: 100%;
}
.el-header{
   height: 10%!important;
}
 
/*----------------------- 侧边栏样式-------------------- */
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu-vertical-demo.el-menu{
    height: 80%;
}
.LG{
  line-height: 84px;
  color:#DFDCFA;
  background:linear-gradient(135deg,#4c67ff,#5635df);
}
.bott{
  width: 100%;
  height: 9.5%;
  background-color:#5249EB ;
}











/* -----------------------------顶部栏样式--------------- */
  .el-row {
    margin-bottom: 20px;
   
  } 
  .el-row:last-child {
      margin-bottom: 0;
    }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /* 顶部栏导航样式 */
  .iconfont{
    font-size: 60px;
    color:#fff;
    position:absolute;
    top: 0;
    left: -10px;
  }
.paddin{
  margin-left:-80px
}
  .el-header{
   background-color: #5249EB;
  }
  .row-bg.el-row.is-justify-space-around.el-row--flex{
    height: 100%;
    background: none;
    padding: 0;
    line-height: 78px;
   
  }
  .el-col.el-col-6{
    height: 100%;
  }
  .grid-content.bg-purple{
    height: 100%;
  }
  .grid-content.bg-purple-light{
      height: 100%;
      font-size: 25px;
      color: #fff;
      padding-top: 5px;
    background: none;
  }
  .grid-content.bg-purple{
      font-size: 25px;
       color: #fff;
      background: none;
  }
  .hh{
   display: inline-block;
    width: 70px;
    height: 70px;
    vertical-align:middle; /*对齐*/
   
  }
  img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
</style>

