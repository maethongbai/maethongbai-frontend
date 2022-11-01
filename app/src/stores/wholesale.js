import { defineStore } from 'pinia'
import { wholesaleAPI } from '@/services/api.js'

export const useWholesaleStore = defineStore("wholesales", {
  state: () => {
    return {
      wholesales: []
    }
  },
  getters: {
    getWholesales (state) {
      return state.wholesales
    }
  },
  actions: {
    async fetch () {
        this.wholesales = await wholesaleAPI.getAll()
    },
    async add(wholesale) {
      const response = await wholesaleAPI.saveNew(wholesale);
      if (response.success) {
        this.wholesales = await wholesaleAPI.getAll();
        return response.wholesale_id;
      }
      return false;
    },
    getWholesaleID(id) {
      var filtered = [...this.wholesales]
      return filtered.find((obj) => obj.id == id)
    },
    findByName(name) {
      var filtered = [...this.wholesales]
      return filtered.find(element => element.name == name)
    },
    filterWholesaleByID(wholesales, id){
      var filtered = [...wholesales]
      return filtered.filter((obj) => obj.id == id)
    },
    async editWholesale(id, wholesale) {
      const response = await wholesaleAPI.saveEdit(id, wholesale)
      this.wholesales = await wholesaleAPI.getAll()
    },
    getNextID() {
      return this.wholesales.length + 1
    },
  }
})