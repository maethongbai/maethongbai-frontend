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
    },
    filterChecking (state) {
      var filtered = [...state.onsiteSales]
      return filtered.filter((onsiteSale) => onsiteSale.transfer_status == "ยังไม่ได้ตรวจสอบ")
    },
    filterProbleum (state) {
      var filtered = [...state.onsiteSales]
      return filtered.filter((onsiteSale) => onsiteSale.transfer_status == "มีปัญหา")
    },
    filterConfirm (state) {
      var filtered = [...state.onsiteSales]
      return filtered.filter((onsiteSale) => onsiteSale.transfer_status == "ยืนยัน")
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
    async getID(id) {
      const onsiteSale = await onsiteSaleAPI.getID(id)
      return onsiteSale
    },
    filterRedemptionsByID(onsiteSales, id) {
      var filtered = [...onsiteSales]
      return filtered.filter((onsiteSale) => onsiteSale.id == id)
    },
    async getNextID() {
      const nextID = await onsiteSaleAPI.getNextID()
      return nextID
    }
  }
})