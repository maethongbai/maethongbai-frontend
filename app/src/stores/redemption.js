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
      return state.redemptions
    },
    filterChecking (state) {
      var filtered = [...state.redemptions]
      return filtered.filter((redemption) => redemption.check_status == "รอตรวจสอบ")
    },
    filterConfirmed (state) {
      var filtered = [...state.redemptions]
      return filtered.filter((redemption) => redemption.check_status == "ผ่านการตรวจสอบ")
    }
  },

  actions: {
    async fetch () {
        this.redemptions = await redemptionAPI.getAll()
    },
    async add (redemption) {
      // console.log(redemption)
        const response = await redemptionAPI.saveNew(redemption)
        if (response.success) {
          // this.redemptions.push({
          //   ...redemption
          // })
          this.redemptions = await redemptionAPI.getAll()
          return response.redemption_id
        }
	      return false
    },
    async editCheckStatus (id, check_status) {
      const obj = {
        id,
        check_status
      }
      const response = await redemptionAPI.saveEdit(id, obj)
      this.redemptions = await redemptionAPI.getAll()
  },
    delete (id) {
      this.redemptions = this.redemptions.filter(redemption => redemption.id != id)
    },
    async getID(id) {
      const redemption = await redemptionAPI.getID(id)
      return redemption
    },
    filterRedemptionsByID(redemptions, id) {
      var filtered = [...redemptions]
      return filtered.filter((redemption) => redemption.id == id)
    },
    async getNextID() {
      const nextID = await redemptionAPI.getNextID()
      return nextID
    },
  }
})