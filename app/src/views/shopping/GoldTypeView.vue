<template>
    <div class="pl-4">
        <div class="relative h-96 w-52 bg-gray-100">
            <div class="absolute inset-y-0 left-0 ">
                <div>
                    <h1 class="text-xl">นำ้หนัก</h1>
                    <select  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5" v-model="t_weight">
                        <option value="-">-</option>
                        <option value="ครึ่งสลึง">ครึ่งสลึง</option>
                        <option value="1 สลึง">1 สลึง</option>
                        <option value="2 สลึง">2 สลึง</option>
                        <option value="3 สลึง">3 สลึง</option>
                        <option value="6 สลึง">6 สลึง</option>
                        <option value="1 บาท">1 บาท</option>
                        <option value="2 บาท">2 บาท</option>
                        <option value="3 บาท">3 บาท</option>
                        <option value="4 บาท">4 บาท</option>
                        <option value="5 บาท">5 บาท</option>
                        <option value="6 บาท">6 บาท</option>
                        <option value="7 บาท">7 บาท</option>
                        <option value="8 บาท">8 บาท</option>
                        <option value="9 บาท">9 บาท</option>
                        <option value="10 บาท">10 บาท</option>
                        <option value="15 บาท">15 บาท</option>
                        <option value="20 บาท">20 บาท</option>
                        <option value="นำ้หนักตามชั่ง">นำ้หนักตามชั่ง</option> 
                    </select>
                

                
                    <div v-if="t_weight == 'นำ้หนักตามชั่ง'">
                        <p>นำ้หนักตามชั่ง</p>
                        <input class="mx-3" type="text" v-model="custom_Weight" autocomplete="off">
                        <!-- <p hidden>{{cusWeight(this.custom_Weight)}}</p> -->
                    </div>

                    <!-- <div v-if="t_weight!=null && customWeight == false" hidden>
                        {{typeWeight(this.t_weight)}}
                    </div> -->
                </div>

                <div>
                    <h1 class="text-xl inline px-2">ประเภทลาย</h1>
                    <br>
                    <select  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5" v-model="pattern_type">
                        <option value="-">-</option>
                        <option value="ทองตัน">ตัน</option>
                        <option value="ทองโป่ง">โป่ง</option>
                    </select>
                    <!-- <input type="radio" id="ทองตัน" value="ทองตัน" v-model="pattern_type">
                    <label for="ทองตัน">ตัน</label>
                    <input type="radio" id="ทองโป่ง" value="ทองโป่ง" v-model="pattern_type">
                    <label for="ทองโป่ง">โป่ง</label> -->

                    
                    <!-- <p v-if="pattern_type != null" hidden>{{patternT(this.pattern_type)}}</p> -->
                </div>


                <div>
                    <h1 class="text-xl inline px-2">ชื่อลาย</h1>
                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5" v-model="g_pattern">
                    <option v-for="pattern in gold_pattern" :value="pattern.name">{{pattern.name }}</option>
                    </select>

                    <!-- <p v-if="g_pattern != null" hidden>{{pattern(this.g_pattern)}}</p> -->
                </div>

                <div>
                    <h1 class="text-xl inline px-2">ขนาด</h1>
                    <input type="text" v-model="g_size">

                    <!-- <p v-if="g_size != null" hidden>{{size(this.g_size)}}</p> -->
                </div>

                <br>
                <button  @click="filter" :disabled="disabledButton" class="inline p-1 bg-green-400 border rounded-lg">
                    ค้นหา
                </button>


                <div>
                    <p>เรียงโดย</p>
                    <button @click="sortASC()" class="px-4 py-2 rounded-lg bg-lime-400"> น้อยไปมาก </button>
                    <button @click="sortDESC()" class="px-4 py-2 rounded-lg bg-lime-400"> มากไปน้อย </button>
                    <button @click="sortNew()" class="px-4 py-2 rounded-lg bg-lime-400"> ใหม่ไปเก่า </button>
                    <button @click="sortOld()" class="px-4 py-2 rounded-lg bg-lime-400"> เก่าไปใหม่ </button>

                    <br>
        
                    <p>ช่วงราคา</p>
                    <input class="mx-3" type="number" v-model="l_price">
                    <label > - </label>
                    <input class="mx-3" type="number" v-model="h_price">
                    <button @click="rangePrice()" class="px-4 py-2 rounded-lg bg-lime-400"> ค้นหาช่วงราคา </button>
                    
                </div>
            </div>
        </div>
    </div>

    <div class="absolute top-80 left-60 ">
        <div class="grid grid-cols-6 gap-x-16 ">
            <div v-for="gold in golds_type">
                <div>
                <img :src="`${gold.gold.gold.image}`" width="200">
                {{gold.gold.gold.name}}
                <br>
                {{gold.total_price}}
                <br>
                <a v-bind:href="'/product/detail/'+ gold.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    ดูรายละเอียด
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useUserStore
} from '@/stores/user.js'
import {
    useGoldStore
} from '@/stores/gold.js'
import {
    useGoldTypeStore
} from '@/stores/gold_type.js'
import {
    useGoldPatternStore
} from '@/stores/gold_pattern.js'
import {
    useGoldPriceStore
} from '@/stores/gold_price.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_type_store = useGoldTypeStore()
        const gold_pattern_store = useGoldPatternStore()
        const gold_price_store = useGoldPriceStore()
        const user_store = useUserStore()
        const gold_store = useGoldStore()
        return {
            auth_store,
            gold_type_store,
            gold_pattern_store,
            gold_price_store,
            user_store,
            gold_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            golds: [],
            golds_type: [],
            golds_type_price: [],
            gold_sell_price: {
                id: -1,
                buy_price: -1,
                sell_price: -1
            },
            t_weight: "-",
            customWeight: false,
            custom_Weight: "-",
            pattern_type: "-",
            gold_pattern: "-",
            g_size: "-",
            custom: "-",
            g_pattern: "-",
            disabledButton: false,
            sortD: false,
            sortA: false,
            sortN: false,
            sortO: false,
            l_price: null,
            h_price: null,
            


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
            
        },
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager" ||
                this.user.role == 'user') {
                console.log("authorized "+document.URL);
            } else {
                this.$router.push("/");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.gold_store.fetch()
        this.gold_sell_price = await this.gold_price_store.getLast()
        this.golds = this.gold_store.countLeftover()
        const name = this.$route.params.name
        this.getGold(name)
        this.totalPrice()
        await this.gold_pattern_store.fetch()
        this.gold_pattern = this.gold_pattern_store.getGoldPatterns
        this.gold_pattern.unshift({
            name: '-'
        })
    },
    methods: {
        getGold(name) {
            this.golds_type = []
            this.golds.forEach(element => {
                if(element.gold.gold_type.name == name){
                    this.golds_type.push(element)
                }
                
            });
            console.log(this.golds_type)
        },
        price(gold) {
          console.log(gold)
          var total
          var price = this.gold_sell_price.sell_price + ((gold.gold.pension_per_piece * 5)+500)
          if (gold.gold.weight == "ครึ้งสลึง" ||
              gold.gold.weight == "1 สลึง" ||
              gold.gold.weight == "2 สลึง" ||
              gold.gold.weight == "3 สลึง" ||
              gold.gold.weight == "6 สลึง" ||
              gold.gold.weight == "5 หุน") {
                total = price
            } else {
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
        totalPrice() {
            var total_price = 0
            var sort_array = []
            this.golds_type.forEach(e => {
                total_price = this.price(e)
                var obj = {
                    gold: e,
                    total_price: total_price
                }
                // if(this.l_price != null && this.h_price !=null) {
                //     if(total_price >= this.l_price && total_price <= this.h_price){
                //         sort_array.push(obj)
                //     }
                // }
                
                sort_array.push(obj)
            })
            this.golds_type = sort_array
            console.log(this.golds_type)

        },
        typeWeight(weight) {
            this.customWeight = false
            var sort_array = []
            // const name = this.$route.params.name
            // this.getGold(name)
            // this.totalPrice()
            // console.log(this.golds_type)
            this.golds_type.forEach(e => {
                if(e.gold.gold.weight == weight) {
                    sort_array.push(e)
                }
            })
            this.golds_type = sort_array
            console.log(sort_array)
            console.log(this.golds_type)

        },
        cusWeight(weight) {
            this.t_weight = null
            var sort_array = []
            // const name = this.$route.params.name
            // this.getGold(name)
            // this.totalPrice()
            // console.log(this.golds_type)
            this.golds_type.forEach(e => {
                if(e.gold.gold.custom_weight != null) {
                    if(e.gold.gold.custom_weight == weight) {
                        sort_array.push(e)
                    }
                }
            })
            this.golds_type = sort_array
            console.log(sort_array)
            console.log(this.golds_type)
        },
        patternT(type) {
            var sort_array = []
            // const name = this.$route.params.name
            // this.getGold(name)
            // this.totalPrice()
            console.log(this.golds_type)
            this.golds_type.forEach(e => {
                if(e.gold.gold.pattern_type == type){
                    sort_array.push(e)
                }
            })
            this.golds_type = sort_array
            console.log(sort_array)
            console.log(this.golds_type)
        },
        pattern(pattern) {
            var sort_array = []
            console.log(pattern)
            this.golds_type.forEach(e => {
                console.log(e.gold.gold)
                console.log(e.gold.gold.gold_pattern.name)
                if(e.gold.gold.gold_pattern.name == pattern){
                    sort_array.push(e)
                }
            })
            this.golds_type = sort_array
            console.log(sort_array)
            console.log(this.golds_type)
        },
        size(size) {
            var sort_array = []
            console.log(size)
            console.log(this.golds_type)
            this.golds_type.forEach(e => {
                if(e.gold.gold.size == size){
                    sort_array.push(e)
                }
            })
            this.golds_type = sort_array
            console.log(sort_array)
            console.log(this.golds_type)

        },
        async filter(e) {
            await this.gold_store.fetch()
            this.golds = this.gold_store.countLeftover()
            const name = this.$route.params.name
            this.getGold(name)
            this.totalPrice()
            console.log(this.golds_type)
            if(this.t_weight != '-'){
                this.typeWeight(this.t_weight)
            }
            console.log(this.pattern_type)
            if(this.custom_Weight != '-'){
                this.cusWeight(this.custom_Weight)
            }
            if(this.pattern_type != '-'){
                this.patternT(this.pattern_type)
            }
            if(this.g_pattern != '-'){
                this.pattern(this.g_pattern)
            }
            if(this.g_size != '-'){
                this.size(this.g_size)
            }
            // this.t_weight = '-'
            // this.pattern_type = '-'
            // this.g_pattern = '-'
            // this.g_size = '-'
            // this.custom_Weight = '-'
        },
        sortASC() {  
            function compare(a,b){
                if (a.total_price < b.total_price) {
                    return -1;
                }
                else if (a.total_price > b.total_price) {
                    return 1;
                }
                else {
                    return 0;
                }

            }
            console.log(this.golds_type.sort(compare))
            return this.golds_type.sort(compare)
        },
        sortDESC() {
            function compare(a,b){
                if (a.total_price < b.total_price) {
                    return 1;
                }
                else if (a.total_price > b.total_price) {
                    return -1;
                }
                else {
                    return 0;
                }

            }
            console.log(this.golds_type.sort(compare))
            return this.golds_type.sort(compare)
        },
        sortNew() {
            function compare(a,b){
                if (a.gold.gold.import_date < b.gold.gold.import_date) {
                    return 1;
                }
                else if (a.gold.gold.import_date > b.gold.gold.import_date) {
                    return -1;
                }
                else {
                    return 0;
                }

            }
            console.log(this.golds_type.sort(compare))
            return this.golds_type.sort(compare)
        },
        sortOld() {
            function compare(a,b){
                if (a.gold.gold.import_date < b.gold.gold.import_date) {
                    return -1;
                }
                else if (a.gold.gold.import_date > b.gold.gold.import_date) {
                    return 1;
                }
                else {
                    return 0;
                }

            }
            console.log(this.golds_type.sort(compare))
            return this.golds_type.sort(compare)
        },
        rangePrice() {
            var sort_array = []
            this.golds_type.forEach(e => {
                if(this.l_price != null && this.h_price !=null) {
                    if(e.total_price >= this.l_price && e.total_price <= this.h_price){
                        sort_array.push(e)
                    }
                }
            })
            return this.golds_type = sort_array
        }

    }

}

</script>