import { defineStore } from 'pinia'
import { withdrawalAPI } from '@/services/api.js'

export const useWithdrawalStore = defineStore("withdrawals", {
  state: () => {
    return {
        withdrawals: []
    }
  },
  getters: {
    getWithdrawals (state) {
      return state.withdrawals
    }
  },
  actions: {
    async fetch () {
        this.withdrawals = await withdrawalAPI.getAll()
    },
    // findById(id) {
    //   var filtered = [...this.incomes]
    //   return filtered.find(element => element.id == id)
    // }
  }
})