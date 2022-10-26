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
        return state.onlineSales
    },
    filterDelivery (state) {
      var filtered = [...state.onlineSales]
      return filtered.filter((onlineSale) => onlineSale.delivery_status == "จัดส่งสำเร็จ")
    },
    filterNotDelivery (state) {
      var filtered = [...state.onlineSales]
      return filtered.filter((onlineSale) => onlineSale.delivery_status != "จัดส่งสำเร็จ")
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
    async getID(id) {
      const onlineSale = await onlineSaleAPI.getID(id)
      return onlineSale
    },
    filterOnlineByID(onlineSales, id) {
      var filtered = [...onlineSales]
      return filtered.filter((onlineSale) => onlineSale.id == id)
    },
    async getNextID() {
      const nextID = await onlineSaleAPI.getNextID()
      return nextID
    }
  }
})