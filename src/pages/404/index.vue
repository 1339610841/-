<template>
    <div>
        <h1 >404</h1>
        <template>
  <div class="home-page">
    <el-carousel :interval="2000" type="card" height="700px">
      <el-carousel-item v-for="item in msg" :key="item">
        <h3 class="medium"><img :src="item" alt=""></h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

    </div>
</template>
<script>
import {getLoginLog} from "../../api"
 export default{
   data () {
     return {
       msg:[
         "https://wx1.sinaimg.cn/mw690/93d7f609ly1gjnprwaekvj20n01dub29.jpg",
         " https://wx2.sinaimg.cn/mw690/93d7f609ly1gjgp4r6yj6j20u0140qv5.jpg",
         "https://wx1.sinaimg.cn/mw690/93d7f609ly1gj6h2ewwx2j22802yoqvi.jpg",
       "  https://wx3.sinaimg.cn/mw690/93d7f609ly1gi13ws470yj22802yoe8d.jpg",
       "https://wx1.sinaimg.cn/mw690/93d7f609ly1ge69qwuijyj21u839shdx.jpg"
       ]
     }
   },
    mounted() {
      getLoginLog()
        .then(res => {
          console.log(res);
        })
    }
 }

</script>
<style scoped>
/* 加上scoped之后样式可能看就不生效了 */

</style>