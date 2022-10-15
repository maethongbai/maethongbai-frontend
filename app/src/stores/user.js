import { defineStore } from 'pinia'
import { userAPI } from '@/services/api.js'

export const useUserStore = defineStore("users", {
  state: () => {
    return {
      users: []
    }
  },
  
  getters: {
    getUsers (state) {
      return state.users
    }
  },

  actions: {
    async fetch () {
        this.users = await userAPI.getAll()
    },
    async add (user) {
        const response = await userAPI.saveNew(user)
        if (response.success) {
          // this.users.push({
          //   ...user
          // })
          this.users = await userAPI.getAll()
          return response.user_id
        }
	      return false
    },
    delete (id) {
      this.users = this.users.filter(user => user.id != id)
    },
    findByPhone(phone) {
      var filtered = [...this.users]
      return filtered.find(element => element.phone == phone)
    },
    async editIDCardNumber (id, id_card_number) {
      const obj = {
        id,
        id_card_number
      }
      const response = await userAPI.saveEdit(id, obj)
      this.users = await userAPI.getAll()
    },
    async editAddress (id, address) {
      const obj = {
        id,
        address
      }
      const response = await userAPI.saveEdit(id, obj)
      this.users = await userAPI.getAll()
    },
  },
})