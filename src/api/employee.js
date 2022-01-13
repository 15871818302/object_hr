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

// 新增员工
export function addStaff(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

// 批量添加员工
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

// 获取员工基本信息
export function getEmployeeInfo(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// 保存员工基本信息
export function saveEmployeeInfo(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
