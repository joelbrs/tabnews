import type { User } from '@/@types'
import { useNotify } from '@/plugins/toast-notify'
import { UsersApi } from '@/services'
import { defineStore } from 'pinia'

const $notify = useNotify()

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | User,
    isLogged: false
  }),
  actions: {
    async getLoggedUser() {
      const { data, error } = await UsersApi.getLoggedUser()

      if (error) return $notify.error(error)

      this.user = data
      this.isLogged = true
    },
    async signIn(form: Object) {
      const { error } = await UsersApi.signIn(form)

      if (error) return $notify.error(error)

      $notify.ok()
      this.isLogged = true
    },
    async signUp(form: Object) {
      const { error } = await UsersApi.signUp(form)

      if (error) return $notify.error(error)

      $notify.ok()
    },
    async updateProfile(form: Object) {
      const { error } = await UsersApi.updateUser(form)

      if (error) return $notify.error(error)

      $notify.ok()
      await this.getLoggedUser()
    }
  }
})
