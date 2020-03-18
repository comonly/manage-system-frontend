/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const stockRouter = {
  path: '/stock',
  component: Layout,
  redirect: '/stock/individual',
  name: 'Table',
  meta: {
    title: 'stock',
    icon: 'table',
    roles: ['admin']
  },
  children: [
    {
      path: 'individual/',
      component: () => import('@/views/stock/individual/individual'),
      name: 'individual',
      meta: { title: '个股分析' }
    },
    {
      path: 'industry',
      component: () => import('@/views/stock/industry/industry'),
      name: 'industry',
      meta: { title: '行业管理' }
    }
  ]
}
export default stockRouter
