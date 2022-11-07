import { defineStore } from 'pinia'
import { authAPI } from '@/services/api'

const auth_storage = {
  user: localStorage.getItem('auth.user'),
  phone: localStorage.getItem('auth.phone')
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      auth: {
        user: auth_storage.user,
        phone: auth_storage.phone,
      }
    }
  },

  getters: {
    getAuth: (state) => state.auth,
    getUser: (state) => state.auth.user,
    getPhone: (state) => state.auth.phone,

    isAuthen (state) {
      return state.auth.phone != null
    }
  },

  actions: {
    async login (phone, password) {
      if (await authAPI.login(phone, password)) {
        this.fetch()
        return true
      }
      return false
    },

    async fetch () {
      this.auth = await authAPI.me()
      localStorage.setItem('auth.phone', this.auth.phone)
      localStorage.setItem('auth.user', JSON.stringify(this.auth))
    },

    logout () {
      authAPI.logout()
      localStorage.removeItem('auth.phone')
      localStorage.removeItem('auth.user')
      this.auth = {
        phone: null,
        user: null
      }
    }
  }
})