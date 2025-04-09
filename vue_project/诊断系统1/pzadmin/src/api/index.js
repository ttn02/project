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
    return request.get('/auth/admin',{params})
}