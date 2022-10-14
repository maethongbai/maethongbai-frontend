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
    findByName(name) {
      var filtered = [...this.gold_patterns]
      return filtered.find(element => element.name == name)
    }
  }
})