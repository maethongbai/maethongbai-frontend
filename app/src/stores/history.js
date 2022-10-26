import { defineStore } from 'pinia'
import { redemptionAPI } from '@/services/api.js'
import { onlineSaleAPI } from '@/services/api.js'
import { onsiteSaleAPI } from '@/services/api.js'
import { customOrderAPI } from '@/services/api.js'

export const useHistoryStore = defineStore("histories", {
  state: () => {
    return {
      histories: []
    }
  },
  getters: {
    getHistories (state) {
      return state.histories
    }
  },
  actions: {
    async fetch () {
        var redemptions = await redemptionAPI.getAll()
        var online_sales = await onlineSaleAPI.getAll()
        var onsite_sales = await onsiteSaleAPI.getAll()
        var custom_orders = await customOrderAPI.getAll()

        var counter = 1

        this.histories = []

        redemptions.forEach(obj => {
          var history_object = {
            id: null,
            type: "ขายทอง",
            item: null
          }
          history_object.id = counter
          counter += 1
          history_object.item = obj
          this.histories.push(history_object)
        });

        online_sales.forEach(obj => {
          var history_object = {
            id: null,
            type: "ซื้อทองออนไลน์",
            item: null
          }
          history_object.id = counter
          counter += 1
          history_object.item = obj
          this.histories.push(history_object)
        });

        onsite_sales.forEach(obj => {
          var history_object = {
            id: null,
            type: "ซื้อทองหน้าร้าน",
            item: null
          }
          history_object.id = counter
          counter += 1
          history_object.item = obj
          if (obj.is_switch_gold == true) {
            history_object.type = "เปลี่ยน"
          }
          this.histories.push(history_object)
        });

        custom_orders.forEach(obj => {
          var history_object = {
            id: null,
            type: "งานสั่ง",
            item: null
          }
          history_object.id = counter
          counter += 1
          history_object.item = obj
          this.histories.push(history_object)
        });

    },
    filterByUser(user) {
      var filtered = [...this.histories]
      return filtered.filter(element => element.item.user.id == user.id)
    },
    filterBySale() { // user ซื้อทอง
      var filtered = [...this.histories]
      return filtered.filter(element => element.type == 'ซื้อทองออนไลน์' ||
                                        element.type == 'ซื้อทองหน้าร้าน')
    },
    filterByRedemption() { // user ขายทอง
      var filtered = [...this.histories]
      return filtered.filter(element => element.type == 'ขายทอง')
    },
    filterByCustomOrder() { // user ขายทอง
      var filtered = [...this.histories]
      return filtered.filter(element => element.type == 'งานสั่ง')
    },
    filterBySwitchGold() { // user เปลี่ยนทอง
      var filtered = [...this.histories]
      return filtered.filter(element => element.type == 'เปลี่ยน')
    }
  }
})