import { defineStore } from 'pinia'
import { onsiteSaleAPI } from '@/services/api.js'
import { onlineSaleAPI } from '@/services/api.js'

export const useAllSaleStore = defineStore("all_sales", {
  state: () => {
    return {
      all_sales: [],
      golds: []
    }
  },
  
  getters: {
    getAllSales (state) {
      return state.all_sales
    }
  },

  actions: {
    async fetch () {
        var onsiteSales = await onsiteSaleAPI.getAll()
        var onlineSales = await onlineSaleAPI.getAll()
        // เพิ่ม online
        this.all_sales.concat(onsiteSales)
        this.all_sales.concat(onlineSales)
    },
    filterByDate(date) {
      var filtered = [...this.all_sales]
      //return filtered.filter((all_sales) => all_sales.sale_date == date && all_sales.transfer_status == "ยืนยัน")
      return filtered.filter((all_sales) => all_sales.transfer_status == "ยืนยัน")
    },
    getGoldFromSales(date){
      var filtered = this.filterByDate(date)
      filtered.forEach(sale => {
        var gold = sale.gold
        this.golds.push(gold)
        })
    },
    filterSoldGold() {
      var filtered = [...this.golds];

      /*
      remove is_sold == true (already sold)
      remove is_redemption == true (no reselling)
      filter stock_approval_status == อนุมัติ (only approved gold can be sold)
      */
      return filtered.filter(
        (gold) =>
          gold.is_sold == true &&
          gold.is_redemption == false &&
          gold.stock_approval_status == "อนุมัติ"
      );
    },
    filterSoldLeftover() {
      var filtered = this.filterSoldGold()

      // filter out duplicates and put it in another array
      var no_dupes = [];
      filtered.forEach((gold) => {
        var is_dupe = false;
        var gweight = gold.weight;
        if (gweight == null) {
          gweight = gold.custom_weight;
        }

        var temp_dupes = [...no_dupes]

        temp_dupes.every((obj) => {
          var oweight = obj.weight;
          if (oweight == null) {
            oweight = obj.custom_weight;
          }

          // find if gold and obj is same
          is_dupe = this.checkSame(gold, obj);
          if (is_dupe == true) {
            // console.log("same");
            return false // break
          } else {
            return true // continue
          }
        });
        // console.log(is_dupe);
        if (is_dupe == false) {
          // console.log("new gold")
          no_dupes.push(gold);
        }
      });
      // console.log(no_dupes)
      return no_dupes
    },
    countSoldGold() {
      var filtered = this.filterSoldLeftover()
      var count_array = []
      var id = 0
      filtered.forEach(a => {
        var count = 0
        // for each filtered value, count duplicates
        id += 1
        var obj = {
          count: count,
          gold: a,
          id: id
        }
        // console.log(count_obj)
        count_array.push(obj)
      })
      // console.log(count_array)
      return count_array
    },

  }
})