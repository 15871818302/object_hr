import request from '@/utils/request'

// 查询部门列表
export function getDepartmentList() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}
