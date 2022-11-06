<template>
        
            <div v-if="this.user != null">
                <card class="flex flex-col rounded-lg shadow-lg w-[600px] p-10 bg-white">
                <router-link v-if="this.user.role == 'manager' || this.user.role == 'account' || this.user.role == 'employee'" to="/manage_home" class="px-5 py-2 mx-4 my-4 bg-yellow-200 rounded-xl">
                    จัดการหน้าร้าน
                </router-link>
                <router-link :to="'/user/' + this.user.id + '/edit'"  class="px-5 py-2 mx-4 my-4 bg-yellow-200 rounded-xl">
                    edit user
                </router-link>
                <router-link to="/user/view" class="px-5 py-2 mx-4 my-4 bg-yellow-200 rounded-xl">
                    view all users
                </router-link>
                </card>

            </div>

            <div class="bg-slate-200 shadow-xl p-12">
     
                    <h1 class="text-xl">สินค้ามาใหม่</h1>
                    <br>
                    <div>

                    <div hidden>
                        {{sortt()}}
                    </div>
                    <vue-horizontal>
                    <div v-for="gold in sortt_array">
                        <img :src="`${gold.gold.gold.image}`" width="200">
                        {{gold.gold.gold.name}}
                        <br>
                        ราคาสินค้า
                        {{gold.total_price}}
                        <br>
                        <a v-bind:href="'/shopping/'+ gold.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            ดูรายละเอียด
                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                         </svg>
                        </a>
                    </div>
                  </vue-horizontal> 
                  <a v-bind:href="'/shopping/all'" class="ml-96 mt-4">
                      ดูสินค้าทั้งหมด
                    </a>
                </div>

            </div>

            <br>
            <div>
                <h1 class="text-xl center">เกี่ยวกับเรา</h1>
                <br>
                <div class="grid grid-cols-3 gap-4 justify-center">
                    <img alt="Home1" class="mx-auto" src="@/assets/home1.png" />
                    <img alt="Home2" class="mx-auto" src="@/assets/home2.png"  />
                    <img alt="Home3" class="mx-auto" src="@/assets/home3.png"  />

                </div>
                <br>
                <div class="center">
                    <p> ห้างทองแม่ทองใบ คลาสสิก มีจุดเริ่มต้นมาจากห้างทอง “เตียเล่งเฮง” ซึ่งตั้งอยู่ที่ถนนสุขุมวิท แขวงพระโขนง ในปี2527</p>
                    <p>โดยทางร้านในขณะนั้นเป็นที่ยอมรับเรื่องงานฝีมือ ที่มีความประณีตงดงามและมีความละเอียดอ่อนของช่างทองที่มีความชำนาญ</p>
                    <p>ทำให้ร้านประสบความสำเร็จในระดับนึง ต่อมาทางร้านต้องการที่จะจับกลุ่มลูกค้าให้ได้เพิ่มมากขึ้น</p>
                    <p>ในตอนแรกที่จะพัฒนากิจการนี้นั้นทางร้านได้เลือกหาทำเล จนมาตัดสินใจที่จะเปิดที่ห้างสรรพสินค้าเดอะมอลล์บางแค ชั้นG ตั้งแต่ปี 2540</p>
                    <p>เนื่องจากกลุ่มลูกค้าที่เดินภายในห้างสรรพสินค้าเดอะมอลล์บางแค ตรงตามที่ทางร้านต้องการที่จะขยายกลุ่มลูกค้า</p>
                    <p>โดยถ้านับเวลาถึงปัจจุบันจะเป็นเวลากว่า 25 ปี ร้านห้างทองแม่ทองใบ คลาสสิก เป็นร้านที่สามารถตอบโจทย์ลูกค้าได้อย่างหลากหลาย</p> 
                    <p>เนื่องจากทางร้านมีบริการด้านทองที่ครบวงจร ทั้ง ซื้อ ขาย เปลี่ยน ขาย-ฝาก ทั้งทองแท่งและทองรูปพรรณ รับทำงานสั่ง</p>   
                </div>
                <br>
                <br>

            </div>

            <div>
                <p class="center text-xl">เสียงตอบรับจากลูกค้า</p>
                <br>

                <div class="grid grid-rows-4">
                    <div class="box-border rounded-lg shadow-xl bg-slate-200 w-60">
                        <p>ทางร้านมีบริการที่ดีมากเลยค่ะ มีบริการครบวงจร</p>
                        <p>รวมถึงการให้บริการหลังการขาย</p>
                    </div>
                </div>
                <br>
                
            </div>

        
</template>

<script>
    import { useUserStore } from '@/stores/user.js'
    import { useAuthStore } from '@/stores/auth.js'
    import { useGoldStore } from '@/stores/gold.js'
    import { useGoldPriceStore } from '@/stores/gold_price.js'
    import VueHorizontal from "vue-horizontal";
    export default {
      setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        const gold_store = useGoldStore()
        const gold_price_store = useGoldPriceStore()
        return { user_store, auth_store, gold_store, gold_price_store}
      },
      data() {
        return {
            auth: null,
            user: null,
            error: null,
            user: null,
            golds: [],
            sort_array: [],
            gold_sell_price: {
                id: -1,
                buy_price: -1,
                sell_price: -1
            },
            count: 0,
            sortt_array: []
        }
      },
      watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                this.auth = this.auth_store.getAuth
                this.user = JSON.parse(this.auth_store.getUser)
            }
        }
      },
      async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "manager" || this.user.role == "account" || this.user.role == "employee" || this.user.role == "user") {
                console.log("authorized " + document.URL);
            } else {
                this.$router.push("/");
            }
        }
        else{
            this.$router.push("/");
        }
        await this.gold_store.fetch()
        this.golds = this.gold_store.countLeftover()
        this.gold_sell_price = await this.gold_price_store.getLast()
        this.addPrice()
      },
      components: {
        VueHorizontal
    },
    methods: {
        sortNew() {
            function compare(a, b) {
                if (a.gold.gold.import_date < b.gold.gold.import_date) {
                    return 1;
                } else if (a.gold.gold.import_date > b.gold.gold.import_date) {
                    return -1;
                } else {
                    return 0;
                }

            }
            console.log(this.sort_array.sort(compare))
            return this.sort_array.sort(compare)
        },
        addPrice() {
            var filtered = this.golds
            var total_price = 0
            var sort_array = []
            filtered.forEach(e => {
                total_price = this.price(e)
                var obj = {
                    gold: e,
                    total_price: total_price
                }
                if (this.l_price != null && this.h_price != null) {
                    if (total_price >= this.l_price && total_price <= this.h_price) {
                        sort_array.push(obj)
                    }
                } else {
                    sort_array.push(obj)
                }
            })
            return this.sort_array = sort_array
        },
        price(gold) {
            console.log(gold)
            var total
            var price = this.gold_sell_price.sell_price + ((gold.gold.pension_per_piece * 5) + 500)
            if (gold.gold.weight == "ครึ่งสลึง" ||
                gold.gold.weight == "1 สลึง" ||
                gold.gold.weight == "2 สลึง" ||
                gold.gold.weight == "3 สลึง" ||
                gold.gold.weight == "6 สลึง" ) {
                    var fprice = this.gold_sell_price.sell_price/4
                    if(gold.gold.weight == "ครึ่งสลึง"){
                        total =  (fprice/2) + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "1 สลึง") {
                        total =  fprice + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "2 สลึง") {
                        total =  (fprice*2) + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "3 สลึง") {
                        total =  (fprice*3) + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "6 สลึง") {
                        total =  (fprice*6) + ((gold.gold.pension_per_piece * 5) + 500)
                    }
            } else if (gold.gold.custom_weight != null) {
                var pricee = this.gold_sell_price.sell_price/15.16
                total = pricee + ((gold.gold.pension_per_piece * 5) + 500)

            }
            else {
                if (gold.gold.weight == "1 บาท") {
                    total = price * 1
                } else if (gold.gold.weight == "2 บาท") {
                    total = price * 2
                } else if (gold.gold.weight == "3 บาท") {
                    total = price * 3
                } else if (gold.gold.weight == "4 บาท") {
                    total = price * 4
                } else if (gold.gold.weight == "5 บาท") {
                    total = price * 5
                } else if (gold.gold.weight == "6 บาท") {
                    total = price * 6
                } else if (gold.gold.weight == "7 บาท") {
                    total = price * 7
                } else if (gold.gold.weight == "8 บาท") {
                    total = price * 8
                } else if (gold.gold.weight == "9 บาท") {
                    total = price * 9
                } else if (gold.gold.weight == "10 บาท") {
                    total = price * 10
                } else if (gold.gold.weight == "15 บาท") {
                    total = price * 15
                } else if (gold.gold.weight == "20 บาท") {
                    total = price * 20
                }
            }
            return total
        },
        sortt() {
            this.sort_array.forEach(element => {
                if (this.count <10){
                    this.sortt_array.push(element)
                }
                this.count += 1
            });            
        }

    }
  }
</script>

<style>

</style>

