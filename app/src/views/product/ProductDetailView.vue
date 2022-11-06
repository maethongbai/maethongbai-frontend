<template>
    <div v-if=" gold.is_sold == false " >
        <div class="grid grid-flow-col auto-cols-max">
            <div>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    รูปสินค้า
                    <img :src="`${gold.image}`" alt="ไม่พบรูปสินค้า" width="200">
                </p>
            </div>
            <div>
                <p class="mx-1 mb-3 text-3xl text-gray-700"> รายละเอียดสินค้า </p>
                <p class="mx-3 my-3 font-bold text-gray-700 "> {{ gold.name }} </p>
                <p class="mx-3 my-3 font-normal text-gray-700"> ประเภท: {{ gold.gold_type.name }}</p>
                <p class="mx-3 my-3 font-normal text-gray-700"> น้ำหนัก: {{ gold_weight }}</p>
                <p class="mx-3 my-3 font-normal text-gray-700"> ลาย: {{ gold.gold_pattern.name }}</p>
                <p class="ml-3 my-3  font-normal text-gray-700 inline" >ขนาด: {{ gold.size }}</p>
                <p class="font-normal text-gray-700 inline" v-if=" gold.gold_type.name != 'แหวน'"> เซนติเมตร </p>
                <p class="mx-3 my-3 font-normal text-gray-700"> ราคา: {{ gold_price }} </p>
                <a v-bind:href="'/product/purchase/'+ gold_id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        ซื้อเลย
                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </a>
            </div>
        </div>
</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useGoldStore } from '@/stores/gold.js'
import { useUserStore } from '@/stores/user.js'
import { useGoldPatternStore } from '@/stores/gold_pattern.js'
import { useGoldTypeStore } from '@/stores/gold_type.js'
import { useGoldPriceStore } from '@/stores/gold_price.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_store = useGoldStore()
        const user_store = useUserStore()
        const gold_pattern_store = useGoldPatternStore()
        const gold_type_store = useGoldTypeStore()
        const gold_price_store = useGoldPriceStore()
        return {
            auth_store,
            gold_store,
            user_store,
            gold_pattern_store,
            gold_type_store,
            gold_price_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            gold: {
                gold_type: {
                    name: null
                },
                gold_pattern: {
                    name: null
                },
                is_sold: false
            },
            gold_sell_price: {
                    id: -1,
                    buy_price: -1,
                    sell_price: -1
            },
            gold_weight: null,
            gold_id: null,
            gold_list: null,
            gold_price: null,
            disabledButton: false,
            error: null
        }
    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                // console.log(newValue.getAuth)
                this.auth = newValue.getAuth
                this.user = JSON.parse(newValue.getUser)
            }
        }
    },
    async created() {
        const id = this.$route.params.id
        // api
        const url = `/golds/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.gold = response.data.data
                console.log(this.gold)
                this.gold_id = this.gold.id
            }
        } catch (error) {
            console.error(error)
            this.error = error.message
        }
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth  = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "employee" 
               || this.user.role == "account" 
               || this.user.role == "manager") {
                console.log("authorized");
               } else {
                this.$router.push("/")
               }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }

        await this.user_store.fetch()
        await this.gold_store.fetch()
        this.gold_sell_price = await this.gold_price_store.getLast()
        this.gold_list = this.gold_store.filterSellable()
        this.gold = this.gold_store.filterStockByID(this.gold_list, this.gold_id)
        
        if ( this.gold.weight != null) {
            this.gold_weight = this.gold.weight 
        }else {
            this.gold_weight = this.gold.custom_weight
        }
        this.gold_price = this.price(this.gold)
    },
    methods: {
        price(gold) {
          var price = this.gold_sell_price.sell_price + ((gold.pension_per_piece * 5)+500)
          if (this.gold_weight == "ครึ่งสลึง" ||
                this.gold_weight == "1 สลึง" ||
                this.gold_weight == "2 สลึง" ||
                this.gold_weight == "3 สลึง" ||
                this.gold_weight == "6 สลึง" ) {
                return price
            } else {
                if (this.gold_weight  == "1 บาท") {
                    price = price * 1
                } else if (this.gold_weight == "2 บาท") {
                    price = price * 2
                } else if (this.gold_weight == "3 บาท") {
                    price = price * 3
                } else if (this.gold_weight == "4 บาท") {
                    price = price * 4
                } else if (this.gold_weight == "5 บาท") {
                    price = price * 5
                } else if (this.gold_weight == "6 บาท") {
                    price = price * 6
                } else if (this.gold_weight == "7 บาท") {
                    price = price * 7
                } else if (this.gold_weight == "8 บาท") {
                    price = price * 8
                } else if (this.gold_weight == "9 บาท") {
                    price = price * 9
                } else if (this.gold_weight == "10 บาท") {
                    price = price * 10
                } else if (this.gold_weight == "15 บาท") {
                    price = price * 15
                } else if (this.gold_weight == "20 บาท") {
                    price = price * 20
                }
            }
            return price
        },
        
    }

}


</script>