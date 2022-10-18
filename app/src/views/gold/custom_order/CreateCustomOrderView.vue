<template>
<div v-if='user.role == "employee" ||
    user.role == "account" ||
    user.role == "manager"'>
</div>

<div class="block my-5">
    <router-link to="/custom_order/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
</div>

<form @submit.prevent="createCustomOrder()">
    <div class="mx-3 my-3">
        <label class="mx-3">เลขบิล: {{custom_order.id}}</label>
    </div>
    <div class="mx-3 my-3">
        <label class="mx-3">ชื่องานสั่ง</label>
        <input class="mx-3" type="text" v-model="custom_order.name" autocomplete="off" required>
    </div>
    <div class="mx-3 my-3">
        <label class="mx-3">ประเภท/ลักษณะ</label>
        <input class="mx-3" type="text" v-model="custom_order.type" autocomplete="off" required>
    </div>
    <div class="mx-3 my-3">
        <label class="mx-3">น้ำหนัก</label>
        <input class="mx-3" type="number" v-model="temp_weight" autocomplete="off" required>
        <label class="mx-3">กรัม</label>
        <label class="mx-3 font-medium text-red-500" v-if="error_message == 'ค่าน้ำหนักต้องมีค่ามากกว่า 0'"> {{error_message}}</label>
    </div>
    <div class="mx-3 my-3">
        <label class="mx-3">ค่าแรง</label>
        <input class="mx-3" type="number" v-model="temp_wage" autocomplete="off" required>
        <label class="mx-3">บาท</label>
        <label class="mx-3 font-medium text-red-500" v-if="error_message == 'ค่าแรงต้องไม่เป็นค่าติดลบ'"> {{error_message}}</label>
    </div>
    <div class="mx-3 my-3">
        <label class="mx-3">ราคาทองตอนสั่ง: {{custom_order.gold_order_price.sell_price}} บาท</label>
    </div>
    <div class="mx-3 my-3">
        <label class="ml-3">ราคาเต็ม: </label>
        <label class="inline" v-if="checks.show_full_price == true">{{custom_order.full_price}} บาท</label>
        <label class="inline" v-else>-</label>
    </div>
    <div class="mx-3 my-3">
        <label class="mx-3">มัดจำ</label>
        <input class="mx-3" type="number" :disabled="checks.show_full_price != true" v-model="temp_deposit_amount" autocomplete="off" required>
        <label class="mx-3">บาท</label>
        <label class="mx-3 font-medium text-red-500" v-if="checks.show_deposit_amount_error == true">
            ค่ามัดจำต้องมีค่าระหว่าง {{custom_order.min_deposit_amount}} - {{custom_order.max_deposit_amount}} บาท</label>
    </div>
    <div class="mx-3 my-3">
        <label class="ml-3">ส่วนต่าง: </label>
        <label class="inline" v-if="checks.show_difference_amount == true">{{custom_order.difference_amount}} บาท</label>
        <label class="inline" v-else>-</label>
    </div>
    <div class="mx-3 my-3">
        <label class="mx-3">วันที่เสร็จ</label>
        <Datepicker v-model="custom_order.finish_date" :format="date_format"></Datepicker>
        <label class="mx-3 font-medium text-red-500" v-if="error_message == 'กรุณาเลือกวันที่เสร็จที่อยู่ในอนาคต'"> {{error_message}}</label>
    </div>
    <div class="mx-3 my-3">
        <label class="mx-3">วันที่สั่ง: {{dates.show_date}}</label>
    </div>
    <div class="mx-3 my-3">
        <label class="mx-3">ช่างที่รับผลิต</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="custom_order.custom_order_worker">
            <option disabled value="">กรุณาเลือกช่างที่รับผลิต</option>
            <option v-for="worker in options.custom_order_workers" :value="worker.name"> {{ worker.name }}</option>
        </select>
        <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="custom_order.custom_order_worker == ''">กรุณาเลือกช่างที่รับผลิต</label>
    </div>
    <label class="mx-3 my-3 font-medium text-red-500" v-if="error_message == 'กรุณาเลือกช่องทางการชำระเงินมัดจำ'"> {{error_message}}</label>
    <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
        ช่องทางการชำระมัดจำ
    </h5>
    <div class="mx-3 my-3">
        <input v-model="checks.credit_card_check" :disabled="checks.cash_check == true ||
                   checks.transfer_check == true ||
                   checks.valid_deposit_amount != true ||
                   custom_order.deposit_total_amount < 0" type="checkbox" class="brand">
        <label class="mx-3 my-3">บัตรเครดิต</label>
        <div v-if="checks.credit_card_check == true">
            <label class="mx-3 my-3">ประเภท</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="custom_order.credit_card.type">
                <option disabled value="">กรุณาเลือกประเภทบัตรเครดิต</option>
                <option v-for="card in options.credit_card_type" :value="card">{{ card }}</option>
            </select>
            <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="custom_order.credit_card.type == ''">กรุณาเลือกประเภทบัตรเครดิต</label>
            <div class="mb-3" v-if="custom_order.credit_card.type == 'อื่นๆ'">
                <label class="ml-3">ระบุประเภทบัตรเครดิต </label>
                <input class="mx-3 my-3" type="text" :required="custom_order.credit_card.type == 'อื่นๆ'" v-model="custom_order.credit_card.custom_type" autocomplete="off">
            </div>

            <label class="mx-3 my-3">ชื่อธนาคาร</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="custom_order.credit_card.bank_name">
                <option disabled value="">กรุณาเลือกชื่อธนาคาร</option>
                <option v-for="bank in options.credit_card_bank_name" :value="bank">{{ bank }}</option>
            </select>
            <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="custom_order.credit_card.bank_name == ''">กรุณาเลือกชื่อธนาคาร</label>
            <div class="mb-3" v-if="custom_order.credit_card.bank_name == 'อื่นๆ'">
                <label class="ml-3">ระบุชื่อธนาคาร </label>
                <input class="mx-3 my-3" type="text" :required="custom_order.credit_card.bank_name == 'อื่นๆ'" v-model="custom_order.credit_card.custom_bank_name" autocomplete="off">
            </div>
        </div>
    </div>
    <div class="mx-3 my-3">
        <input v-model="checks.cash_check" :disabled="checks.credit_card_check == true ||
                   checks.transfer_check == true ||
                   checks.valid_deposit_amount != true ||
                   custom_order.deposit_total_amount < 0" type="checkbox" class="brand">
        <label class="mx-3 my-3">เงินสด</label>
        <div v-if="checks.cash_check == true">
            <div>
                <label class="my-3 ml-3">ราคาสุทธิ: </label>
                <label class="inline" v-if="checks.valid_deposit_amount == true">{{custom_order.deposit_total_amount}} บาท</label>
                <label class="inline" v-else>-</label>
            </div>
            <div>
                <label class="mx-3 my-3">เงินที่ลูกค้าจ่าย</label>
                <input class="mx-3 my-3" type="text" :required="checks.cash_check != true" v-model="temp_paid_amount" autocomplete="off">
                <label class="mx-3 my-3">บาท</label>
                <label class="mx-3 font-medium text-red-500" v-if="error_message == 'ค่าเงินที่ลูกค้าจ่ายต้องไม่เป็นค่าติดลบ'"> {{error_message}}</label>
            </div>
            <div>
                <label class="my-3 ml-3">เงินทอน: </label>
                <label class="inline" v-if="checks.valid_paid_amount == true">{{custom_order.cash.change_amount}} บาท</label>
                <label class="inline" v-else>-</label>
            </div>
        </div>
    </div>
    <div class="mx-3 my-3">
        <input v-model="checks.transfer_check" :disabled="checks.credit_card_check == true ||
                   checks.cash_check == true ||
                   checks.valid_deposit_amount != true ||
                   custom_order.deposit_total_amount < 0" type="checkbox" class="brand">
        <label class="mx-3 my-3">โอน</label>
        <div v-if="checks.transfer_check == true">
            <div class="mx-3 my-3">
                <input type="file" ref="fileInput" accept="image/*" v-on:change="onFileChange" id="file-input">
                <img :src="`${custom_order.transfer.slip_image}`" width="200">
            </div>
            <label class="mx-3 font-medium text-red-500" v-if="error_message == 'กรุณาอัปโหลดรูปสลิป'"> {{error_message}}</label>
        </div>
    </div>
    <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
        ข้อมูลลูกค้าที่สั่ง
    </h5>
    <label class="mx-3 my-3 font-medium text-red-500" v-if="error_message == 'กรุณาค้นหาลูกค้าด้วยเบอร์โทร'"> {{error_message}}</label>
    <div class="mx-3 my-3">
        <label class="mx-3">เบอร์โทร</label>
        <input class="mx-3" type="text" v-model="custom_order.user_phone_search" autocomplete="off" required>
        <button @click="findUser" :disabled="disableButton" class="p-2 bg-green-400 border rounded-lg">
            ค้นหา
        </button>
        <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="checks.user_checked == false">ไม่มีผู้ใช้ที่ใช้เบอร์โทรนี้</label>
        <a v-bind:href="'/register'" v-if="checks.phone_user == false" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            ลงทะเบียน
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </a>
    </div>
    <div class="mx-3 my-3">
        <label class="ml-3">รหัสสมาชิก: </label>
        <label class="inline" v-if="custom_order.user.id != null">{{custom_order.user.id}}</label>
        <label class="inline" v-else>-</label>
    </div>
    <div class="mx-3 my-3">
        <label class="ml-3">ชื่อ: </label>
        <label class="inline" v-if="custom_order.user.first_name != null">{{custom_order.user.first_name}}</label>
        <label class="inline" v-else>-</label>
    </div>
    <div class="mx-3 my-3">
        <label class="ml-3">นามสกุล: </label>
        <label class="inline" v-if="custom_order.user.last_name != null">{{custom_order.user.last_name}}</label>
        <label class="inline" v-else>-</label>
    </div>
    <div class="mx-3 my-3">
        <label class="ml-3">เบอร์โทร: </label>
        <label class="inline" v-if="custom_order.user.phone != null">{{custom_order.user.phone}}</label>
        <label class="inline" v-else>-</label>
    </div>
    <button type="submit" :disabled="disableButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
        ยืนยันรายการสั่ง
    </button>
</form>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useCustomOrderStore
} from '@/stores/custom_order.js'
import {
    useGoldPriceStore
} from '@/stores/gold_price.js'
import {
    useCustomOrderWorkerStore
} from '@/stores/custom_order_worker.js'
import {
    useUserStore
} from '@/stores/user.js'
import moment from 'moment'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    setup() {
        const auth_store = useAuthStore()
        const custom_order_store = useCustomOrderStore()
        const gold_price_store = useGoldPriceStore()
        const custom_order_worker_store = useCustomOrderWorkerStore()
        const user_store = useUserStore()
        const date_format = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        }
        return {
            auth_store,
            custom_order_store,
            gold_price_store,
            custom_order_worker_store,
            user_store,
            date_format
        }
    },
    components: {
        Datepicker
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            disableButton: false,
            custom_order: {
                id: -1,
                name: null,
                type: null,
                weight: -1,
                wage: 0,
                gold_order_price: {
                    id: -1,
                    buy_price: -1,
                    sell_price: -1
                },
                full_price: -1,
                deposit_total_amount: null,
                difference_amount: -1,
                finish_date: "",
                order_date: null,
                delivery_date: "-",
                custom_order_worker: {
                    name: ""
                },
                user_phone_search: null,
                user: {
                    id: null,
                    first_name: null,
                    last_name: null,
                    phone: null
                },
                credit_card: {
                    type: null,
                    custom_type: null,
                    bank_name: null,
                    custom_bank_name: null
                },
                cash: {
                    paid_amount: null,
                    change_amount: null
                },
                transfer: {
                    slip_image: null
                },
                min_deposit_amount: -1,
                max_deposit_amount: -1
            },
            checks: {
                credit_card_check: false,
                cash_check: false,
                transfer_check: false,
                valid_deposit_amount: false,
                valid_paid_amount: false,
                show_full_price: false,
                show_difference_amount: false,
                custom_order_worker_check: true,
                user_checked: true,
                show_deposit_amount_error: false
            },
            temp_deposit_amount: null,
            temp_wage: null,
            temp_weight: null,
            temp_paid_amount: null,
            options: {
                custom_order_workers: [],
                credit_card_type: [
                    "Mastercard",
                    "VISA",
                    "Union Pay",
                    "American Express",
                    "อื่นๆ"
                ],
                credit_card_bank_name: [
                    "กสิกร",
                    "กรุงเทพ",
                    "กรุงไทย",
                    "กรุงศรี",
                    "ออมสิน",
                    "ไทยพาณิช",
                    "อื่นๆ"
                ]
            },
            dates: {
                show_date: "",
                input_date: ""
            },
            error_message: ""

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
        temp_deposit_amount: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (newValue >= this.custom_order.min_deposit_amount &&
                    newValue <= this.custom_order.max_deposit_amount) {
                    this.custom_order.deposit_total_amount = newValue
                    this.custom_order.difference_amount = this.custom_order.full_price - this.custom_order.deposit_total_amount
                    this.checks.valid_deposit_amount = true
                    this.checks.show_difference_amount = true
                } else {
                    this.custom_order.deposit_total_amount = -1
                    this.checks.show_difference_amount = false
                    this.checks.valid_deposit_amount = false
                }
            }
        },
        temp_paid_amount: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (newValue >= this.custom_order.deposit_total_amount) {
                    this.custom_order.cash.paid_amount = newValue
                    this.custom_order.cash.change_amount = this.custom_order.cash.paid_amount - this.custom_order.deposit_total_amount
                    this.checks.valid_paid_amount = true
                } else {
                    this.custom_order.cash.paid_amount = -1
                    this.checks.valid_paid_amount = false
                }
            }
        },
        temp_wage: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (newValue >= 0 &&
                    newValue != null) {
                    this.custom_order.wage = newValue
                    if (this.custom_order.weight > 0) {
                        this.custom_order.full_price = Number(Math.round(((this.custom_order.gold_order_price.sell_price / 15.16 * this.custom_order.weight) + this.custom_order.wage) + 'e2') + 'e-2')
                        this.checks.show_full_price = true
                        this.custom_order.min_deposit_amount = Number(Math.round((this.custom_order.full_price * 5 / 100) + 'e2') + 'e-2')
                        this.custom_order.max_deposit_amount = Number(Math.round((this.custom_order.full_price * 10 / 100) + 'e2') + 'e-2')
                    } else {
                        this.checks.show_full_price = false
                    }
                } else {
                    this.custom_order.wage = -1
                    this.checks.show_full_price = false
                }
            }
        },
        temp_weight: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (newValue > 0 &&
                    newValue != null) {
                    this.custom_order.weight = newValue
                    if (this.custom_order.wage >= 0) {
                        this.custom_order.full_price = Number(Math.round(((this.custom_order.gold_order_price.sell_price / 15.16 * this.custom_order.weight) + this.custom_order.wage) + 'e2') + 'e-2')
                        this.checks.show_full_price = true
                        this.custom_order.min_deposit_amount = Number(Math.round((this.custom_order.full_price * 5 / 100) + 'e2') + 'e-2')
                        this.custom_order.max_deposit_amount = Number(Math.round((this.custom_order.full_price * 10 / 100) + 'e2') + 'e-2')
                    } else {
                        this.checks.show_full_price = false
                    }
                } else {
                    this.custom_order.weight = -1
                    this.checks.show_full_price = false
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
        await this.custom_order_store.fetch()
        this.custom_order.id = this.custom_order_store.getNextID()
        await this.gold_price_store.fetch()
        this.custom_order.gold_order_price = await this.gold_price_store.getLast()
        this.dates.show_date = moment().format("DD/MM/YYYY")
        this.dates.input_date = moment().format("YYYY-MM-DD")
        this.custom_order.order_date = this.dates.input_date
        await this.custom_order_worker_store.fetch()
        this.options.custom_order_workers = this.custom_order_worker_store.getCustomOrderWorkers
        await this.user_store.fetch()

    },
    methods: {
        async createCustomOrder() {
            // validation (select)
            if (this.custom_order.custom_order_worker == null ||
                this.custom_order.custom_order_worker == "") {
                this.checks.custom_order_worker_check = false
                return
            }
            this.checks.custom_order_worker_check = true

            // validation (input & checkbox)
            if (this.temp_weight <= 0) {
                this.error_message = 'ค่าน้ำหนักต้องมีค่ามากกว่า 0'
                return
            }
            if (this.temp_wage < 0) {
                this.error_message = 'ค่าแรงต้องไม่เป็นค่าติดลบ'
                return
            }
            if (this.custom_order.deposit_total_amount < this.custom_order.min_deposit_amount ||
                this.custom_order.deposit_total_amount > this.custom_order.max_deposit_amount) {
                this.checks.show_deposit_amount_error = true
                return
            }
            this.checks.show_deposit_amount_error = false
            var finish_date = new Date(this.custom_order.finish_date)
            var today = new Date(moment()._d)
            if (finish_date.getTime() <= today.getTime()) {
                this.error_message = 'กรุณาเลือกวันที่เสร็จที่อยู่ในอนาคต'
                return
            }
            if (this.checks.credit_card_check == false &&
                this.checks.cash_check == false &&
                this.checks.transfer_check == false) {
                this.error_message = 'กรุณาเลือกช่องทางการชำระเงินมัดจำ'
                return
            }
            if (this.checks.cash_check == true) {
                if (this.temp_paid_amount < 0) {
                    this.error_message = 'ค่าเงินที่ลูกค้าจ่ายต้องไม่เป็นค่าติดลบ'
                    return
                }
            }
            if (this.checks.transfer_check == true) {
                if (this.custom_order.transfer.slip_image == null) {
                    this.error_message = 'กรุณาอัปโหลดรูปสลิป'
                    return
                }
            }
            if (this.custom_order.user.id == null ||
                this.checks.user_checked == false) {
                this.error_message = 'กรุณาค้นหาลูกค้าด้วยเบอร์โทร'
                return
            }

            // create custom order
            var custom_order_obj = {
                name: this.custom_order.name,
                type: this.custom_order.type,
                weight: this.custom_order.weight,
                wage: this.custom_order.wage,
                gold_order_price_id: this.custom_order.gold_order_price.id,
                full_price: this.custom_order.full_price,
                deposit_total_amount: this.custom_order.deposit_total_amount,
                difference_amount: this.custom_order.difference_amount,
                finish_date: finish_date.getFullYear() + '-' +
                             finish_date.getMonth() + '-'  +
                             finish_date.getDate(),
                order_date: this.dates.input_date,
                custom_order_worker_id: this.custom_order_worker_store.findByName(this.custom_order.custom_order_worker.name),
                deposit_payment_method: null,
                deposit_credit_card_type: null,
                deposit_bank_name: null,
                deposit_paid_amount: null,
                deposit_change_amount: null,
                deposit_slip_image: null,
                user_id: this.custom_order.user.id,
                employee_id: this.user.employee.id
            }
            if (this.checks.credit_card_check == true) {
                custom_order_obj.deposit_payment_method = "credit card"
                if (this.custom_order.credit_card.type == "อื่นๆ") {
                    custom_order_obj.deposit_credit_card_type = this.custom_order.credit_card.custom_type
                } else {
                    custom_order_obj.deposit_credit_card_type = this.custom_order.credit_card.type
                }
                if (this.custom_order.credit_card.bank_name == "อื่นๆ") {
                    custom_order_obj.deposit_bank_name = this.custom_order.credit_card.custom_bank_name
                } else {
                    custom_order_obj.deposit_bank_name = this.custom_order.credit_card.bank_name
                }
            } else if (this.checks.cash_check == true) {
                custom_order_obj.deposit_payment_method = "cash"
                custom_order_obj.deposit_paid_amount = this.custom_order.cash.paid_amount
                custom_order_obj.deposit_change_amount = this.custom_order.cash.change_amount
            } else if (this.checks.transfer_check == true) {
                custom_order_obj.deposit_slip_image = this.custom_order.transfer.slip_image
            }
            try {
                await this.custom_order_store.add(custom_order_obj)
                this.$router.push("/custom_order/view");
            } catch(error) {
                this.error = error
                console.error(error)
            }
            
        },
        onFileChange(e) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                this.custom_order.transfer.slip_image = e.target.result
            }
        },
        findUser(e) {
            var temp_user = this.user_store.findByPhone(this.custom_order.user_phone_search)
            if (temp_user == undefined ||
                temp_user == null) {
                this.custom_order.user.id = null
                this.custom_order.user.first_name = null
                this.custom_order.user.last_name = null
                this.custom_order.user.phone = null
                this.checks.user_checked = false
                e.preventDefault();
                return
            }
            this.custom_order.user.id = temp_user.id
            this.custom_order.user.first_name = temp_user.first_name
            this.custom_order.user.last_name = temp_user.last_name
            this.custom_order.user.phone = temp_user.phone
            this.checks.user_checked = true
            e.preventDefault();
        }
    }
}
</script>
