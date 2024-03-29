import { defineStore } from 'pinia'
import { customOrderAPI } from '@/services/api.js'

export const useCustomOrderStore = defineStore("custom_orders", {
  state: () => {
    return {
      custom_orders: []
    }
  },
  
  getters: {
    getCustomOrders (state) {
      return state.custom_orders
    },
    filterNotSent (state) {
      var filtered = [...state.custom_orders]
      return filtered.filter((custom_order) => (custom_order.delivery_date == null))
    },
    filterSent (state) {
      var filtered = [...state.custom_orders]
      return filtered.filter((custom_order) => (custom_order.delivery_date != null))
    },
  },

  actions: {
    async fetch () {
        this.custom_orders = await customOrderAPI.getAll()
    },
    async add (custom_order) {
        const response = await customOrderAPI.saveNew(custom_order)
        if (response.success) {
          this.custom_orders = await customOrderAPI.getAll()
          return response.custom_order_id
        }
	    return false
    },
    async getID(id) {
      const custom_order = await customOrderAPI.getID(id)
      return custom_order
    },
    filterCustomOrdersByID(custom_orders, id) {
      var filtered = [...custom_orders]
      return filtered.filter((custom_order) => custom_order.id == id)
    },
    getNextID() {
      var id = 1
      this.custom_orders.forEach(element => {
        id = id + 1
      });
      return id
    },
    async editOrderStatus (id, custom_order_status) {
      const obj = {
        id,
        custom_order_status
      }
      const response = await customOrderAPI.saveEdit(id, obj)
      this.custom_orders = await customOrderAPI.getAll()
    },
    async editDepositStatus (id, deposit_status) {
      const obj = {
        id,
        deposit_status
      }
      const response = await customOrderAPI.saveEdit(id, obj)
      this.custom_orders = await customOrderAPI.getAll()
    },
    async editDifferenceStatus (id, difference_status) {
      const obj = {
        id,
        difference_status
      }
      const response = await customOrderAPI.saveEdit(id, obj)
      this.custom_orders = await customOrderAPI.getAll()
    },
    async editDifferenceValues (id, difference_values) {
      const obj = {
        id,
        difference_payment_method: difference_values.difference_payment_method,
        difference_paid_amount: difference_values.difference_paid_amount,
        difference_change_amount: difference_values.difference_change_amount,
        difference_credit_card_type: difference_values.difference_credit_card_type,
        difference_bank_name: difference_values.difference_bank_name,
        difference_slip_image: difference_values.difference_slip_image
      }
      const response = await customOrderAPI.saveEdit(id, obj)
      this.custom_orders = await customOrderAPI.getAll()
    },
    async editDeliveryDate (id, delivery_date) {
      const obj = {
        id,
        delivery_date
      }
      const response = await customOrderAPI.saveEdit(id, obj)
      this.custom_orders = await customOrderAPI.getAll()
    },
    async edit(id,custom_order) {
      const response = await customOrderAPI.saveEdit(id, custom_order)
      this.custom_orders = await customOrderAPI.getAll()
    },
  }
})