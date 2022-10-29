import { defineStore } from 'pinia'
import { onsiteSaleAPI } from '@/services/api.js'
import { onlineSaleAPI } from '@/services/api.js'

export const useAllSaleStore = defineStore("all_sales", {
  state: () => {
    return {
      all_sales: []
    }
  },
  
  getters: {
    getAllSales (state) {
      return state.all_sales
    }
  },

  actions: {
    async fetch () {
        this.onsiteSales = await onsiteSaleAPI.getAll()
    },
    delete (id) {
      this.onsiteSales = this.onsiteSales.filter(onsiteSale => onsiteSale.id != id)
    },
    async getID(id) {
      const onsiteSale = await onsiteSaleAPI.getID(id)
      return onsiteSale
    },
    filterOnsiteByID(onsiteSales, id) {
      var filtered = [...onsiteSales]
      return filtered.filter((onsiteSale) => onsiteSale.id == id)
    },
    async getNextID() {
      const nextID = await onsiteSaleAPI.getNextID()
      return nextID
    }
  }
})