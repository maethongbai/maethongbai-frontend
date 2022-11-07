import { defineStore } from 'pinia'
import { onsiteSaleAPI } from '@/services/api.js'
import { onlineSaleAPI } from '@/services/api.js'

export const useAllSaleStore = defineStore("all_sales", {
  state: () => {
    return {
      all_sales: [],
      golds: [],
      all_sales_filtered: []
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
        
        onsiteSales.forEach(sale => {
          this.all_sales.push(sale)
        })
        onlineSales.forEach(sale => {
          this.all_sales.push(sale)
        })
    },
    filterByDate(date) {
      var filtered = [...this.all_sales]
      this.all_sales_filtered = filtered.filter((sale) => sale.transfer_status == "ยืนยัน" &&
                                        (new Date(sale.sale_date).getTime()) == (new Date(date).getTime()))
      return this.all_sales_filtered
    },
    getGoldFromSales(date){
      this.golds = []
      var filtered = this.filterByDate(date)
      console.log(filtered)
      filtered.forEach(sale => {
        var gold = sale.gold
        this.golds.push(gold)
        })

        console.log(this.golds)
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
        var sales = []
        var sale_amount = 0
        // for each filtered value, count duplicates
        this.golds.forEach(b => {
          if(this.checkSame(a, b)) {
            count += 1
          }
        })

        this.all_sales_filtered.forEach(sale => {
          if (sale.gold.id == a.id) {
            sales.push(sale)
            sale_amount += sale.gold_price
          }
        })
        id += 1
        var obj = {
          count: count,
          sales: sales,
          sale_amount: sale_amount,
          gold: a,
          id: id
        }
        // console.log(count_obj)
        count_array.push(obj)
      })
      // console.log(count_array)
      return count_array
    },
    getAcceptFromDate (date_str) {
      this.filterSales = []
      var date = new Date(date_str).getTime()
      // console.log(date)
      this.all_sales.forEach( (sale) => {
        var sale_date_date = new Date(sale.sale_date).getTime()
        if(sale_date_date == date)
        {
          this.filterSales.push(sale)
        }
      })
      // console.table(this.filterSales)
      return this.filterSales                             
    },
    checkSame(a, b) {
      /* leftover criteria (for it to count as same gold)                
      weight is same (weight != custom weight)
      gold type is same
      pattern type is same
      gold pattern is same
      size is same
      percentage is same
      */

      // separate weight and custom weight
      var aweight = a.weight;
      if (aweight == null) {
        aweight = a.custom_weight;
      }
      var bweight = b.weight;
      if (bweight == null) {
        bweight = b.custom_weight;
      }

      // console.log(a);
      // console.log(b);

      // different weights does not count as same
      if (a.weight == null && b.custom_weight == null) {
        // console.log("different weight scale");
        return false;
      }
      if (b.weight == null && a.custom_weight == null) {
        // console.log("different weight scale");
        return false;
      }

      // check weight
      if (aweight != bweight) {
        // console.log("different weight");
        return false;
      }

      // check gold_type
      if (a.gold_type != null && b.gold_type != null) {
        if (a.gold_type.id != b.gold_type.id) {
          // console.log("different gold type");
          return false;
        }
      } else {
        // if either is null, check
        // if both is null, skip
        if (a.gold_type != null && b.gold_type == null) {
          // console.log("different gold type (one is null)");
          return false;
        }
        if (b.gold_type != null && a.gold_type == null) {
          // console.log("different gold type (one is null)");
          return false;
        }
      }

      // check pattern type
      if (a.pattern_type != b.pattern_type) {
        // console.log("different pattern type");
        return false;
      }

      // check gold pattern
      if (a.gold_pattern != null && b.gold_pattern != null) {
        if (a.gold_pattern.id != b.gold_pattern.id) {
          // console.log("different gold pattern");
          return false;
        }
      } else {
        // if either is null, check
        // if both is null, skip
        if (a.gold_pattern == null && b.gold_pattern != null) {
          // console.log("different gold pattern (one is null)");
          return false;
        }
        if (b.gold_pattern == null && a.gold_pattern != null) {
          // console.log("different gold pattern (one is null)");
          return false;
        }
      }

      // check size
      if (a.size != b.size) {
        // console.log("different size");
        return false;
      }

      // check percentage
      if (a.percentage != b.percentage) {
        // console.log("different percentage");
        return false;
      }

      // console.log("is same");
      return true;
    },

  }
})