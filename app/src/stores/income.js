import { defineStore } from 'pinia'
import { incomeAPI } from '@/services/api.js'

export const useIncomeStore = defineStore("incomes", {
  state: () => {
    return {
      incomes: [],
      filtered_incomes: []
    }
  },
  getters: {
    getIncomes (state) {
      return state.incomes
    },
  },
  actions: {
    async fetch () {
        this.incomes = await incomeAPI.getAll()
    },
    findById(id) {
      var filtered = [...this.incomes]
      return filtered.find(element => element.id == id)
    },
    filterBySelectedDate(date) {
      var filtered = [...this.incomes]
      return filtered.filter(element => element.transaction_date == date)
    },
    getNextID() {
      var id = 1
      this.incomes.forEach(element => {
        id = id + 1
      });
      return id
    },
    async getID(id) {
      const income = await incomeAPI.getID(id)
      return income
    },
    async add (income) {
      const response = await incomeAPI.saveNew(income)
      if (response.success) {
        this.incomes = await incomeAPI.getAll()
        return response.income_id
      }
      return false
    },
    async edit(id, income) {
      const response = await incomeAPI.saveEdit(id,income)
      if (response.success) {
        this.incomes = await incomeAPI.getAll()
        return response.income_id
      }
      return false
    },
    filterIncomeByID(incomes, id) {
      var filtered = [...incomes]
      return filtered.filter((income) => income.id == id)
    },
    filterDate (date_str) {
      this.filtered_incomes = []
      var date = new Date(date_str).getTime()
      // console.log(date)
      this.incomes.forEach( (o) => {
        var bdate = new Date(o.transaction_date).getTime()
        if(bdate == date)
        {
          this.filtered_incomes.push(o)
        }
      })
      // console.table(this.filterSales)
      return this.filtered_incomes                         
    }
  }
})