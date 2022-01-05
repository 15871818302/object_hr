import request from '@/utils/request'

// 获取部门负责人信息
export function getManagerList() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}
