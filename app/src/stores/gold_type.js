import { defineStore } from 'pinia'
import { goldTypeAPI } from '@/services/api.js'

export const useGoldTypeStore = defineStore("gold_types", {
  state: () => {
    return {
      gold_types: []
    }
  },
  getters: {
    getGoldTypes (state) {
      return state.gold_types
    }
  },
  actions: {
    async fetch () {
        this.gold_types = await goldTypeAPI.getAll()
    },
    async add(gold_type) {
      const response = await goldTypeAPI.saveNew(gold_type);
      if (response.success) {
        this.gold_types = await goldTypeAPI.getAll();
        return response.gold_type_id;
      }
      return false;
    },
    getGoldTypeID(id) {
      var filtered = [...this.gold_types]
      return filtered.find((obj) => obj.id == id)
    },
    async editGoldType(id, gold_type) {
      const response = await goldTypeAPI.saveEdit(id, gold_type)
      this.gold_types = await goldTypeAPI.getAll()
    },
    getNextID() {
      return this.gold_types.length + 1
    },
    filterGoldTypeByID(gold_types, id){
      var filtered = [...gold_types]
      return filtered.filter((obj) => obj.id == id)
    },
    findByName(name) {
      var filtered = [...this.gold_types]
      return filtered.find(element => element.name == name)
    },
  }
})