// Just a mock data

export const constantRoutes = [
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: 'views/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/stock',
    component: 'layout/Layout',
    redirect: '/stock/individual',
    meta: {
      title: 'stock',
      icon: 'table',
      roles: ['admin']
    },
    children: [
      {
        path: 'individual',
        component: 'views/stock/individual/individual',
        name: 'individual',
        meta: { 
          title: '个股分析',
          roles: ['admin'] 
        }
      },
      {
        path: 'drag-table',
        component: 'views/stock/individual copy',
        name: 'DragTable',
        meta: { title: '表格测试' }
      }
    ]
  }

]
