import request from '@/utils/request'

// 查询部门列表
export function getDepartmentList() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

// 新增部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 删除部门
export function deleteDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
