import { defineStore } from 'pinia'
import { customOrderWorkerAPI } from '@/services/api.js'

export const useCustomOrderWorkerStore = defineStore("custom_order_workers", {
  state: () => {
    return {
      custom_order_workers: []
    }
  },
  getters: {
    getCustomOrderWorkers (state) {
      return state.custom_order_workers
    }
  },
  actions: {
    async fetch () {
        this.custom_order_workers = await customOrderWorkerAPI.getAll()
    },
    findByName(name) {
      var filtered = [...this.custom_order_workers]
      return filtered.find(element => element.name == name)
    }
  }
})