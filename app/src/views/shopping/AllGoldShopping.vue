<template>
    <br>
    <div class="flex items-center justify-center">
        <div class="ml-4 mr-4 w-[1200px] ">
        <vue-horizontal responsive>
           <img src="@/assets/banner01.png">
           <img src="@/assets/banner02.png">
           <img src="@/assets/banner03.png">
        </vue-horizontal>
    </div>

    </div>
<br>

<div>
    <div class="flex items-center justify-center">
        <div class=" w-[1200px] ">
        <p class="text-base"> หน้าหลัก>หน้าสินค้าทั้งหมด </p>
        </div>
    </div>
    <div class="flex items-center justify-center">
        <div class="bg-[#9B0000] rounded-lg w-[1200px]">
        <h1 class="text-lg text-white ml-2">ประเภท</h1>
        <vue-horizontal responsive class="text-white ">
            <a v-bind:href="'/shopping/'+ type.name" v-for="type in this.gold_type" class="p-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-basket2 mx-auto m-2" viewBox="0 0 16 16">
                <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z"/>
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z"/>
                </svg>
            {{type.name}}
            </a>
        </vue-horizontal>
        </div>

    </div>
    <br>
    <div>
        <div class="flex items-center justify-center">
        <div class="bg-[#FFFFFF] rounded-lg w-[1200px]">
            <p class="ml-2">เรียงโดย</p>
        <button @click="this.sortA = true , this.sortD = false , this.sortN = false,this.sortO = false,this.range_price = false" class="px-4 py-2 rounded-lg bg-lime-400"> น้อยไปมาก </button>
        <button @click="this.sortD = true , this.sortA = false, this.sortN = false,this.sortO = false" class="px-4 py-2 rounded-lg bg-lime-400"> มากไปน้อย </button>
        <button @click="this.sortN = true , this.sortD = false , this.sortA = false,this.sortO = false" class="px-4 py-2 rounded-lg bg-lime-400"> ใหม่ไปเก่า </button>
        <button @click="this.sortO = true,this.sortN = false , this.sortD = false , this.sortA = false" class="px-4 py-2 rounded-lg bg-lime-400"> เก่าไปใหม่ </button>

        <br>
        <div>
            <p>ช่วงราคา</p>
        <input class="mx-3" type="number" step=".01" v-model="l_price">
        <label> - </label>
        <input class="mx-3" type="number" step=".01" v-model="h_price">
        <p class="inline" v-if="checkPrice() == false">ราคาในช่วงไม่ถูกต้อง</p>

        </div>
        </div>
        </div>
    
    </div>

    <div hidden>
        {{rangePrice()}}
        {{this.range_price = true}}
    </div>

    <div class="grid grid-cols-6 gap-x-16">
        <div v-if="this.sortA == false && this.sortD == false && this.sortN == false && this.sortO == false  && this.range_price == true" v-for="gold in this.sort_array">
            <div>
                <img :src="`${gold.gold.gold.image}`" width="200">
                {{gold.gold.gold.name}}
                <br>
                {{gold.total_price}}
                <br>
                <a v-bind:href="'/product/detail/'+ gold.gold.gold.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    ดูรายละเอียด
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>

            </div>
        </div>

        <section v-if="this.sortA == true" v-for="gold in sortASC()">
            <div>
                <img :src="`${gold.gold.gold.image}`" width="200">
                {{gold.gold.gold.name}}
                <br>
                {{gold.total_price}}
                <br>
                <a v-bind:href="'/shopping/'+ gold.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    ดูรายละเอียด
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>

            </div>
        </section>

        <section v-if="this.sortD == true" v-for="gold in sortDESC()">
            <div>
                <img :src="`${gold.gold.gold.image}`" width="200">
                {{gold.gold.gold.name}}
                <br>
                {{gold.total_price}}
                <br>
                <a v-bind:href="'/shopping/'+ gold.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    ดูรายละเอียด
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>

            </div>
        </section>

        <section v-if="this.sortN == true" v-for="gold in sortNew()">
            <div>
                <img :src="`${gold.gold.gold.image}`" width="200">
                {{gold.gold.gold.name}}
                <br>
                {{gold.total_price}}
                <br>
                {{gold.gold.gold.import_date}}
                <a v-bind:href="'/shopping/'+ gold.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    ดูรายละเอียด
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        </section>

        <section v-if="this.sortO == true" v-for="gold in sortOld()">
            <div>
                <img :src="`${gold.gold.gold.image}`" width="200">
                {{gold.gold.gold.name}}
                <br>
                {{gold.total_price}}
                <br>
                {{gold.gold.gold.import_date}}
                <a v-bind:href="'/shopping/'+ gold.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    ดูรายละเอียด
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        </section>

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
import VueHorizontal from "vue-horizontal";
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
            gold: [],
            golds_ID: [],
            golds_price: [],
            gold_sell_price: {
                id: -1,
                buy_price: -1,
                sell_price: -1
            },
            gold_type: [],
            count: 0,
            sortD: false,
            sortA: false,
            disableButton: false,
            sortN: false,
            sortO: false,
            l_price: null,
            h_price: null,
            sort_array: [],
            range_price: false,
            price_valid: true,
            banner:[]

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
                console.log("authorized " + document.URL);
            } else {
                this.$router.push("/");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.gold_store.fetch()
        this.golds = this.gold_store.countLeftover()
        this.gold_sell_price = await this.gold_price_store.getLast()
        await this.gold_type_store.fetch()
        this.gold_type = this.gold_type_store.getGoldTypes

    },
    components: {
        VueHorizontal
    },
    methods: {
        price(gold) {
            console.log(gold)
            var total
            var price = this.gold_sell_price.sell_price + ((gold.gold.pension_per_piece * 5) + 500)
            if (gold.gold.weight == "ครึ่งสลึง" ||
                gold.gold.weight == "1 สลึง" ||
                gold.gold.weight == "2 สลึง" ||
                gold.gold.weight == "3 สลึง" ||
                gold.gold.weight == "6 สลึง") {
                    var fprice = this.gold_sell_price.sell_price/4
                    if(gold.gold.weight == "ครึ่งสลึง"){
                       total = (fprice/2) + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "1 สลึง") {
                        total = fprice + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "2 สลึง") {
                        total = (fprice*2) + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "3 สลึง") {
                        total = (fprice*3) + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "6 สลึง") {
                        total = (fprice*6) + ((gold.gold.pension_per_piece * 5) + 500)
                    }
            } else if (gold.gold.custom_weight != null) {
                var pricee = this.gold_sell_price.sell_price/15.16
                total = pricee + ((gold.gold.pension_per_piece * 5) + 500)
                
            }else {
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
        sortASC() {
            if (this.checkPrice() == false) {
                return
            }

            function compare(a, b) {
                if (a.total_price < b.total_price) {
                    return -1;
                } else if (a.total_price > b.total_price) {
                    return 1;
                } else {
                    return 0;
                }

            }
            console.log(this.sort_array.sort(compare))
            return this.sort_array.sort(compare)
        },
        sortDESC() {
            if (this.checkPrice() == false) {
                return
            }

            function compare(a, b) {
                if (a.total_price < b.total_price) {
                    return 1;
                } else if (a.total_price > b.total_price) {
                    return -1;
                } else {
                    return 0;
                }

            }
            console.log(this.sort_array.sort(compare))
            return this.sort_array.sort(compare)
        },
        sortNew() {
            if (this.checkPrice() == false) {
                return
            }

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
        sortOld() {
            if (this.checkPrice() == false) {
                return
            }

            function compare(a, b) {
                if (a.gold.gold.import_date < b.gold.gold.import_date) {
                    return -1;
                } else if (a.gold.gold.import_date > b.gold.gold.import_date) {
                    return 1;
                } else {
                    return 0;
                }

            }
            console.log(this.sort_array.sort(compare))
            return this.sort_array.sort(compare)
        },
        rangePrice() {
            if (this.checkPrice() == false) {
                return
            }
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
        checkPrice() {
            this.price_valid = true

            // console.log(this.h_price)
            // console.log(this.l_price)
            if (this.l_price != null &&
                this.l_price != "" &&
                this.l_price != NaN &&
                this.l_price != undefined) {
                if (this.h_price != null &&
                    this.h_price != "" &&
                    this.h_price != NaN &&
                    this.h_price != undefined &&
                    this.h_price != 0) {
                    if (this.l_price > this.h_price) {
                        this.price_valid = false
                        return false
                    }
                    if (this.l_price < 0) {
                    this.price_valid = false
                    return false
                }
                }
                if (this.l_price < 0) {
                    this.price_valid = false
                    return false
                }
            }

            if (this.h_price != null &&
                    this.h_price != "" &&
                    this.h_price != NaN &&
                    this.h_price != undefined) {
                    if (this.h_price < 0) {
                        this.price_valid = false
                        return false
                    }
                }

            this.price_valid = true
            return true
        }
    }
}
</script>
