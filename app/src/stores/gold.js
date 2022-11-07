import { defineStore } from "pinia";
import { goldAPI } from "@/services/api.js";

export const useGoldStore = defineStore("golds", {
  state: () => {
    return {
      golds: [],
      count_golds: [],
    };
  },

  getters: {
    getGolds(state) {
      return state.golds;
    },
    getCountGold(state) {
      return state.count_golds;
    },
  },

  actions: {
    async fetch() {
      this.golds = await goldAPI.getAll();
    },
    async add(gold) {
      const response = await goldAPI.saveNew(gold);
      if (response.success) {
        this.golds = await goldAPI.getAll();
        return response.gold_id;
      }
      return false;
    },
    delete(id) {
      this.golds = this.golds.filter((gold) => gold.id != id);
    },
    async getID(id) {
      const gold = await goldAPI.getID(id);
      return gold;
    },
    filterStockByID(golds, id) {
      var filtered = [...golds];
      return filtered.find((gold) => gold.id == id);
    },

    filterSellable() {
      var filtered = [...this.golds];

      /*
      remove is_sold == true (already sold)
      remove is_redemption == true (no reselling)
      filter stock_approval_status == อนุมัติ (only approved gold can be sold)
      */
      return filtered.filter(
        (gold) =>
          gold.is_sold == false &&
          gold.is_redemption == false &&
          gold.stock_approval_status == "อนุมัติ"
      );
    },
    filterUnsellable() {
      var filtered = [...this.golds];
      return filtered.filter(
        (gold) =>
          gold.is_sold == false &&
          gold.is_redemption == false &&
          (gold.stock_approval_status == "รออนุมัติ" ||
            gold.stock_approval_status == "ไม่อนุมัติ")
      );
    },
    filterLeftover() {
      var filtered = this.filterSellable();

      // filter out duplicates and put it in another array
      var no_dupes = [];
      filtered.forEach((gold) => {
        var is_dupe = false;
        var gweight = gold.weight;
        if (gweight == null) {
          gweight = gold.custom_weight;
        }

        var temp_dupes = [...no_dupes];

        temp_dupes.every((obj) => {
          var oweight = obj.weight;
          if (oweight == null) {
            oweight = obj.custom_weight;
          }

          // find if gold and obj is same
          is_dupe = this.checkSame(gold, obj);
          if (is_dupe == true) {
            // console.log("same");
            return false; // break
          } else {
            return true; // continue
          }
        });
        // console.log(is_dupe);
        if (is_dupe == false) {
          // console.log("new gold")
          no_dupes.push(gold);
        }
      });
      // console.log(no_dupes)
      return no_dupes;
    },
    getNextID() {
      return this.golds.length + 1;
    },
    async editGold(id, gold) {
      const response = await goldAPI.saveEdit(id, gold);
      this.golds = await goldAPI.getAll();
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
    countLeftover() {
      var filtered = this.filterLeftover();
      var count_array = [];
      var id = 0;
      filtered.forEach((a) => {
        var count = 0;
        // for each filtered value, count duplicates
        this.filterSellable().forEach((b) => {
          if (this.checkSame(a, b)) {
            count += 1;
          }
        });
        id += 1;
        var count_obj = {
          count: count,
          gold: a,
          id: id,
        };
        // console.log(count_obj)
        count_array.push(count_obj);
      });
      // console.log(count_array)
      return count_array;
    },
    fetchLeftover() {
      this.count_golds = this.countLeftover();
    },
    getCountID(id) {
      var filtered = [...this.count_golds];
      return filtered.find((item) => item.id == id);
    },
    countUnsellable() {
      var filtered = this.filterUnsellable();
      var count_array = [];
      var id = 0;
      filtered.forEach((a) => {
        // var count = 0
        // for each filtered value, count duplicates
        id += 1;
        var obj = {
          // count: count,
          gold: a,
          id: id,
        };
        // console.log(count_obj)
        count_array.push(obj);
      });
      // console.log(count_array)
      return count_array;
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
      var filtered = this.filterSoldGold();

      // filter out duplicates and put it in another array
      var no_dupes = [];
      filtered.forEach((gold) => {
        var is_dupe = false;
        var gweight = gold.weight;
        if (gweight == null) {
          gweight = gold.custom_weight;
        }

        var temp_dupes = [...no_dupes];

        temp_dupes.every((obj) => {
          var oweight = obj.weight;
          if (oweight == null) {
            oweight = obj.custom_weight;
          }

          // find if gold and obj is same
          is_dupe = this.checkSame(gold, obj);
          if (is_dupe == true) {
            // console.log("same");
            return false; // break
          } else {
            return true; // continue
          }
        });
        // console.log(is_dupe);
        if (is_dupe == false) {
          // console.log("new gold")
          no_dupes.push(gold);
        }
      });
      // console.log(no_dupes)
      return no_dupes;
    },
    countSoldGold() {
      var filtered = this.filterSoldLeftover();
      var count_array = [];
      var id = 0;
      filtered.forEach((a) => {
        var count = 0;
        // for each filtered value, count duplicates
        id += 1;
        var obj = {
          count: count,
          gold: a,
          id: id,
        };
        // console.log(count_obj)
        count_array.push(obj);
      });
      // console.log(count_array)
      return count_array;
    },
    findByID(id) {
      var filtered = [...this.golds];
      return filtered.find((element) => element.id == id);
    },
    async edit(gold) {
      const response = await goldAPI.saveEdit(gold.id, gold);
      this.golds = await goldAPI.getAll();
    },
    filterStock(temp_list, filter_list) {
      //   search_inputs_object: { // string and/or objects from api
      //     weight: null,
      //     custom_weight: null,
      //     gold_type: null,
      //     gold_pattern: null,
      //     gold_pattern_type: null
      // },
      var list = [];
      temp_list.every((element) => {
        console.log(element)
        console.log(filter_list)
        // weight/custom weight filter (gold must have one of two)
        if (filter_list.weight == null) {
          // custom weight filter
          if (element.custom_weight != filter_list.custom_weight) {
            return true // filter out
          }
        } else if (filter_list.custom_weight == null){
          // weight filter
          if (element.weight != filter_list.weight) {
            return true // filter out
          }
        }

        // gold_type filter
        if (filter_list.gold_type != null) {
          if (element.gold_type == null) {
            // if element has no gold_type
            return true // filter out
          }
          if (filter_list.gold_type.name != element.gold_type.name) {
            // if name doesn't match
            return true // filter out
          }
        }

        // gold_pattern filter
        if (filter_list.gold_pattern != null) {
          if (element.gold_pattern == null) {
            // if element has no gold_pattern
            return true // filter out
          }
          if (filter_list.gold_pattern.name != element.gold_pattern.name) {
            // if name doesn't match
            return true // filter out
          }
        }

        if (filter_list.gold_pattern_type != null) {
          if (element.pattern_type == null) {
            // if element has no gold_pattern_type
            return true // filter out
          }
          if (filter_list.gold_pattern_type != element.pattern_type) {
            // if name doesn't match
            return true // filter out
          }
        }

        // filter in
        list.push(element)
        return true
      });

      console.log(list)
      return list
    },
    countStock(stock) {
      var filtered = stock;
      var count_array = [];
      var id = 0;
      filtered.forEach((a) => {
        var count = 0;
        // for each filtered value, count duplicates
        this.filterSellable().forEach((b) => {
          if (this.checkSame(a, b)) {
            count += 1;
          }
        });
        id += 1;
        var count_obj = {
          count: count,
          gold: a,
          id: id,
        };
        // console.log(count_obj)
        count_array.push(count_obj);
      });
      // console.log(count_array)
      return count_array;
    },
    countGold(gold) {
      var filtered = this.filterSellable()
      var count_obj = {
        count: null,
        gold: null
      }
      var count = 0
      filtered.forEach(a => {
        // for each filtered value, count duplicates
          if (this.checkSame(a,gold)) {
            count += 1
          } 
        // console.log(count_obj)
      })
      count_obj.count = count
      count_obj.gold = gold
      return count_obj
    },
    countGoldList(gold) {
      var filtered = this.filterSellable()
      var count_obj = {
        count: null,
        gold: null,
        gold_list: []
      }
      var count = 0
      filtered.forEach(a => {
        // for each filtered value, count duplicates
          if (this.checkSame(a,gold)) {
            count += 1
            count_obj.gold_list.push(a)
          } 
        // console.log(count_obj)
      })
      count_obj.count = count
      count_obj.gold = gold
      return count_obj
    },
  },
});
