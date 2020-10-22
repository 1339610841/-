<template>
  <div class="login-page">
    <!-- 引入视频 -->
    <video
      src="../../sp/bg_video.d2d602a9.mp4"
      autoplay
      loop
      muted
      style="width= 100%; height=100%; object-fit: fill"
    ></video>
    <h1 class="show">思豪管理系统</h1>

    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="200px"
      class="demo-loginForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('loginForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 登入逻辑的实现
// 1收集用户输入的信息username和password传递给后端
// 2登入通过后，将后端返回的token存在本地
// 3每次请求的时候，携带token
// 4展示token校验正确的数据
// 5校验不通过，跳转到登录页

// 引入请求
import { login } from "@/api";
import {mapMutations} from "vuex"

export default {
  data() {
    /** jsDoc注释
     *  参数   类型    字段
     * @param {object} rule：一个表单验证对象
     * @param {String} value:输入值
     */
    var validateusername = (rule, value, callback) => {
      //用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;

      if (!value) {
        //没有输入内容就调用callback传入参数提升
        callback("4到16位（字母，数字，下划线，减号");
      } else {
        //有内容就不传参
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { validator: validateusername, trigger: "blur" } //blur失去焦点
        ],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(['GETUSERINFO']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {//验证成功

      // 设置加载动画（开启）
       const loading = this.$loading({
          lock: true,
          text: '正在登陆',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

          console.log(this.loginForm.username, this.loginForm.password);
          let { username, password } = this.loginForm;
          //  发送登陆请求
            login(username, password)
            .then(res => {//请求成功（请求到服务器）
              console.log(res);

                this.$message.success('成功登陆');//uI

              // 只要服务器响应就关闭 加载动画
                  loading.close()
              if (res.data.state) {//请求成功//true//判断服务器里面是否注册改账号
                 //把token存入本地存储
                localStorage.setItem("wf-token", res.data.token);
                // 把用户信息存入本地存储
                 console.log(res.data.userInfo);
                 localStorage.setItem("wf-userInfo",JSON.stringify(res.data.userInfo))
                //  数据放入vuex
               this.GETUSERINFO(res.data.userInfo)
                // 跳转到首页
                this.$router.push("/Home")
                
              } else {
                  this.$message.error('用户名密码错误');//uI
              }
            })
            .catch(err => {//请求失败（没请求到服务器）
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
</style>

