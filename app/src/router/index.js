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
      name: 'redemptions.view',
      component: () => import('@/views/gold/redemption/AllRedemptionsView.vue'),
    },
    {
      path: '/redemption/edit/:id',
      name: 'redemptions.edit',
      component: () => import('@/views/gold/redemption/EditRedemptionView.vue'),
    },
    {
      path: '/redemption/create',
      name: 'redemptions.create',
      component: () => import('@/views/gold/redemption/CreateRedemptionView.vue'),
    }
  ]
})


export default router
