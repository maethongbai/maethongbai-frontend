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
    findById(id) {
      var filtered = [...this.withdrawals]
      return filtered.find(element => element.id == id)
    },
    getNextID() {
      var id = 1
      this.withdrawals.forEach(element => {
        id = id + 1
      });
      return id
    },
    async getID(id) {
      const withdrawal = await withdrawalAPI.getID(id)
      return withdrawal
    },
    async add (withdrawal) {
      const response = await withdrawalAPI.saveNew(withdrawal)
      if (response.success) {
        this.withdrawals = await withdrawalAPI.getAll()
        return response.withdrawal_id
      }
      return false
  },

  }
})