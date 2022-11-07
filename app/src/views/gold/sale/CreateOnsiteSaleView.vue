<template>
    <div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-4 mb-0">
                <!-- breadcrumb -->
                <b>หน้าหลักระบบหลังร้าน > ขายทอง</b>
                <form @submit.prevent="createOnsiteSale()">
                    <div class="flex flex-row">
                        <div class="m-3 p-2 mt-4">
                            <p>เลขที่ใบเสร็จ: {{ onsiteSale.id }}</p>
                        </div>

                        <div class="flex flex-row ml-auto m-3">
                            <p class="p-2 mr-2 mt-1">เบอร์โทร</p>
                            <input class="text-field w-[200px] bg-[#F5F5F5]" type="text" v-model="onsiteSale.user.phone" autocomplete="off" required>
                            <button @click="findUser" :disabled="disabledButton" class="red-btn w-[69px] h-[36px] ml-2 mt-1">
                                ค้นหา
                            </button>
                            <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="checks.phone_user == false">ไม่มีผู้ใช้ที่ใช้เบอร์โทรนี้</label>
                            <a v-bind:href="'/register'" v-if="checks.phone_user == false" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                ลงทะเบียน
                                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="card-gray w-[1044px] mb-4">
                        <div class="grid grid-cols-2">
                            <div class="flex flex-col">
                                <p class="pt-2 pb-2 text-xl"><b>รายละเอียดลูกค้า</b></p>
                                <div class="flex flex-col gap-2">
                                    <div class="flex flex-row pl-2">
                                        <p>รหัสลูกค้า: </p>
                                        <label class="ml-4" v-if="onsiteSale.user.id != null">{{onsiteSale.user.id}}</label>
                                        <label class="inline" v-else>-</label>
                                    </div>

                                    <div class="flex flex-row pl-2">
                                        <p>ชื่อ: </p>
                                        <label class="ml-4" v-if="onsiteSale.user.first_name != null">{{onsiteSale.user.first_name}}</label>
                                        <label class="inline" v-else>-</label>
                                    </div>

                                    <div class="flex flex-row pl-2">
                                        <p>นามสกุล: </p>
                                        <label class="ml-4" v-if="onsiteSale.user.last_name != null">{{onsiteSale.user.last_name}}</label>
                                        <label class="inline" v-else>-</label>
                                    </div>
                                </div>
                                <p class="pt-2 pb-2 text-xl"><b>รายละเอียดทองที่รับซื้อ</b></p>
                                <div class="flex flex-row text-base mb-2">
                                    <label class="p-2">รหัสสินค้า</label>
                                    <input class="text-field w-[200px]" type="text" v-model="onsiteSale.gold.id" autocomplete="off" required>
                                    <button @click="findGold" :disabled="disabledButton" class="red-btn ml-2">
                                        ค้นหา
                                    </button>
                                </div>
                                <div class="text-base">
                                    <p class="mx-3" v-if="onsiteSale.gold.id != null">รหัสสินค้า: {{onsiteSale.gold.id_show}}</p>
                                    <p class="mx-3" v-else>รหัสสินค้า: -</p>
                                    <p class="mx-3" v-if="onsiteSale.gold.name != null">ชื่อสินค้า: {{onsiteSale.gold.name}}</p>
                                    <p class="mx-3" v-else>ชื่อสินค้า: -</p>
                                    <p class="mx-3" v-if="onsiteSale.gold.gold_type != null">ประเภทสินค้า: {{onsiteSale.gold.gold_type.name}}</p>
                                    <p class="mx-3" v-else>ประเภทสินค้า: -</p>
                                    <div v-if="onsiteSale.gold.custom_weight == null">
                                        <p class="mx-3" v-if="onsiteSale.gold.weight != null">นำ้หนักสินค้า: {{onsiteSale.gold.weight}}</p>
                                        <p class="mx-3" v-else>นำ้หนักสินค้า: -</p>
                                    </div>
                                    <div v-if="onsiteSale.gold.weight == null">
                                        <p class="mx-3" v-if="onsiteSale.gold.custom_weight != null">นำ้หนักสินค้า: {{onsiteSale.gold.custom_weight}}</p>
                                        <p class="mx-3" v-else>นำ้หนักสินค้า: -</p>
                                    </div>
                                    <p class="mx-3" v-if="onsiteSale.gold.size != null">ขนาดสินค้า: {{onsiteSale.gold.size}}</p>
                                    <p class="mx-3" v-else>ขนาดสินค้า: -</p>
                                    <p class="mx-3">วันที่ขาย: {{showDate}}</p>
                                    <p class="mx-3" v-if="onsiteSale.gold_sell_price != null">ราคาทอง ณ เวลาขาย: {{onsiteSale.gold_sell_price.sell_price}} </p>
                                    <p class="mx-3" v-else>ราคาทอง ณ เวลาขาย: -</p>
                                    <div class="flex flex-row">
                                        <label class="p-2"> ราคาสินค้า </label>
                                        <input class="text-field w-[250px]" type="number" step=".01" v-model="onsiteSale.gold_price" autocomplete="off" required>
                                        <p class="p-2">บาท</p>
                                    </div>
                                </div>

                            </div>
                            <div class="flex flex-col">
                                <div class="flex flex-row">
                                    <input v-model="is_switch_gold" id="เปลี่ยน" type="checkbox" value="เปลี่ยน" class="mt-2 mr-2">
                                    <label class="">ทองเปลี่ยน</label>
                                </div>
                                <div v-if="is_switch_gold == true" class="flex flex-col text-base">
                                    <div class="flex flex-row">
                                        <label class="p-2">ระบุเลขที่บิลรับซื้อ</label>
                                        <input class=" text-field mr-2 w-[150px] h-[30px]" type="text" v-model="redemption.id" autocomplete="off">
                                        <button @click="findRedemption" :disabled="disabledButton" class="red-btn text-base">
                                            ค้นหา
                                        </button>
                                    </div>
                                    <label v-if="redemption.found == true" class="inline-block mx-3">>>> พบเลขที่บิลรับซื้อท่ี {{redemption.id}}  </label>                      
                                </div>

                                <p class="pt-2 pb-2 text-xl mt-2"><b>ช่องทางการชำระเงิน</b></p>
                                <div class="">
                                    <label>ช่องทางการชำระเงิน</label>
                                    <input class="mx-3" v-model="onsiteSale.sale_payment_method.payment_method" id="cash" type="radio" value="cash">
                                    <label for="cash"> เงินสด </label>
                                    <input class="mx-3" v-model="onsiteSale.sale_payment_method.payment_method" id="transfer" type="radio" value="transfer">
                                    <label for="transfer"> โอน </label>
                                    <input class="mx-3" v-model="onsiteSale.sale_payment_method.payment_method" id="credit_card" type="radio" value="credit_card">
                                    <label for="credit_card"> บัตรเครดิต </label>
                                </div>
                                <p v-if="onsiteSale.sale_payment_method.payment_method == 'cash' ">
                                    <label>ราคาสุทธิ: {{onsiteSale.gold_price}}</label>
                                    <p>เงินที่ลูกค้าชำระ: </p>
                                    <input class="mx-3 text-field w-[200px]" type="number" v-model="change" autocomplete="off" required>
                                    <p>เงินทอน: </p>
                                    <label> {{ onsiteSale.sale_payment_method.paid_change}}</label>
                                </p>

                                <p v-if="onsiteSale.sale_payment_method.payment_method == 'transfer' ">
                                    <label class="mx-3">รูปสลิป</label>
                                    <input type="file" ref="fileInput" accept="image/*" v-on:change="onFileChange" id="file-input">
                                    <img :src="`${onsiteSale.sale_payment_method.slip_image}`" width="200">
                                </p>


                                <p v-if="onsiteSale.sale_payment_method.payment_method == 'credit_card' ">
                                    <label class="mx-3 my-3">ประเภทบัตรเครดิต</label>
                                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onsiteSale.sale_payment_method.credit_card_type">
                                        <option value="Mastercard">Mastercard</option>
                                        <option value="VISA">VISA</option>
                                        <option value="Union Pay">Union Pay</option>
                                        <option value="American Express">American Express</option>
                                        <option value="อื่นๆ">อื่นๆ</option>
                                    </select>

                                    <label class="mx-3 my-3">ธนาคาร</label>
                                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onsiteSale.sale_payment_method.bank_name">
                                        <option value="กสิกร">กสิกร</option>
                                        <option value="กรุงเทพ">กรุงเทพ</option>
                                        <option value="กรุงไทย">กรุงไทย</option>
                                        <option value="กรุงศรี">กรุงศรี</option>
                                        <option value="ออมสิน">ออมสิน</option>
                                        <option value="ไทยพาณิช">ไทยพาณิช</option>
                                        <option value="อื่นๆ">อื่นๆ</option>
                                    </select>
                                </p>
                        
                            </div>
                        </div>
                        <div class="text-center">
                                <button type="submit" :disabled="disableButton" class="red-btn w-[323px] mx-auto mt-2 mb-2">
                                    บันทึกรายการ
                                </button>
                                <label v-if="input_check.is_valid == false" class="inline-block mx-1 mb-2 text-red-500 font-bold">
                                    ยืนยันรายการสั่งไม่สำเร็จ ตรวจสอบ error ข้างล่าง
                                </label>
                                <label v-if="input_check.is_valid == false" v-for="error in input_check.errors" class="block mx-3 font-medium text-red-500">
                                    - {{error}}
                                </label>
                            </div>
                    </div>
                </form>
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
    useOnsiteSaleStore
} from '@/stores/onsiteSale.js'
import {
    useGoldPriceStore
} from '@/stores/gold_price.js'
import {
    useRedemptionStore
} from '@/stores/redemption.js'
import moment from 'moment'
export default {
    setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        const gold_store = useGoldStore()
        const onsiteSale_store = useOnsiteSaleStore()
        const goldPrice_store = useGoldPriceStore()
        const redemption_store = useRedemptionStore()
        return {
            auth_store,
            user_store,
            gold_store,
            onsiteSale_store,
            goldPrice_store,
            redemption_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            disabledButton: false,
            change: null,
            price: null,
            onsiteSale: {
                id: -1,
                gold: {
                    id: null,
                    id_show: null,
                    name: null,
                    gold_type: null,
                    weight: null,
                    custom_weight: null,
                    pension_per_piece: null,
                    pattern_type: null,
                    size: null,
                    is_sold: null
                },
                gold_price: 0,
                sale_date: "",
                sale_payment_method: {
                    payment_method: [],
                    credit_card_type: null,
                    bank_name: null,
                    paid_amount: 0,
                    paid_change: 0,
                    slip_image: null,
                },
                user: {
                    id: null,
                    username: null,
                    first_name: null,
                    last_name: null,
                    phone: null,
                },
                gold_sell_price: {
                    id: -1,
                    buy_price: -1,
                    sell_price: -1
                }
            },
            checks: {
                phone_user: true
            },
            showDate: "",
            is_switch_gold: false,
            redemption: {
                id: null,
                found: false
            },
            input_check: {
                errors: [],
                is_valid: true
            }
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
        change: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                console.log("opaller")
                if (newValue > 0) {
                    this.onsiteSale.sale_payment_method.paid_amount = newValue
                    this.onsiteSale.sale_payment_method.paid_change = Number(Math.round(this.onsiteSale.sale_payment_method.paid_amount - this.onsiteSale.gold_price))
                } else {
                    this.onsiteSale.sale_payment_method.paid_amount = null
                }
            }
        },
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager") {
                console.log("authorized " + document.URL);

            } else {
                this.$router.push("/");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.onsiteSale_store.fetch()
        this.onsiteSale.id = this.onsiteSale_store.getNextID()
        await this.user_store.fetch()
        await this.gold_store.fetch()
        this.onsiteSale.gold_sell_price = await this.goldPrice_store.getLast()
        console.log(this.onsiteSale.gold_sell_price)
        this.showDate = moment().format("DD/MM/YYYY")
        var formattedDate = moment().format("YYYY-MM-DD")
        this.onsiteSale.sale_date = formattedDate
        await this.redemption_store.fetch()
    },
    methods: {
        async createOnsiteSale() {

            this.disableButton = true
            // validation
            this.input_check.errors = []
            this.input_check.is_valid = true

            if (this.onsiteSale.user.id == null) {
                this.input_check.errors.push("กรุณาค้นหาลูกค้า")
                this.input_check.is_valid = false
            }
            if (this.onsiteSale.gold.id_show == null) {
                this.input_check.errors.push("กรุณาค้นหาสินค้าที่ขาย")
                this.input_check.is_valid = false
            }
            if (this.onsiteSale.gold_price <= 0) {
                this.input_check.errors.push("ราคาสินค้าต้องเป็นจำนวนบวก")
                this.input_check.is_valid = false
            }
            if (this.is_switch_gold == true) {
                if (this.redemption.found == false) {
                    this.input_check.errors.push("กรุณาระบุเลขที่บิลรับซื้อ")
                    this.input_check.is_valid = false
                }
            }
            if (this.onsiteSale.gold.is_sold == true) {
                this.input_check.errors.push("ทองนี้ถูกขายไปแล้ว")
                this.input_check.is_valid = false
            }

            if (this.onsiteSale.sale_payment_method.payment_method == "cash") {
                if (this.onsiteSale.sale_payment_method.paid_change < 0) {
                    this.input_check.errors.push("เงินที่ลูกค้าชำระต้องมีค่ามากกว่าราคาสุทธิ")
                    this.input_check.is_valid = false
                }
            } else if (this.onsiteSale.sale_payment_method.payment_method == "transfer") {
                if (this.onsiteSale.sale_payment_method.slip_image == null) {
                    this.input_check.errors.push("กรุณาอัพโหลดรูปสลิป")
                    this.input_check.is_valid = false
                }
            } else if (this.onsiteSale.sale_payment_method.payment_method == "credit_card") {
                    if (this.onsiteSale.sale_payment_method.credit_card_type == null) {
                        this.input_check.errors.push("กรุณาเลือกประเภทบัตรเครดิต")
                        this.input_check.is_valid = false
                    }
                    if (this.onsiteSale.sale_payment_method.bank_name == null) {
                        this.input_check.errors.push("กรุณาเลือกธนาคาร")
                        this.input_check.is_valid = false
                    }
            } else {
                this.input_check.errors.push("กรุณาเลือกช่องทางการชำระเงิน")
                this.input_check.is_valid = false
            }

            if (this.input_check.is_valid == false) {
                this.disableButton = false
                return
            }

            var onsiteSale = {
                gold_id: this.onsiteSale.gold.id,
                sale_date: this.onsiteSale.sale_date,
                gold_price: this.onsiteSale.gold_price,
                payment_method: this.onsiteSale.sale_payment_method.payment_method,
                credit_card_type: null,
                bank_name: null,
                paid_amount: 0,
                paid_change: 0,
                is_switch_gold: this.is_switch_gold,
                slip_image: null,
                gold_sell_price_id: this.onsiteSale.gold_sell_price.id,
                employee_id: this.user.employee.id,
                user_id: this.onsiteSale.user.id,
                redemption_id: this.redemption.id
            }
            if (this.onsiteSale.sale_payment_method.payment_method == 'transfer') {
                onsiteSale.slip_image = this.onsiteSale.sale_payment_method.slip_image
            } else if (this.onsiteSale.sale_payment_method.payment_method == 'credit_card') {
                onsiteSale.credit_card_type = this.onsiteSale.sale_payment_method.credit_card_type
                onsiteSale.bank_name = this.onsiteSale.sale_payment_method.bank_name
            } else if (this.onsiteSale.sale_payment_method.payment_method == 'cash') {
                onsiteSale.paid_amount = this.onsiteSale.sale_payment_method.paid_amount
                onsiteSale.paid_change = this.onsiteSale.sale_payment_method.paid_change
            }
            try {
                var temp_gold = {
                    id: this.onsiteSale.gold.id,
                    is_sold: true
                }
                await this.onsiteSale_store.add(onsiteSale)
                await this.gold_store.edit(temp_gold)

                this.$router.push("/sale/view");

            } catch (error) {
                console.log(onsiteSale)
                this.error = error.message
                console.error(error.response.data)
            }

        },
        findUser(e) {
            var user = this.user_store.findByPhone(this.onsiteSale.user.phone)
            console.log(user)
            if (user == undefined ||
                user == null) {
                this.onsiteSale.user.id = null
                this.onsiteSale.user.username = null
                this.onsiteSale.user.first_name = null
                this.onsiteSale.user.last_name = null
                this.checks.phone_user = false
                tel.preventDefault();
                return
            }
            this.onsiteSale.user.id = user.id
            this.onsiteSale.user.username = user.username
            this.onsiteSale.user.first_name = user.first_name
            this.onsiteSale.user.last_name = user.last_name
            this.checks.phone_user = true
            e.preventDefault();
        },
        findGold(e) {
            var gold = this.gold_store.findByID(this.onsiteSale.gold.id)
            console.log(gold)
            if (gold == undefined ||
                gold == null) {
                this.onsiteSale.gold.id = null
                this.onsiteSale.gold.name = null
                id.preventDefault();
                return
            }

            this.onsiteSale.gold.id_show = gold.id
            this.onsiteSale.gold.name = gold.name
            this.onsiteSale.gold.gold_type = gold.gold_type
            this.onsiteSale.gold.weight = gold.weight
            this.onsiteSale.gold.custom_weight = gold.custom_weight
            this.onsiteSale.gold.pattern_type = gold.pattern_type
            this.onsiteSale.gold.size = gold.size
            this.onsiteSale.gold.pension_per_piece = gold.pension_per_piece
            this.onsiteSale.gold.is_sold = gold.is_sold

            var price = Number(Math.round(this.onsiteSale.gold_sell_price.sell_price + ((this.onsiteSale.gold.pension_per_piece * 5) + 500)))
            console.log(price)
            console.log(this.onsiteSale.gold.pension_per_piece)
            if (this.onsiteSale.gold.weight == "ครึ่งสลึง" ||
                this.onsiteSale.gold.weight == "1 สลึง" ||
                this.onsiteSale.gold.weight == "2 สลึง" ||
                this.onsiteSale.gold.weight == "3 สลึง" ||
                this.onsiteSale.gold.weight == "6 สลึง") {
                    var fprice = this.onsiteSale.gold_sell_price.sell_price/4
                    if(this.onsiteSale.gold.weight == "ครึ่งสลึง"){
                        this.onsiteSale.gold_price = (fprice/2) + ((this.onsiteSale.gold.pension_per_piece * 5) + 500)
                    } else if (this.onsiteSale.gold.weight == "1 สลึง") {
                        this.onsiteSale.gold_price = fprice + ((this.onsiteSale.gold.pension_per_piece * 5) + 500)
                    } else if (this.onsiteSale.gold.weight == "2 สลึง") {
                        this.onsiteSale.gold_price = (fprice*2) + ((this.onsiteSale.gold.pension_per_piece * 5) + 500)
                    } else if (this.onsiteSale.gold.weight == "3 สลึง") {
                        this.onsiteSale.gold_price = (fprice*3) + ((this.onsiteSale.gold.pension_per_piece * 5) + 500)
                    } else if (this.onsiteSale.gold.weight == "6 สลึง") {
                        this.onsiteSale.gold_price = (fprice*6) + ((this.onsiteSale.gold.pension_per_piece * 5) + 500)
                    }
            } else if (this.onsiteSale.gold.custom_weight != null) {
                var pricee = this.onsiteSale.gold_sell_price.sell_price/15.16
                this.onsiteSale.gold_price = pricee + ((this.onsiteSale.gold.pension_per_piece * 5) + 500)
                
            }
            else {
                if (this.onsiteSale.gold.weight == "1 บาท") {
                    this.onsiteSale.gold_price = price * 1
                } else if (this.onsiteSale.gold.weight == "2 บาท") {
                    this.onsiteSale.gold_price = price * 2
                } else if (this.onsiteSale.gold.weight == "3 บาท") {
                    this.onsiteSale.gold_price = price * 3
                } else if (this.onsiteSale.gold.weight == "4 บาท") {
                    this.onsiteSale.gold_price = price * 4
                } else if (this.onsiteSale.gold.weight == "5 บาท") {
                    this.onsiteSale.gold_price = price * 5
                } else if (this.onsiteSale.gold.weight == "6 บาท") {
                    this.onsiteSale.gold_price = price * 6
                } else if (this.onsiteSale.gold.weight == "7 บาท") {
                    this.onsiteSale.gold_price = price * 7
                } else if (this.onsiteSale.gold.weight == "8 บาท") {
                    this.onsiteSale.gold_price = price * 8
                } else if (this.onsiteSale.gold.weight == "9 บาท") {
                    this.onsiteSale.gold_price = price * 9
                } else if (this.onsiteSale.gold.weight == "10 บาท") {
                    this.onsiteSale.gold_price = price * 10
                } else if (this.onsiteSale.gold.weight == "15 บาท") {
                    this.onsiteSale.gold_price = price * 15
                } else if (this.onsiteSale.gold.weight == "20 บาท") {
                    this.onsiteSale.gold_price = price * 20
                }
            }
            e.preventDefault();
        },
        findRedemption(e) {
            var redemption = this.redemption_store.findByID(this.redemption.id)
            console.log(redemption)
            if (redemption == undefined ||
                redemption == null) {
                this.redemption.id = null
                this.redemption.found = false
                e.preventDefault();
                return
            }
            this.redemption.found = true
            this.redemption.id = redemption.id
            e.preventDefault();
        },
        onFileChange(e) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                this.onsiteSale.sale_payment_method.slip_image = e.target.result
                console.log(this.image)
            }
        },
    }
}
</script>

<style>
</style>
