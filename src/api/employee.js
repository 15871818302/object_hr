import request from '@/utils/request'

// 获取部门负责人信息
export function getManagerList() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}

// 获取员工列表
export function getEmployeeList(page, size) {
  return request({
    methods: 'get',
    url: '/sys/user',
    params: { page, size }
  })
}
