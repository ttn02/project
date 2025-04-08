import request from '../utils/request'

export const getCode = (data) => {
    return request.post('/get/code',data)
}