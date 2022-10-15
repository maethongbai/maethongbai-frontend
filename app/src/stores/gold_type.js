import { defineStore } from 'pinia'
import { goldTypeAPI } from '@/services/api.js'

export const useGoldTypeStore = defineStore("gold_types", {
  state: () => {
    return {
      gold_types: []
    }
  },
  getters: {
    getGoldTypes (state) {
      return state.gold_types
    }
  },
  actions: {
    async fetch () {
        this.gold_types = await goldTypeAPI.getAll()
    },
    findByName(name) {
      var filtered = [...this.gold_types]
      return filtered.find(element => element.name == name)
    }
  }
})