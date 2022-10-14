import { defineStore } from 'pinia'
import { onsiteSaleAPI } from '@/services/api.js'

export const useOnsiteSaleStore = defineStore("onsiteSales", {
  state: () => {
    return {
      onsiteSales: []
    }
  },
  
  getters: {
    getOnsiteSales (state) {
      console.log(state.onsiteSales)
      return state.onsiteSales
    }
  },

  actions: {
    async fetch () {
        this.onsiteSales = await onsiteSaleAPI.getAll()
    },
    async add (onsiteSale) {
        const response = await onsiteSaleAPI.saveNew(onsiteSale)
        if (response.success) {
          this.onsiteSales.push({
            ...onsiteSale
          })
          return response.onsiteSale_id
        }
	    return false
    },
    delete (id) {
      this.onsiteSales = this.onsiteSales.filter(onsiteSale => onsiteSale.id != id)
    },
    // async getID(id) {
    //   const redemption = await redemptionAPI.getID(id)
    //   return redemption
    // },
    // filterRedemptionsByID(redemptions, id) {
    //   var filtered = [...redemptions]
    //   return filtered.filter((redemption) => redemption.id == id)
    // }
  }
})