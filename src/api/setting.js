import request from '@/utils/request'

// 获取员工列表
export function getStaffList(params) {
  return request({
    url: '/sys/role',
    params: params
  })
}

// 添加角色
export function addStaff(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

// 更新角色
export function updateStaff(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

// 删除角色
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

// 获取角色权限点列表
export function getPermission() {
  return request({
    url: '/sys/permission'
  })
}

// 获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 给角色分配权限
export function assignPermission(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
