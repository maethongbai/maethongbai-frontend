<template>
    <div class="pt-8 pb-8 flex items-center justify-center text-s1">
        <div class="card-white w-[1200px]">
            <div class=" w-[1200px] ">
                <p class="text-lg p-2 text-s1"> <b>หน้าหลัก > ประเภททอง > {{ $route.params.name }}</b> </p>
            </div>

            <div class="grid grid-cols-2">
                <div>
                    <div class="flex flex-col">
                        <div class="flex flex-row">
                            <h1 class="p-2">นำ้หนัก</h1>
                            <select  class="select-box w-[200px]" v-model="t_weight">
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
                        </div>
                        <div v-if="t_weight == 'นำ้หนักตามชั่ง'" class="flex flex-row">
                            <p class="p-2">นำ้หนักตามชั่ง</p>
                            <input class="text-field w-[200px]" type="text" v-model="custom_Weight" autocomplete="off">
                        </div>
                    </div>

                    <div class="flex flex-row">
                        <h1 class="p-2">ประเภทลาย</h1>
                        <select  class="select-box w-[200px]" v-model="pattern_type">
                            <option value="-">-</option>
                            <option value="ทองตัน">ตัน</option>
                            <option value="ทองโป่ง">โป่ง</option>
                        </select>
                    </div>

                    <div class="flex flex-row">
                        <h1 class="p-2">ชื่อลาย</h1>
                        <select class="select-box w-[200px]" v-model="g_pattern">
                        <option v-for="pattern in gold_pattern" :value="pattern.name">{{pattern.name }}</option>
                        </select>
                    </div>

                    <div class="flex flex-row">
                        <h1 class="p-2">ขนาด</h1>
                        <input class="text-field w-[200px]" type="text" v-model="g_size">

                        <!-- <p v-if="g_size != null" hidden>{{size(this.g_size)}}</p> -->
                    </div>

                    <div class="flex mt-2">
                        <button  @click="filter" :disabled="disabledButton" class="red-btn w-[200px] ml-10">
                            ค้นหา
                        </button>
                    </div>
                </div>
                <div>
                    <div class="flex flex-col">
                        <p class="text-left text-xl">เรียงโดย</p>
                        <div class="flex flex-row gap-1">
                            <button @click="sortASC()" class="red-btn m-2 w-[150px] mx-auto"> น้อยไปมาก </button>
                            <button @click="sortDESC()" class="red-btn m-2 w-[150px] mx-auto"> มากไปน้อย </button>
                            <button @click="sortNew()" class="red-btn m-2 w-[150px] mx-auto"> ใหม่ไปเก่า </button>
                            <button @click="sortOld()" class="red-btn m-2 w-[150px] mx-auto"> เก่าไปใหม่ </button>
                        </div>

                        <div>
                            <p class="p-2">ช่วงราคา</p>
                            <div class="flex flex-row">
                                <input class="text-field w-[150px]" type="number" v-model="l_price">
                            <label class="p-2 text-xl" > - </label>
                            <input class="text-field w-[150px]" type="number" v-model="h_price">
                            </div>

                            <button @click="rangePrice()" class="red-btn w-[200px] mt-2 ml-16"> ค้นหาช่วงราคา </button>
                        </div>
                        
                    </div>

                </div>

            </div>

        </div>
    </div>



    <div class="pt-8 pb-8 flex items-center justify-center text-s1">
        <div class="card-white w-[1200px] p-0">
            <div class="w-[1200px] h-[64px] bg-[#9B0000] rounded-t-lg">
                <p class="text-white text-xl ml-10 mt-5"><b>สินค้าทั้งหมด</b></p>
            </div>
            <div class="">
                <div class="grid grid-cols-6 gap-x-16 p-10 ">
                    <div v-for="gold in golds_type">
                        <div class="text-center w-[200px] flex flex-col ml-2">
                                <div class="w-[200] h-[200] border">
                                    <img :src="`${gold.gold.gold.image}`" width="180" height="180" class="mx-auto">
                                </div>
                                <p>{{gold.gold.gold.name}}</p>
                                <p class="text-[#9B0000]  mt-1 mb-1">฿{{gold.total_price.toLocaleString()}}</p>
                                <a v-bind:href="'/product/detail/'+ gold.gold.gold.id" class="red-btn text-s w-[150px] mx-auto">
                                    ดูรายละเอียด
                                </a>
                            </div>
                    </div>
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