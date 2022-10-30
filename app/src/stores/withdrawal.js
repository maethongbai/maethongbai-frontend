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
    filterBySelectedDate(date) {
      var filtered = [...this.withdrawals]
      return filtered.filter(element => element.withdrawal_date == date)
    },

  }
})