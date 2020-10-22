// 定义基础的api





// 引入axios
import axios from "axios"
// 引入router
import router from "../router"
// 引入element-ui
import ElementUI from "element-ui"
//定义服务器的基础地址
//axios.defaults.baseURL = "/api"
// 判断环境是否是开发环境 是就/api 不是就变会原地址
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? "/api" : "http://www.chst.vip"

// 定义默认携带认证,这句话开启之后,才可以将浏览器的cookie携带给服务器,服务器也可以对浏览器进行cookie设置
axios.defaults.withCredentials = true



// 创建请求拦截器， 可以给每个请求都携带上想要传递的内容
//能够拦截所有请求
axios.interceptors.request.use(config => { //   config就是我们的每个请求对象
    //给headers（请求头）添加一个属性，把token携带过去
    //登陆页是不需要携带token的 ，所有判断当地址是登录页地址时直接放行
    //登入&注册是不需要携带token
    if (config.url == "/users/login") {
        return config
    } else {//不是登陆页时需要携带token
        let token = localStorage.getItem('wf-token')
        //config值的是每个请求对象
        config.headers['authorization'] = token;
        //放行
        return config//  放开请求直接retuen就可以了
    }

})


// 响应式拦截//服务器响应请求被拦截
axios.interceptors.response.use(config => {
    // console.log(config.data.code);
    let { data } = config//获取登陆状态

    if (data.code == "1004" || data.code == "10012") {
        //在当前的后台1004是后端定的状态码（不固定）代表校验失败，
        //10012表示session到期失效，提升错误，并且让页面跳转到登录页。
        ElementUI.Message.error("'登入信息失效，请重新登入'")//ui样式
        localStorage.removeItem("wf-token")//后期优化//解决死循环
        router.push('/login')//在上面引入router经行跳转回到登录页

        window.location.reload()//后期优化//刷新页面
    }
    return config
})

// 设置请求事件//超过4秒就不能访问了
axios.create({
    timeout: 4000
})

//导出axios
export default axios