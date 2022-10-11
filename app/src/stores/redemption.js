import { defineStore } from 'pinia'
import { redemptionAPI } from '@/services/api.js'

export const useRedemptionStore = defineStore("redemptions", {
  state: () => {
    return {
      redemptions: []
    }
  },
  
  getters: {
    getRedemptions (state) {
      return state.redemptions.data
    },
    filterChecking (state) {
      var filtered = [...state.redemptions.data]
      return filtered.filter((redemption) => redemption.check_status == "รอตรวจสอบ")
    },
    filterConfirmed (state) {
      var filtered = [...state.redemptions.data]
      return filtered.filter((redemption) => redemption.check_status == "ผ่าน")
    }
  },

  actions: {
    async fetch () {
        this.redemptions = await redemptionAPI.getAll()
    },
    async add (redemption) {
        const response = await redemptionAPI.saveNew(redemption)
        if (response.success) {
          this.redemptions.push({
            ...redemption
          })
          return response.redemption_id
        }
	      return false
    },
    delete (id) {
      this.redemptions = this.redemptions.filter(redemption => redemption.id != id)
    }
  },
})