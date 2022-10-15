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
      // console.log(gold)
        const response = await goldAPI.saveNew(gold)
        if (response.success) {
          // this.golds.push({
          //   ...gold
          // })
          this.golds = await goldAPI.getAll()
          // console.log(response)
          return response.gold_id
        }
	      return false
    },
    delete (id) {
      this.golds = this.golds.filter(gold => gold.id != id)
    }
  },
})