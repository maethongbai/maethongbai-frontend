import { defineStore } from 'pinia'
import { employeeAPI } from '@/services/api.js'

export const useEmployeeStore = defineStore("employees", {
  state: () => {
    return {
      employees: []
    }
  },
  getters: {
    getEmployees (state) {
      return state.employees
    }
  },
  actions: {
    async fetch () {
        this.employees = await employeeAPI.getAll()
    },
    async add (employee) {
        const response = await employeeAPI.saveNew(employee)
        if (response.success) {
          // this.users.push({
          //   ...user
          // })
          this.employees = await employeeAPI.getAll()
          return response.employee_id
        }
	      return false
    },
    // findByName(name) {
    //   var filtered = [...this.gold_types]
    //   return filtered.find(element => element.name == name)
    // }
    getNextId () {
        return this.employees.length + 1
    },
  }
})