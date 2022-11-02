import { defineStore } from 'pinia'
import { onlineSaleAPI } from '@/services/api.js'

export const useOnlineSaleStore = defineStore("onlineSales", {
  state: () => {
    return {
      onlineSales: [],
      filterSales: []
    }
  },
  
  getters: {
    getOnlineSales (state) {
      // console.log(state.onlineSales)
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
    },
    filterAccept (state) {
      var filtered = [...state.onlineSales]
      return filtered.filter((onlineSale) => onlineSale.transfer_status == "ยืนยัน")
    },
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
    },
    filterByUser(user) {
      var filtered = [...this.onlineSales]
      return filtered.filter((online_sale) => online_sale.user.id == user.id)
    },
    getAcceptFromDate (date_str) {
      this.filterSales = []
      var date = new Date(date_str).getTime()
      // console.log(date)
      this.onlineSales.forEach( (sale) => {
        var sale_date_date = new Date(sale.sale_date).getTime()
        if(sale_date_date == date)
        {
          this.filterSales.push(sale)
        }
      })
      // console.table(this.filterSales)
      return this.filterSales                             
    }
  }
})