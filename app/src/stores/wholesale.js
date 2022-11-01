import { defineStore } from 'pinia'
import { wholesaleAPI } from '@/services/api.js'

export const useWholesaleStore = defineStore("wholesales", {
  state: () => {
    return {
      wholesales: []
    }
  },
  getters: {
    getWholesales (state) {
      return state.wholesales
    }
  },
  actions: {
    async fetch () {
        this.wholesales = await wholesaleAPI.getAll()
    },
    findByName(name) {
      var filtered = [...this.wholesales]
      return filtered.find(element => element.name == name)
    }
  }
})