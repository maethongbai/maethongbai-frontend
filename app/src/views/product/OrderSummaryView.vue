<template>
    <div class="pt-8 pb-8 flex items-center justify-center">
        <div class="card-white w-[1200px]">
            <div v-if="order_page == true">
                <div class="mb-4">
                    <!-- breadcrumb -->
                    <b>หน้าหลัก > หน้าสินค้าทั้งหมด > {{order.gold.name}} > สรุปการสั่งซื้อ</b>
                </div>

                <div class="grid grid-cols-2 flex mb-10">
                    <div class="mx-auto border">
                        <p class="mx-1 mb-3 font-normal text-gray-700">
                            รูปสินค้า
                            <img :src="`${order.gold.image}`" alt="ไม่พบรูปสินค้า" width="200">
                        </p>
                    </div>

                    <div class="text-s1">
                        <p class="text-xl mb-2"> <b>รายละเอียดสินค้า</b> </p>
                        <div class="border rounded-lg p-2">
                            <p class="p-2"> {{ order.gold.name }} </p>
                            <div class="flex flex-row">
                                <label for="gold.type" class="p-2">จำนวน</label>
                                <select class="text-field w-[150px]" v-model="select_count">
                                    <option disabled value="">กรุณาเลือกจำนวนชิ้น</option>
                                    <option v-for="count in gold_count_list" :value="count">{{ count }}</option>
                                </select>
                            </div>
                            <div class="flex flex-row">
                                <p class="p-2">ขนาด:</p>
                                <p class="ml-2 mr-2 p-2">{{ order.gold.size }}</p>
                                <div v-if="order.gold.gold_type != null">
                                <p class="p-2" v-if="order.gold.gold_type.name != 'แหวน'">
                                    เซนติเมตร</p>
                            </div>
                            </div>
                        
                            <p class="p-2"> ราคา: {{ gold_price }} </p>
                        </div>
                    </div>

                </div>

                </div>
                <div class="card-gray mt-2 mb-5">
                    <div>
                        <div v-if="address_page == true">
                            <p class="mx-1 mb-3 text-3xl text-gray-700">ที่อยู่จัดส่งสินค้า</p>
                            <p class="mx-3 my-3 font-normal text-gray-700"> {{ user.address }}</p>
                            <a v-if="user.address == null"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            v-bind:href="'/user/' + user.id + '/' + gold_id + '/edit_address'"    >
                                ใส่ที่อยู่
                                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                            <a v-else
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            v-bind:href="'/user/' + user.id + '/' + gold_id + '/edit_address'" >
                                แก้ไขที่อยู่
                                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                            <button
                            type="submit" @click="goToOrderPage()" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                                ย้อนกลับ
                            </button>
                            <button v-if="user.address != null"
                            type="submit" @click="goToPurchasePage()" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                                ดำเนินการขั้นตอนต่อไป
                            </button>
                        </div>
                        <div v-if=" purchase_page == true">
                            <p class="mx-1 mb-3 text-3xl text-gray-700">ชำระเงิน</p>
                            <p class="mx-3 my-3 font-bold text-gray-700 ">โอนเงินผ่านธนาคาร กรุงลอนดอน เลขบัญชี 08xxxxxxxx </p>
                            <div class="mx-3 my-3">
                                <img src="
                                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAADeCAAAAAB3DOFrAAACTElEQVR42u3aQY7DIAwF0Nz/0jPbkaqm3xgIUz1WVZsCjwUQ29fPV7cLDw8PDw8PDw/vMN4Vt7/Pv/73XW/3Y73+2pkbHh4e3k7eh602fubdkNVnOnPDw8PD28lLDoNkEoVNvDhKNDc8PDy8w3jVJZj1JB4eHt5/591fl5MQQ3JFxsPDwzuflw+ZX3+rS9kPlODh4eHt4XUSYKs/P5zfw8PDw2sXXVXLBZI0WDXpVSi6wsPDw1vAy1P4nYBstc+xFBoeHh7eft7cZNXYYdAv3sLDw8NbzaumteYy7sO+efoNDw8Pbyfvfop5icDYpPvHAB4eHt4JvDxBlbD7AYtpbwx4eHh4i3n5tXvsUOmMi4eHh/csrxOMSFJW/bBFeYnx8PDwFvOqG3QSvFhHxcPDwzuTVwXk1+UcmS90+Y0BDw8PbwEvJ1XDr/mvySGEh4eHdw4vvyLnm3v/Sr2wMgIPDw9viJd31wnprghk4OHh4T3Lq273cwsLxtJy0ZUaDw8PbxlvjNRJd1XTbHh4eHgn8Krh1CqpE5AdTI/h4eHhbeT10/95OcJY2DcaHQ8PD28xr5p86iT+xwIN1QJWPDw8vNW8asuXI/8mZ0c94OHh4S3mXXGrHhXVkG4nqIGHh4e3n1dN4fe3707P5WAEHh4e3jJe9eW/+t9q6cC0WAseHh7eo7zkm+Tq3CkRKAcj8PDw8I7hfSgbjUu1Zi0NHh4e3n7eWJp/DDAWDt4UxsXDw8PbmADLywLmHjZ4eHh4O3nf1/Dw8PDw8PDw8A5ovyNa6EwmGB12AAAAAElFTkSuQmCC
                                " width="200">
                            </div>
                            <p class="mx-3 my-3 font-bold text-gray-700 ">กรุณาอัพโหลดสลิป</p>
                            <div class="mx-3 my-3">
                                <input type="file" ref="fileInput" accept="image/*" v-on:change="onFileChange" id="file-input">
                                <img :src="`${order.slip_image}`" width="200">
                            </div>

                            <button
                            type="submit" @click="goToAddressPage()" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                                ย้อนกลับ
                            </button>
                            <button v-if="order.slip_image != null"
                            type="submit" @click="createOnlineSale()" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                                ยืนยันรายการสั่งซื้อ
                            </button>

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
                </div>
                <button type="submit" @click="goToAddressPage()" class="red-btn w-[200px] mx-auto ">
                    ดำเนินการขั้นตอนต่อไป
                </button>
        </div>
    </div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useGoldStore
} from '@/stores/gold.js'
import {
    useUserStore
} from '@/stores/user.js'
import {
    useGoldPatternStore
} from '@/stores/gold_pattern.js'
import {
    useGoldTypeStore
} from '@/stores/gold_type.js'
import {
    useGoldPriceStore
} from '@/stores/gold_price.js'
import {
    useOnlineSaleStore
} from '@/stores/onlineSale.js'
import {
    useRedemptionStore
} from '@/stores/redemption.js'
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
            order: {
                gold: {
                    id: null,
                    name: null,
                    gold_type: null,
                    weight: null,
                    pension_per_piece: null,
                    pattern_type: null,
                    gold_pattern: null,
                    size: null
                },
                gold_sell_price: {
                    id: -1,
                    buy_price: -1,
                    sell_price: -1
                },
                slip_image: null
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
            order_page: true,
            address_page: false,
            purchase_page: false,
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
                this.order.gold = response.data.data
                this.gold_id = this.order.gold.id
            }
        } catch (error) {
            console.error(error)
            this.error = error.message
        }
    },
    async mounted() {

        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            console.log(this.user)
            if (this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager") {
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
        this.user = this.user_store.findByPhone(this.user.phone)
        this.order.gold_sell_price = await this.gold_price_store.getLast()
        this.gold_list = this.gold_store.filterSellable()
        this.order.gold = this.gold_store.filterStockByID(this.gold_list, this.gold_id)
        this.order.id = this.online_sale_store.getNextID()
        this.gold_count = this.gold_store.countGoldList(this.order.gold)
        var count = 1
        this.gold_count_list = []
        while (count <= this.gold_count.count) {
            this.gold_count_list.push(count)
            count += 1
        }
        console.log(this.gold_count_list)
        if (this.order.gold.weight != null) {
            this.gold_weight = this.order.gold.weight
        } else {
            this.gold_weight = this.order.gold.custom_weight
        }
        this.gold_price = this.price(this.order.gold)
        this.total_gold_price = this.select_count * this.gold_price

    },
    methods: {
        price(gold) {
            var price = this.order.gold_sell_price.sell_price + ((gold.pension_per_piece * 5) + 500)
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
        async createOnlineSale() {
            this.disableButton = true
            var onlineSale = {
                gold_id: this.order.gold.id,
                sale_date: moment().format("YYYY-MM-DD"),
                gold_price: this.total_gold_price,   
                gold_sell_price_id: this.order.gold_sell_price.id,
                amount: this.select_count, 
                slip_image: this.order.slip_image,
                user_id: this.user.id
            }
            try {
                await this.online_sale_store.add(onlineSale)

                var sold = 0
                // console.log(this.gold_count)
                for (var gold of this.gold_count.gold_list) {
                    console.log(gold)
                    if (sold < this.select_count) {
                        if (gold.is_sold == false &&
                            gold.is_redemption == false) {
                                var temp_gold = {
                                    id: gold.id,
                                    is_sold: true
                                }
                                await this.gold_store.edit(temp_gold)
                            }
                    } else {
                        break
                    }
                }
                this.$router.push("/");

            } catch (error) {
                this.error = error.message
                console.error(error)
                this.disableButton = false
            }
        },
        goToAddressPage() {
            this.address_page = true
            this.order_page = false
            this.purchase_page = false

        },
        goToOrderPage() {
            this.address_page = false
            this.order_page = true
            this.purchase_page = false
        },
        goToPurchasePage() {
            this.address_page = false
            this.order_page = false
            this.purchase_page = true
        },
        onFileChange(e) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                this.order.slip_image = e.target.result
            }
            e.preventDefault()
        },
    }

}
</script>
