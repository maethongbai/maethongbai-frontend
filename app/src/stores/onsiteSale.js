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
      // console.log(state.onsiteSales)
      return state.onsiteSales
    },
    filterChecking (state) {
      var filtered = [...state.onsiteSales]
      return filtered.filter((onsiteSale) => onsiteSale.transfer_status == "ยังไม่ได้ตรวจสอบ")
    },
    filterProblem (state) {
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
        this.onsiteSales = await onsiteSaleAPI.getAll()
        return response.onsiteSale_id
      }
      return false
    },
    async edit (id,onsiteSale) {
      const response = await onsiteSaleAPI.saveEdit(id,onsiteSale)
      if (response.success) {
        this.onsiteSales = await onsiteSaleAPI.getAll()
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
    filterOnsiteByID(onsiteSales, id) {
      var filtered = [...onsiteSales]
      return filtered.filter((onsiteSale) => onsiteSale.id == id)
    },
    filterAcceptFromDate (date) {
      var filtered = [...this.onsiteSales]
      return filtered.filter((onsiteSales) => onsiteSales.transfer_status == "ยืนยัน" && onlineSale.sale_date == date)                                    
    },
    getAcceptFromDate (date_str) {
      this.filterSales = []
      var date = new Date(date_str).getTime()
      // console.log(date)
      this.onsiteSales.forEach( (sale) => {
        var sale_date_date = new Date(sale.sale_date).getTime()
        if(sale_date_date == date)
        {
          this.filterSales.push(sale)
        }
      })
      // console.table(this.filterSales)
      return this.filterSales                             
    },
    getNextID() {
      console.log("in")
      var id = 1
      this.onsiteSales.forEach(element => {
        id = id + 1
      });
      return id
    },
  }
})