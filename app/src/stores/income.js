import { defineStore } from 'pinia'
import { incomeAPI } from '@/services/api.js'

export const useIncomeStore = defineStore("incomes", {
  state: () => {
    return {
      incomes: []
    }
  },
  getters: {
    getIncomes (state) {
      return state.incomes
    }
  },
  actions: {
    async fetch () {
        this.incomes = await incomeAPI.getAll()
    },
    findById(id) {
      var filtered = [...this.incomes]
      return filtered.find(element => element.id == id)
    }
  }
})