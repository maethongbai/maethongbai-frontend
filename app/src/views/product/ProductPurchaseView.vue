<template>
    <div v-if="purchase_page == true">
        <div class="grid grid-flow-col auto-cols-max">
            <div>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    รูปสินค้า
                    <img :src="`${onlineSale.gold.image}`" alt="ไม่พบรูปสินค้า" width="200">
                </p>
            </div>
            <div>
                <p class="mx-1 mb-3 text-3xl text-gray-700"> รายละเอียดสินค้า </p>
                <p class="mx-3 my-3 font-bold text-gray-700 "> {{ onlineSale.gold.name }} </p>
                <div class="mx-3 my-3">
                    <label for="gold.type" class="mx-3">จำนวน</label>
                    <select
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        v-model="select_count">
                        <option disabled value="">กรุณาเลือกจำนวนชิ้น</option>
                        <option v-for="count in gold_count_list" :value="count">{{ count }}</option>
                    </select>
                    <p class="ml-3 my-3  font-normal text-gray-700 inline">ขนาด: {{ onlineSale.gold.size }}</p>
                    <div v-if="onlineSale.gold.gold_type != null">
                        <p class="font-normal text-gray-700 inline" v-if="onlineSale.gold.gold_type.name != 'แหวน'">
                            เซนติเมตร </p>
                    </div>
                    <p class="mx-3 my-3 font-normal text-gray-700"> ราคา: {{ gold_price }} </p>
                    <button type="submit" @click="goToAddressPage()" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                        ดำเนินการขั้นตอนต่อไป
                    </button>
                </div>

            </div>
        </div>
    </div>
    <div>
    <div v-if="address_page == true">
        <p class="mx-1 mb-3 text-3xl text-gray-700">ที่อยู่จัดส่งสินค้า</p>
        <p class="mx-3 my-3 font-normal text-gray-700"> {{ user.address }}</p>
        <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            แก้ไขที่อยู่
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </a>
    </div>
        <div>
            <p class="mx-1 mb-3 text-3xl text-gray-700">สรุปการสั่งซื้อ</p>
            <p class="mx-3 my-3 font-bold text-gray-700 inline ">สินค้าทั้งหมด</p>
            <p class="mx-3 my-3 font-normal text-gray-700 inline ">{{ select_count }} ชิ้น</p>
            <br>
            <p class="mx-3 my-3 font-bold text-gray-700 inline">รวมยอดสั่งซื้อสินค้า</p>
            <p class="mx-3 my-3 font-semibold text-red-700 inline"> {{ total_gold_price }} บาท</p>
            <br>
            <p class="mx-3 my-3 font-normal text-gray-700 ">ค่าจัดส่งสินค้า ฟรี </p>
            <p class="mx-3 my-3 font-normal text-gray-700 ">ยอดสั่งซื้อสินค้าทั้งหมด {{ total_gold_price }} </p>
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
import { useOnlineSaleStore } from '@/stores/onlineSale.js'
import { useRedemptionStore } from '@/stores/redemption.js'
import moment from 'moment'

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_store = useGoldStore()
        const user_store = useUserStore()
        const gold_pattern_store = useGoldPatternStore()
        const gold_type_store = useGoldTypeStore()
        const gold_price_store = useGoldPriceStore()
        const online_sale_store = useOnlineSaleStore()
        const redemption_store = useRedemptionStore()
        return {
            auth_store,
            gold_store,
            user_store,
            gold_pattern_store,
            gold_type_store,
            gold_price_store,
            online_sale_store,
            redemption_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            onlineSale: {
                id: -1,
                gold: {
                    id: null,
                    id_show: null,
                    name: null,
                    gold_type: null,
                    weight: null,
                    pension_per_piece: null,
                    pattern_type: null,
                    gold_pattern: null,
                    name: null,
                    size: null,
                    is_sold: false,
                },
                gold_price: 0,
                sale_date: "",
                gold_sell_price: {
                    id: -1,
                    buy_price: -1,
                    sell_price: -1
                }
            },
            gold_weight: null,
            gold_id: -1,
            gold_list: [],
            gold_price: -1,
            gold_count: -1,
            select_count: 1,
            total_gold_price: null,
            gold_count_list: [],
            disabledButton: false,
            purchase_page: true,
            address_page: false,
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
        },
        select_count: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                this.total_gold_price = newValue * this.gold_price
                console.log(this.total_gold_price)

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
                this.onlineSale.gold = response.data.data
                this.gold_id = this.onlineSale.gold.id
            }
        } catch (error) {
            console.error(error)
            this.error = error.message
        }
    },
    async mounted() {
        // await this.auth_store.fetch()
        if (this.auth_store.isAuthen) {
            // await this.auth_store.fetch()
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            console.log(this.user)
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
        await this.online_sale_store.fetch()
        this.onlineSale.gold_sell_price = await this.gold_price_store.getLast()
        this.gold_list = this.gold_store.filterSellable()
        this.onlineSale.gold = this.gold_store.filterStockByID(this.gold_list, this.gold_id)
        this.onlineSale.id = this.online_sale_store.getNextID()
        this.gold_count = this.gold_store.countGold(this.onlineSale.gold)
        var formattedDate = moment().format("YYYY-MM-DD")
        this.onlineSale.sale_date = formattedDate
        var count = 1
        this.gold_count_list = []
        while (count <= this.gold_count.count) {
            this.gold_count_list.push(count)
            count += 1
        }
        console.log(this.gold_count_list)
        if (this.onlineSale.gold.weight != null) {
            this.gold_weight = this.onlineSale.gold.weight
        } else {
            this.gold_weight = this.onlineSale.gold.custom_weight
        }
        this.gold_price = this.price(this.onlineSale.gold)
        this.total_gold_price = this.select_count * this.gold_price
        console.log(this.onlineSale.gold.gold_type)

        this.user = this.user_store.findByPhone(this.user.phone)
    },
    methods: {
        price(gold) {
            var price = this.onlineSale.gold_sell_price.sell_price + ((gold.pension_per_piece * 5) + 500)
            if (this.gold_weight == "ครึ่งสลึง" ||
                this.gold_weight == "1 สลึง" ||
                this.gold_weight == "2 สลึง" ||
                this.gold_weight == "3 สลึง" ||
                this.gold_weight == "6 สลึง") {
                return price
            } else {
                if (this.gold_weight == "1 บาท") {
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
        // async createOnlineSale() {
        //     this.disableButton = true
        //     var onlineSale = {
        //         gold_id: this.onlineSale.gold.id,
        //         sale_date: this.onlineSale.sale_date,
        //         gold_price: this.total_gold_price,   
        //         amount: this.select_count, 
        //         sale_date: this.onlineSale.sale_date,
        //         gold_sell_price_id: this.onsiteSale.gold_sell_price.id,
        //         employee_id: this.user.employee.id,
        //         user_id: this.onsiteSale.user.id,
        //         redemption_id: this.redemption.id
        //     }
        //     try {
        //         await this.online_sale_store.add(onlineSale)
        //         this.$router.push("/home");

        //     } catch (error) {
        //         this.error = error.message
        //         console.error(error.response.data)
        //     }
        // },
        goToAddressPage() {
            this.address_page = true
            this.purchase_page = false

        }
    }


}
</script>