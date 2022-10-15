import { defineStore } from 'pinia'
import { onlineSaleAPI } from '@/services/api.js'

export const useOnlineSaleStore = defineStore("onlineSales", {
  state: () => {
    return {
      onlineSales: []
    }
  },
  
  getters: {
    getOnlineSales (state) {
      console.log(state.onlineSales)
      return state.onlineSales
    },

    getTrackingEmployee (state) {
        console.log(state.onlineSales.)
        return state.onlineSales.
    }

  },

  actions: {
    async fetch () {
        this.onlineSales = await onlineSaleAPI.getAll()
    },
    async add (onlineSale) {
        const response = await onlineSaleAPI.saveNew(onlineSale)
        if (response.success) {
          this.onlineSales.push({
            ...onlineSale
          })
          return response.onlineSale_id
        }
	    return false
    },
    delete (id) {
      this.onlineSales = this.onlineSales.filter(onlineSale => onlineSale.id != id)
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