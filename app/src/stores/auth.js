import { defineStore } from 'pinia'
import { authAPI } from '@/services/api'

const auth_storage = {
  phone: localStorage.getItem('auth.phone')
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      auth: {
        phone: auth_storage.phone,
      }
    }
  },

  getters: {
    getAuth: (state) => state.auth,

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
    },

    logout () {
      authAPI.logout()
      localStorage.removeItem('auth.phone')
      this.auth = {
        phone: null,
      }
    }
  }
})