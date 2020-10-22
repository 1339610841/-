// 根据服务器用户返回的menuList数据去和allRoutes经行匹配得到符合当前用户的有效路由配置
// 封装递归方法  经行对比
/**注释
 * @param {Array} allRoutes 用户的有效的完整路由
 * @param {Array} menuList 服务器返回的用户菜单名字
 */
import allRoutes from ".././router/allRoutes"
// 封装递归方法  经行对比
const recursionRoutes = (allRoutes,menuList) => {
    let userRoutes = []
    allRoutes.forEach(item => {
        menuList.forEach(v => {
            if (item.meta.name === v.name) {
                if (v.children && v.children.length > 0) {
                    item.children = recursionRoutes(item.children, v.children)
                }
                userRoutes.push(item)
            }
        })
    })
    return userRoutes
}
// 手动添加数据 测试一下
// let menuList = [
//     {
//         "name":"管理首页"
//     },
//     {
//         "name":"学员管理",
//         "children":[
//             {
//                 "name":"学员项目管理"
//             }
//         ]
//     },
//     {
//         "name":"我的中心"
//     }
// ]
// 调用方法
//console.log(recursionRoutes(allRoutes,menuList));

// 没问题之后导出方法
export default recursionRoutes