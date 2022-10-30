import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoinDeskView from '@/views/CoinDeskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/coin-desk',
      name: 'coin-desk',
      component: CoinDeskView
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Test.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
	  },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/LogoutView.vue')
    },
    {
      path: '/redemption/view',
      name: 'redemption.view',
      component: () => import('@/views/gold/redemption/AllRedemptionsView.vue')
    },
    {
      path: '/redemption/edit/:id',
      name: 'redemption.edit',
      component: () => import('@/views/gold/redemption/EditRedemptionView.vue')
    },
    {
      path: '/stock/view',
      name: 'stock.view',
      component: () => import('@/views/gold/stock/AllStockView.vue')
    },
    {
      path: '/redemption/create',
      name: 'redemption.create',
      component: () => import('@/views/gold/redemption/CreateRedemptionView.vue'),
    },
    {
      path: '/sale/view',
      name: 'sale.view',
      component: () => import('@/views/gold/sale/AllSaleView.vue'),
    },
    {
      path: '/onsitesale/create',
      name: 'onsitesale.create',
      component: () => import('@/views/gold/sale/CreateOnsiteSaleView.vue'),
    },
    {
      path: '/custom_order/view',
      name: 'custom_order.view',
      component: () => import('@/views/gold/custom_order/AllCustomOrdersView.vue'),
    },
    {
      path: '/custom_order/create',
      name: 'custom_order.create',
      component: () => import('@/views/gold/custom_order/CreateCustomOrderView.vue'),
    },
    {
      path: '/custom_order/edit/:id',
      name: 'custom_order.edit',
      component: () => import('@/views/gold/custom_order/EditCustomOrderView.vue')
    },
    {
      path: '/custom_order/edit_customer/:id',
      name: 'custom_order.edit_customer',
      component: () => import('@/views/gold/custom_order/EditCustomOrderCustomerView.vue')
    },
    {
      path: '/employee/view',
      name: 'employee.view',
      component: () => import('@/views/user/EmployeeListView.vue')
    },
    {
      path: '/employee/view/create',
      name: 'employee.create',
      component: () => import('@/views/user/AddEmployeeView.vue')
    },
    {
      path: '/employee/view/edit/:id',
      name: 'employee.edit',
      component: () => import('@/views/user/EditEmployeeView.vue')
    },
    {
      path: '/user/:id/history',
      name: 'user.history',
      component: () => import('@/views/gold/user/HistoryView.vue')
    },
    {
      path: '/user/sale_status',
      name: 'user.sale_status',
      component: () => import('@/views/gold/user/UserSaleStatusView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
  ]
})


export default router
