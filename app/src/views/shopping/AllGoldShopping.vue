<template>
    <br>
    <div class="flex items-center justify-center">
        <div class="ml-4 mr-4 w-[1200px] ">
           <img src="@/assets/banner01.png">
        </div>
    </div>
    <br>

    <div>
        <div class="flex items-center justify-center">
            <div class=" w-[1200px] ">
                <p class="text-lg p-2 text-s1"> <b>หน้าหลัก > หน้าสินค้าทั้งหมด</b> </p>
            </div>
        </div>

        <div class="flex items-center justify-center">
            <div class="bg-[#9B0000] rounded-lg w-[1200px] pt-2 pb-5">
            <h1 class="text-xl text-white ml-2 p-3 pl-6">ประเภททอง</h1>

            <vue-horizontal responsive class="text-white">
                <a v-bind:href="'/shopping/'+ type.name" v-for="type in this.gold_type" class="w-[250px] h-[100px] text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-basket2 mx-auto m-2" viewBox="0 0 16 16">
                    <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z"/>
                    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z"/>
                    </svg>
                    {{type.name}}
                </a>
            </vue-horizontal>

        </div>

    </div>

    <div class="pt-8 pb-8 flex items-center justify-center text-s1">
        <div class="card-white w-[1200px]">
            <div>
                <div class="flex items-center justify-center">
                    <div class="bg-[#FFFFFF] rounded-lg w-[1200px]">
                        <p class="p-2 text-xl"><b>ตัวกรองและการเรียง</b></p>
                        <div class="grid grid-cols-2">
                            <div>
                                <p class="p-2 text-lg">- เรียงโดย</p>
                                <div class="flex flex-row gap-4 pl-6">
                                    <button @click="this.sortA = true , this.sortD = false , this.sortN = false,this.sortO = false,this.range_price = false" class="red-btn"> ราคาน้อยไปมาก </button>
                                    <button @click="this.sortD = true , this.sortA = false, this.sortN = false,this.sortO = false" class="red-btn"> ราคามากไปน้อย </button>
                                    <button @click="this.sortN = true , this.sortD = false , this.sortA = false,this.sortO = false" class="red-btn"> ใหม่สุด </button>
                                    <button @click="this.sortO = true,this.sortN = false , this.sortD = false , this.sortA = false" class="red-btn"> เก่าสุด </button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p class="p-2 text-lg">- ค้นหาตามช่วงราคา</p>
                                    <div class="flex flex-row">
                                        <input class="mx-3 text-field" type="number" step=".01" v-model="l_price">
                                        <label class="p-2"> ถึง </label>
                                        <input class="mx-3 text-field" type="number" step=".01" v-model="h_price">
                                        <p class="inline" v-if="checkPrice() == false">ราคาในช่วงไม่ถูกต้อง</p>
                                    </div>
                                </div>
                            </div>
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

            <div hidden>
                {{rangePrice()}}
                {{this.range_price = true}}
            </div>

            <div class="grid grid-cols-6 gap-x-16 p-5">
                <div v-if="this.sortA == false && this.sortD == false && this.sortN == false && this.sortO == false  && this.range_price == true" v-for="gold in this.sort_array">
                    <div class="text-center w-[200px] flex flex-col ml-2">
                        <div class="w-[200] h-[200] border">
                            <img :src="`${gold.gold.gold.image}`" width="180" height="180" class="mx-auto">
                        </div>
                        <p>{{gold.gold.gold.name}}</p>
                        <p class="text-[#9B0000]  mt-1 mb-1">฿{{gold.total_price}}</p>
                        <a v-bind:href="'/product/detail/'+ gold.gold.gold.id" class="red-btn text-s w-[150px] mx-auto">
                            ดูรายละเอียด
                        </a>
                    </div>
                </div>

                <section v-if="this.sortA == true" v-for="gold in sortASC()">
                    <div>
                        <div class="text-center w-[200px] flex flex-col ml-2">
                        <div class="w-[200] h-[200] border">
                            <img :src="`${gold.gold.gold.image}`" width="180" height="180" class="mx-auto">
                        </div>
                        <p>{{gold.gold.gold.name}}</p>
                        <p class="text-[#9B0000]  mt-1 mb-1">฿{{gold.total_price}}</p>
                        <a v-bind:href="'/product/detail/'+ gold.gold.gold.id" class="red-btn text-s w-[150px] mx-auto">
                            ดูรายละเอียด
                        </a>
                    </div>

                    </div>
                </section>

                <section v-if="this.sortD == true" v-for="gold in sortDESC()">
                    <div class="text-center w-[200px] flex flex-col ml-2">
                        <div class="w-[200] h-[200] border">
                            <img :src="`${gold.gold.gold.image}`" width="180" height="180" class="mx-auto">
                        </div>
                        <p>{{gold.gold.gold.name}}</p>
                        <p class="text-[#9B0000]  mt-1 mb-1">฿{{gold.total_price}}</p>
                        <a v-bind:href="'/product/detail/'+ gold.gold.gold.id" class="red-btn text-s w-[150px] mx-auto">
                            ดูรายละเอียด
                        </a>
                    </div>
                </section>

                <section v-if="this.sortN == true" v-for="gold in sortNew()">
                    <div class="text-center w-[200px] flex flex-col ml-2">
                        <div class="w-[200] h-[200] border">
                            <img :src="`${gold.gold.gold.image}`" width="180" height="180" class="mx-auto">
                        </div>
                        <p>{{gold.gold.gold.name}}</p>
                        <p>{{gold.gold.gold.import_date}}</p>
                        <p class="text-[#9B0000]  mt-1 mb-1">฿{{gold.total_price}}</p>
                        <a v-bind:href="'/product/detail/'+ gold.gold.gold.id" class="red-btn text-s w-[150px] mx-auto">
                            ดูรายละเอียด
                        </a>
                    </div>
                </section>

                <section v-if="this.sortO == true" v-for="gold in sortOld()">
                    <div class="text-center w-[200px] flex flex-col ml-2">
                        <div class="w-[200] h-[200] border">
                            <img :src="`${gold.gold.gold.image}`" width="180" height="180" class="mx-auto">
                        </div>
                        <p>{{gold.gold.gold.name}}</p>
                        <p>{{gold.gold.gold.import_date}}</p>
                        <p class="text-[#9B0000]  mt-1 mb-1">฿{{gold.total_price}}</p>
                        <a v-bind:href="'/product/detail/'+ gold.gold.gold.id" class="red-btn text-s w-[150px] mx-auto">
                            ดูรายละเอียด
                        </a>
                    </div>
                </section>

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
                // this.$router.push("/");
            }
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