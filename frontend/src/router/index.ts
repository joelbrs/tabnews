import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main',
      name: 'root-login',
      children: [
        {
          path: '/',
          name: 'relevants',
          component: () => import('../views/app/publishes/relevants-publishes.vue')
        },
        {
          path: '/recents',
          name: 'recents',
          component: () => import('../views/app/publishes/recents-publishes.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          meta: { requiresAuth: true },
          component: () => import('../views/app/user/user-profile.vue')
        },
        {
          path: '/:username',
          name: 'user-general-profile',
          meta: { requiresAuth: true },
          component: () => import('../views/app/user/index-page.vue')
        },
        {
          path: '/:username/publishes',
          name: 'user-contents',
          meta: { requiresAuth: true },
          component: () => import('../views/app/user/index-page.vue')
        },
        {
          path: '/:username/comments',
          name: 'user-comments',
          meta: { requiresAuth: true },
          component: () => import('../views/app/user/index-page.vue')
        },
        {
          path: '/publish',
          name: 'publish',
          meta: { requiresAuth: true },
          component: () => import('../views/app/publishes/create-publish.vue')
        },
        {
          path: '/sign-in',
          name: 'sign-in',
          component: () => import('../views/auth/sign-in.vue')
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          component: () => import('../views/auth/sign-up.vue')
        }
      ],
      component: () => import('../layouts/main-layout.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const $userStore = useUserStore()

  if (to.name !== 'sign-in' && to.name !== 'sign-up') {
    await $userStore.getLoggedUser()

    if (to.meta.requiresAuth && !$userStore.isLogged) {
      return { name: 'relevants' }
    }
  }

  if ((to.name === 'sign-in' || to.name === 'sign-up') && $userStore.isLogged) {
    return { name: 'relevants' }
  }
})

export default router
