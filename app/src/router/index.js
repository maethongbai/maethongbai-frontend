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
      path: '/allstock/view',
      name: 'allstock.view',
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
      path: '/user/:id/history',
      name: 'user.history',
      component: () => import('@/views/gold/user/HistoryView.vue')
    },
    {
      path: '/stock/create',
      name: 'stock.create',
      component: () => import('@/views/gold/stock/CreateStockView.vue')
    },
    {
      path: '/stock/edit/:id',
      name: 'stock.edit',
      component: () => import('@/views/gold/stock/EditStockView.vue')
    },
    {
      path: '/stock/view',
      name: 'stock.view',
      component: () => import('@/views/gold/stock/StockView.vue')
    },
    {
      path: '/custom_order_worker/view',
      name: 'custom_order_worker.view',
      component: () => import('@/views/gold/custom_order_worker/CustomOrderWorkerView.vue')
    },
    {
      path: '/custom_order_worker/create',
      name: 'custom_order_worker.create',
      component: () => import('@/views/gold/custom_order_worker/AddCustomOrderWorkerView.vue')
    },
    {
      path: '/custom_order/edit_worker/:id',
      name: 'custom_order_worker.edit',
      component: () => import('@/views/gold/custom_order_worker/EditCustomOrderWorkerView.vue')
    },
    {
      path: '/gold_pattern/view',
      name: 'gold_pattern.view',
      component: () => import('@/views/gold/pattern/GoldPatternView.vue')
    },
    {
      path: '/gold_pattern/create',
      name: 'gold_pattern.create',
      component: () => import('@/views/gold/pattern/AddGoldPatternView.vue')
    },
    {
      path: '/gold_pattern/edit/:id',
      name: 'gold_pattern.edit',
      component: () => import('@/views/gold/pattern/EditGoldPatternView.vue')
    },
    {
      path: '/gold_type/view',
      name: 'gold_type.view',
      component: () => import('@/views/gold/type/GoldTypeView.vue')
    },
    {
      path: '/gold_type/create',
      name: 'gold_type.create',
      component: () => import('@/views/gold/type/AddGoldTypeView.vue')
    },
    {
      path: '/gold_type/edit/:id',
      name: 'gold_type.edit',
      component: () => import('@/views/gold/type/EditGoldTypeView.vue')
    },
    {
      path: '/wholesale/view',
      name: 'wholesale.view',
      component: () => import('@/views/gold/wholesale/WholesaleView.vue')
    },
    {
      path: '/wholesale/create',
      name: 'wholesale.create',
      component: () => import('@/views/gold/wholesale/AddWholesaleView.vue')
    },
    {
      path: '/wholesale/edit/:id',
      name: 'wholesale.edit',
      component: () => import('@/views/gold/wholesale/EditWholesaleView.vue')
    },
  ]
})


export default router
