// 导入基础api  axios
import axios from "../api/config"

//用户注册接口  post
export const login = (username, password) => axios({
    url: "/users/login",
    method: "post",
    data: {
        username,
        password
    }
})

// 获取日志接口 get
export const getLoginLog = () => axios.get('/getloginlog')

// 获取用户的权限 菜单
export const getMenuList = () => axios.get("/permission/getMenuList")