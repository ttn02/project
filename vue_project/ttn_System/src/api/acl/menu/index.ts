/*
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
 */
import request from '@/utils/request'
import type { MenuParams, PermissionResponseData } from './type'

enum API {
  ALLPERMISSION_URL = '/admin/acl/permission',
  ADDMENU_URL = '/admin/acl/permission/save',
  UPDATE_URL = '/admin/acl/permission/update',
  DELETEMENU_URL = '/admin/acl/permission/remove/',
}

export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)

export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}

export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + id)
