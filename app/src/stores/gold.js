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
    },
    // sortByPoint (state) {
    //   const sortable = [...state.golds]
    //   return sortable.sort((a, b) => {
    //     return a.point - b.point
    //   })
    // },
	// 	sortByName (state) {
	// 		const sortable = [...state.rewards]
	// 		return sortable.sort((a, b) => {
    //     return (a.name).localeCompare(b.name)
    //   })
    // }
  },

  actions: {
    async fetch () {
        this.golds = await goldAPI.getAll()
    },
    async add (gold) {
        const response = await goldAPI.saveNew(gold)
        if (response.success) {
          this.golds.push({
            ...gold
          })
          return response.gold_id
        }
	      return false
    },
    delete (id) {
      this.golds = this.golds.filter(gold => gold.id != id)
    }
  },
})