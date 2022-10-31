import { defineStore } from 'pinia'
import { goldAPI } from '@/services/api.js'

export const useGoldStore = defineStore("golds", {
  state: () => {
    return {
      golds: []
    }
  },
  
  getters: {
    getGolds (state) {
      return state.golds
    }
   },

  actions: {
    async fetch () {
        this.golds = await goldAPI.getAll()
    },
    async add (gold) {
        const response = await goldAPI.saveNew(gold)
        if (response.success) {
          this.golds = await goldAPI.getAll()
          return response.gold_id
        }
	      return false
    },
    delete (id) {
      this.golds = this.golds.filter(gold => gold.id != id)
    },
    async getID(id) {
      const gold = await goldAPI.getID(id)
      return gold
    },
    filterStockByID(golds,id) {
      var filtered = [...golds]
      return filtered.filter((gold) => gold.id == id)
    },
    async edit(gold) {
      const response = await goldAPI.saveEdit(gold.id, gold)
      this.golds = await goldAPI.getAll()
    }
  },
})