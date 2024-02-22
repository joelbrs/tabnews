import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'root-login',
      children: [
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
      component: () => import('../layouts/auth-layout.vue')
    }
  ]
})

export default router
