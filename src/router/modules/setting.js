/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'


const settingRouter ={
  path: '/setting',
  //hidden: true,
  component: Layout,
  redirect: '/stock/individual',
  name: 'Setting',
  meta: {
    title: 'setting',
    icon: 'edit'
  },
  children: [
    {
      path: 'them',
      component: () => import('@/views/setting/theme/index'),
      name: 'Theme',
      meta: { title: 'Theme', icon: 'theme' }
    },
    {
      path: 'guide',
      component: () => import('@/views/setting/guide/index'),
      name: 'Guide',
      meta: { title: 'Guide', icon: 'guide', noCache: true }
    },
    {
      //可能是路由使用的，不能删掉
      path: '/redirect/:path(.*)',
      component: () => import('@/views/setting/redirect/index')
    },
    {
      path: '/error',
      //hidden: true,
      component: Layout,
      redirect: 'noRedirect',
      name: 'ErrorPages',
      meta: {
        title: 'Error Pages',
        icon: '404'
      },
      children: [
        {
          path: '401',
          component: () => import('@/views/setting/error-page/401'),
          name: 'Page401',
          meta: { title: '401', noCache: true }
        },
        {
          path: '404',
          component: () => import('@/views/setting/error-page/404'),
          name: 'Page404',
          meta: { title: '404', noCache: true }
        }
      ]
    },
    {
      path: 'log',
      component: () => import('@/views/setting/error-log/index'),
      name: 'ErrorLog',
      meta: { title: 'Error Log', icon: 'bug' }
    },
    {
      path: 'documentation',
      component: () => import('@/views/setting/documentation/index'),
      name: 'Documentation',
      meta: { title: 'Documentation', icon: 'documentation'}
    }
  ]
}


export default settingRouter
