import { defineStore } from 'pinia'
import { customOrderWorkerAPI } from '@/services/api.js'


export const useCustomOrderWorkerStore = defineStore("custom_order_workers", {
  state: () => {
    return {
      custom_order_workers: []
    }
  },
  getters: {
    getCustomOrderWorkers (state) {
      return state.custom_order_workers
    }
  },
  actions: {
    async fetch () {
        this.custom_order_workers = await customOrderWorkerAPI.getAll()
    },
    async add(worker) {
      const response = await customOrderWorkerAPI.saveNew(worker);
      if (response.success) {
        this.custom_order_workers = await customOrderWorkerAPI.getAll();
        return response.custom_order_worker_id;
      }
      return false;
    },
    getWorkerID(id) {
      var filtered = [...this.custom_order_workers]
      return filtered.find((obj) => obj.id == id)
    },
    findByName(name) {
      var filtered = [...this.custom_order_workers]
      return filtered.find(element => element.name == name)
    },
    filterWorkerByID(custom_order_workers, id){
      var filtered = [...custom_order_workers]
      return filtered.filter((obj) => obj.id == id)
    },
    async editWorker(id, worker) {
      const response = await customOrderWorkerAPI.saveEdit(id, worker)
      this.workers = await customOrderWorkerAPI.getAll()
    },
    getNextID() {
      return this.custom_order_workers.length + 1
    },
  }
})