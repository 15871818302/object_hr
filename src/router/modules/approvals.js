import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '', // 作为默认渲染路由
      name: 'approvals',
      component: () => import('@/views/approvals/approvals.vue'),
      meta: { title: 'approvals', icon: 'tree-table' }
    }
  ]
}
