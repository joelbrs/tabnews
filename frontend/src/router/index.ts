import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'root-login',
      children: [
        {
          path: '/',
          name: 'relevants',
          component: () => import('../views/app/relevants/index-page.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/app/profile/index-page.vue')
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

router.beforeEach(async () => {
  const $userStore = useUserStore()

  await $userStore.getLoggedUser()
})

export default router
