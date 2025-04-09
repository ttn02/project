import request from '../utils/request'

export const getCode = (data) => {
    return request.post('/get/code',data)
}

// 注册用户
export const userAuthentication = (data) => {
    return request.post('/user/authentication',data)
}

// 登录
export const login = (data) => {
    return request.post('/login',data)
}

// 权限管理列表,该接口需要传入pageNum和pageSize参数,同时需要携带token
export const authAdmin = (params) => {
    // params传入一个对象，包含两个参数
    return request.get('/auth/admin',{params})
}

// 菜单权限数据,该接口不需要传入参数,同时需要携带token
export const userGetMenu = () => {
    return request.get('/user/getMenu')
}

// 菜单权限的修改,该接口需要传入name、permissions和id三个参数,同时需要携带token
export const userSetMenu = (data) => {
    return request.post('/user/setmenu',data)
}

// 获取菜单权限列表
export const menuList = (params) => {
    // params传入一个对象，包含两个参数
    return request.get('/menu/list',{params})
}