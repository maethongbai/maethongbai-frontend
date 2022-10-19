import { defineStore } from 'pinia'
import { goldPriceAPI } from '@/services/api.js'

export const useGoldPriceStore = defineStore("gold_prices", {
  state: () => {
    return {
      gold_prices: []
    }
  },
  getters: {
    getGoldPrices (state) {
      return state.gold_prices
    }
  },
  actions: {
    async fetch () {
      this.gold_prices = await goldPriceAPI.getAll()
    },
    async getLast() {
      var last = await goldPriceAPI.getLast()
      // console.log(last)
      return last
    }
  }
})