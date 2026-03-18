/**
 * Vue Router 配置
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首页 - 历史战役百科'
    }
  },
  {
    path: '/category/:era',
    name: 'category',
    component: () => import('@/views/CategoryView.vue'),
    meta: {
      title: '分类 - 历史战役百科'
    }
  },
  {
    path: '/battle/:slug',
    name: 'battle-detail',
    component: () => import('@/views/BattleDetailView.vue'),
    meta: {
      title: '战役详情 - 历史战役百科'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// 路由守卫：更新页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '历史战役百科'
  next()
})

export default router
