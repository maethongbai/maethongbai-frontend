import { defineStore } from 'pinia'
import { goldPatternAPI } from '@/services/api.js'

export const useGoldPatternStore = defineStore("gold_patterns", {
  state: () => {
    return {
      gold_patterns: []
    }
  },
  getters: {
    getGoldPatterns (state) {
      return state.gold_patterns
    }
  },
  actions: {
    async fetch () {
        this.gold_patterns = await goldPatternAPI.getAll()
    },
    async add(gold_pattern) {
      const response = await goldPatternAPI.saveNew(gold_pattern);
      if (response.success) {
        this.gold_patterns = await goldPatternAPI.getAll();
        return response.gold_pattern_id;
      }
      return false;
    },
    getGoldPatternID(id) {
      var filtered = [...this.gold_patterns]
      return filtered.find((obj) => obj.id == id)
    },
    findByName(name) {
      var filtered = [...this.gold_patterns]
      return filtered.find(element => element.name == name)
    },
    async editGoldPattern(id, gold_pattern) {
      const response = await goldPatternAPI.saveEdit(id, gold_pattern)
      this.gold_patterns = await goldPatternAPI.getAll()
    },
    getNextID() {
      return this.gold_patterns.length + 1
    },
    filterGoldPatternByID(gold_patterns, id){
      var filtered = [...gold_patterns]
      return filtered.filter((obj) => obj.id == id)
    },
  }
})