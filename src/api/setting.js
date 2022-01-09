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
