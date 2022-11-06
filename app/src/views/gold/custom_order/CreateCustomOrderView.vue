<template>
<div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    <div class="pt-8 pb-8 flex items-center justify-center">
        <div class="card-white w-[1200px] text-s1">
            <div class="m-4 mb-0">
                <!-- breadcrumb -->
                <b>หน้าหลักระบบหลังร้าน > รับซื้อทอง</b>
            </div>

            <form @submit.prevent="createCustomOrder()">
                <div class="flex flex-row">
                    <div class="m-3 p-2 mt-4">
                        <p>เลขที่ใบเสร็จ: {{ custom_order.id }}</p>
                    </div>

                    <div class="flex flex-row ml-auto m-3">
                        <p class="p-2 mr-2 mt-1">เบอร์โทร</p>
                        <input class="text-field w-[200px] bg-[#F5F5F5]" type="text" v-model="custom_order.user_phone_search" autocomplete="off" required>
                        <button @click="findUser" :disabled="disabledButton" class="red-btn w-[69px] h-[36px] ml-2 mt-1">
                            ค้นหา
                        </button>
                        <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="custom_order.user_phone_search == null">ไม่มีผู้ใช้ที่ใช้เบอร์โทรนี้</label>
                        <a v-bind:href="'/register'" v-if="custom_order.user_phone_search == null" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            ลงทะเบียน
                            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>


                </div>
                <div class="card-gray w-[1044px] mb-4 text-m">
                    <div class="grid grid-cols-2 text-base">
                        <div class="flex flex-col">
                            <p class="pt-2 pb-2 text-xl"><b>รายละเอียดลูกค้า</b></p>
                            <div class="flex flex-col gap-2">
                                <div class="flex flex-row pl-2">
                                    <p>รหัสลูกค้า: </p>
                                    <label class="ml-4" v-if="custom_order.user != null">{{custom_order.user.id}}</label>
                                    <label class="inline" v-else>-</label>
                                </div>

                                <div class="flex flex-row pl-2">
                                    <p>ชื่อ: </p>
                                    <label class="ml-4" v-if="custom_order.user != null">{{custom_order.user.first_name}}</label>
                                    <label class="inline" v-else>-</label>
                                </div>

                                <div class="flex flex-row pl-2">
                                    <p>นามสกุล: </p>
                                    <label class="ml-4" v-if="custom_order.user != null">{{custom_order.user.last_name}}</label>
                                    <label class="inline" v-else>-</label>
                                </div>
                            </div>

                            <p class="pt-2 pb-2 text-xl"><b>รายละเอียดงานสั่ง</b></p>

                            <div class="flex flex-row">
                                <label class="p-2">ชื่องานสั่ง</label>
                                <input class="text-field w-[350px] ml-auto mr-3" type="text" v-model="custom_order.name" autocomplete="off" required>
                            </div>

                            <div class="flex flex-row">
                                <label class="p-2">ประเภท/ลักษณะ</label>
                                <input class="text-field w-[350px] ml-auto mr-3" type="text" v-model="custom_order.type" autocomplete="off" required>
                            </div>

                            <div class="flex flex-row">
                                <label class="p-2">น้ำหนัก</label>
                                <input class="text-field w-[290px] ml-auto mr-3" step=".01" type="number" v-model="custom_order.custom_weight" autocomplete="off" required>
                                <label class="p-2 mr-4">กรัม</label>
                            </div>

                            <div class="flex flex-row">
                                <label class="p-2">ค่าแรง</label>
                                <input class="text-field w-[290px] ml-auto mr-3" step=".01" type="number" v-model="custom_order.wage" autocomplete="off" required>
                                <label class="p-2 mr-4">บาท</label>
                            </div>

                            <div class="flex flex-row">
                                <p class="p-2">ราคาทองตอนสั่ง: </p>
                                <p class=" p-2 ml-1 mr-3">{{custom_order.gold_order_price.sell_price}} บาท</p>
                            </div>

                            <div class="flex flex-row">
                                <p class="p-2">ราคาเต็ม: </p>
                                <p class=" p-2 pl-3 ml-12 mr-3">{{custom_order.full_price}} บาท</p>
                            </div>

                            <div class="flex flex-row">
                                <label class="p-2">มัดจำ</label>
                                <input class="text-field w-[290px] ml-auto mr-3" step=".01" type="number" v-model="custom_order.deposit_total_amount" autocomplete="off" required>
                                <label class="p-2 mr-4">บาท</label>
                            </div>

                            <div class="flex flex-row">
                                <p class="p-2">ส่วนต่าง: </p>
                                <p class=" p-2 pl-4 ml-12 mr-3">{{custom_order.difference_amount}} บาท</p>
                            </div>       
                        </div>

                        <div>
                            <div class="flex flex-row mt-2">
                                <label class="p-2">วันที่สั่ง: {{custom_order.order_date}}</label>
                            </div>
                            <div class="flex flex-row">
                                <label class="p-2">วันที่เสร็จคาดว่าจะเสร็จ: </label>
                                <Datepicker v-model="custom_order.finish_date"></Datepicker>
                            </div>
                            <div class="flex flex-row">
                                <label class="p-2">ช่างที่รับผลิต</label>
                                <select class="select-box w-[200px]" v-model="custom_order.custom_order_worker">
                                    <option v-for="worker in select.custom_order_workers" :value="worker.name"> {{ worker.name }}</option>
                                </select>
                            </div>
                            <p class="mt-4 pt-2 pb-2 text-xl"><b>ช่องทางการชำระมัดจำ</b></p>
                            <div class="mx-3 my-3">
                                <input v-model="select.payment_method" id="เงินสด" type="radio" value="เงินสด">
                                <label class="mx-3">เงินสด</label>
                                <input v-model="select.payment_method" id="โอน" type="radio" value="โอน">
                                <label class="mx-3">โอน</label>
                                <input v-model="select.payment_method" id="บัตรเครดิต" type="radio" value="บัตรเครดิต">
                                <label class="mx-3">บัตรเครดิต</label>
                            </div>

                            <div class="mx-3 my-3" v-if="select.payment_method == 'เงินสด'">
                                <div>
                                    <label class="my-3 ml-3">ราคาสุทธิ: {{custom_order.deposit_total_amount}} บาท</label>
                                </div>
                                <div class="flex flex-row">
                                    <label class="mx-3 my-3 pt-2">เงินที่ลูกค้าจ่าย</label>
                                    <input class="mx-3 my-3 text-field w-[200px]" type="text" :required="select.payment_method == 'เงินสด'" v-model="custom_order.cash.paid_amount" autocomplete="off">
                                    <label class="mx-3 my-3">บาท</label>
                                </div>
                                <div>
                                    <label class="my-3 ml-3">เงินทอน: {{custom_order.cash.change_amount}} บาท</label>
                                </div>
                            </div>

                            <div class="mx-3 my-3" v-if="select.payment_method == 'โอน'">
                                <div class="mx-3 my-3">
                                    <input type="file" ref="fileInput" accept="image/*" v-on:change="onFileChange" id="file-input">
                                    <img :src="`${custom_order.transfer.slip_image}`" width="200">
                                </div>
                            </div>

                            <div class="mx-3 my-3" v-if="select.payment_method == 'บัตรเครดิต'">
                                <label class="mx-3 my-3">ประเภท</label>
                                <select class="select-box w-[200px]" v-model="custom_order.credit_card.type">
                                    <option v-for="card in select.credit_card_type" :value="card">{{ card }}</option>
                                </select>
                                <div class="mb-3" v-if="custom_order.credit_card.type == 'อื่นๆ'">
                                    <label class="ml-3">ระบุประเภทบัตรเครดิต </label>
                                    <input class="mx-3 my-3" type="text" :required="custom_order.credit_card.type == 'อื่นๆ'" v-model="custom_order.credit_card.custom_type" autocomplete="off">
                                </div>
                                <label class="mx-3 my-3">ชื่อธนาคาร</label>
                                <select class="select-box w-[200px]" v-model="custom_order.credit_card.bank_name">
                                    <option v-for="bank in select.credit_card_bank_name" :value="bank">{{ bank }}</option>
                                </select>
                                <div class="mb-3" v-if="custom_order.credit_card.bank_name == 'อื่นๆ'">
                                    <label class="ml-3">ระบุชื่อธนาคาร </label>
                                    <input class="text-field w-[200px]" type="text" :required="custom_order.credit_card.bank_name == 'อื่นๆ'" v-model="custom_order.credit_card.custom_bank_name" autocomplete="off">
                                </div>
                            </div>
                            
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
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    setup() {
        const auth_store = useAuthStore()
        const custom_order_store = useCustomOrderStore()
        const gold_price_store = useGoldPriceStore()
        const custom_order_worker_store = useCustomOrderWorkerStore()
        const user_store = useUserStore()

        return {
            auth_store,
            custom_order_store,
            gold_price_store,
            custom_order_worker_store,
            user_store,
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            disableButton: false,
            custom_order: {
                id: null,
                name: null,
                type: null,
                custom_weight: null,
                wage: null,
                gold_order_price: {
                    id: null,
                    buy_price: null,
                    sell_price: null
                },
                full_price: "-",
                deposit_total_amount: "-",
                difference_amount: "-",
                finish_date: null,
                order_date: null,
                delivery_date: null,
                custom_order_worker: null,
                user_phone_search: "-",
                user: null,
                credit_card: {
                    type: null,
                    custom_type: null,
                    bank_name: null,
                    custom_bank_name: null
                },
                cash: {
                    paid_amount: null,
                    change_amount: "-"
                },
                transfer: {
                    slip_image: null
                },
            },
            select: {
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
                ],
                payment_method: null
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
        custom_order: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (newValue.custom_weight > 0 &&
                    newValue.wage >= 0) {
                    this.custom_order.full_price = Number(Math.round(((this.custom_order.gold_order_price.sell_price / 15.16 * this.custom_order.custom_weight) + this.custom_order.wage) + 'e2') + 'e-2')
                    if (newValue.deposit_total_amount >= 0 && newValue.deposit_total_amount <= newValue.full_price) {
                        this.custom_order.difference_amount = Number(Math.round((this.custom_order.full_price - this.custom_order.deposit_total_amount) + 'e2') + 'e-2')
                    } else {
                        this.custom_order.difference_amount = "-"
                    }
                } else {
                    this.custom_order.full_price = "-"
                }

                if (newValue.cash.paid_amount >= newValue.deposit_total_amount) {
                    this.custom_order.cash.change_amount = Number(Math.round((this.custom_order.cash.paid_amount - this.custom_order.deposit_total_amount) + 'e2') + 'e-2')
                } else {
                    this.custom_order.cash.change_amount = "-"
                }

                // console.log(newValue.custom_order_worker)
            }
        }
    },
    components: {
        Datepicker
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
        await this.gold_price_store.fetch()
        await this.custom_order_worker_store.fetch()
        await this.user_store.fetch()

        this.custom_order.id = this.custom_order_store.getNextID()
        this.custom_order.gold_order_price = await this.gold_price_store.getLast()
        this.custom_order.order_date = moment().format("YYYY-MM-DD")
        this.select.custom_order_workers = this.custom_order_worker_store.getCustomOrderWorkers
    },
    methods: {
        async createCustomOrder() {
            this.disableButton = true
            // validation
            this.input_check.errors = []
            this.input_check.is_valid = true
            if (this.custom_order.custom_weight <= 0) {
                this.input_check.errors.push("น้ำหนักต้องมีค่าเป็นบวก")
                this.input_check.is_valid = false
            }
            if (this.custom_order.wage < 0) {
                this.input_check.errors.push("ค่าแรงต้องไม่เป็นค่าติดลบ")
                this.input_check.is_valid = false
            }
            if (this.custom_order.full_price != "-") {
                // if there is full price, calculate
                // if not, skip
                var min_deposit = Number(Math.round((this.custom_order.full_price * 5 / 100) + 'e2') + 'e-2')
                var max_deposit = Number(Math.round((this.custom_order.full_price * 10 / 100) + 'e2') + 'e-2')
                if (this.custom_order.deposit_total_amount < min_deposit ||
                    this.custom_order.deposit_total_amount > max_deposit) {
                    this.input_check.errors.push("ค่ามัดจำต้องมีค่าระหว่าง " +
                        String(min_deposit) +
                        " - " + String(max_deposit) +
                        " บาท")
                    this.input_check.is_valid = false
                }
            } else {
                this.input_check.is_valid = false
            }
            if (this.custom_order.finish_date == null) {
                // if finish date is null, skip
                // else, check finish date
                this.input_check.errors.push("วันที่เสร็จต้องไม่เป็นค่าว่าง")
                this.input_check.is_valid = false
            } else {
                if (new Date(this.custom_order.finish_date) < moment()) {
                    // if finish date is before today
                    this.input_check.errors.push("วันที่เสร็จต้องไม่อยู่ในอดีต")
                    this.input_check.is_valid = false
                }
            }

            if (this.custom_order.custom_order_worker == null) {
                this.input_check.errors.push("กรุณาเลือกช่างที่รับผลิต")
                this.input_check.is_valid = false
            }
            if (this.select.payment_method == "บัตรเครดิต") {
                if (this.custom_order.credit_card.type == "อื่นๆ") {
                    // check custom type
                    if (this.custom_order.credit_card.custom_type == null) {
                        this.input_check.errors.push("กรุณาใส่ประเภทบัตรเครดิต")
                        this.input_check.is_valid = false
                    }
                } else if (this.custom_order.credit_card.type == null) {
                    // check type
                    this.input_check.errors.push("กรุณาเลือกประเภทบัตรเครดิต")
                    this.input_check.is_valid = false
                }
                if (this.custom_order.credit_card.bank_name == "อื่นๆ") {
                    // check custom bank name
                    if (this.custom_order.credit_card.custom_bank_name == null) {
                        this.input_check.errors.push("กรุณาใส่ชื่อธนาคาร")
                        this.input_check.is_valid = false
                    }
                } else if (this.custom_order.credit_card.bank_name == null) {
                    // check bank name
                    this.input_check.errors.push("กรุณาเลือกชื่อธนาคาร")
                    this.input_check.is_valid = false
                }
            } else if (this.select.payment_method == "เงินสด") {
                if (this.custom_order.deposit_total_amount != "-") {
                    // if there is full price, check paid amount
                    // if not, skip
                    if (this.custom_order.cash.paid_amount <= this.custom_order.deposit_total_amount) {
                        this.input_check.errors.push("เงินที่ลูกค้าจ่ายต้องมีค่ามากกว่าหรือเท่ากับราคาสุทธิ")
                        this.input_check.is_valid = false
                    }
                } else {
                    this.input_check.is_valid = false
                }
            } else if (this.select.payment_method == "โอน") {
                if (this.custom_order.transfer.slip_image == null) {
                    this.input_check.errors.push("กรุณาอัพโหลดรูปสลิป")
                    this.input_check.is_valid = false
                }
            } else {
                this.input_check.errors.push("กรุณาเลือกช่องทางการชำระมัดจำ")
                this.input_check.is_valid = false
            }

            if (this.custom_order.user == null) {
                this.input_check.errors.push("กรุณากรอกข้อมูลลูกค้าที่สั่ง")
                this.input_check.is_valid = false
            }

            if (this.input_check.is_valid == false) {
                this.disableButton = false
                return
            }

            var custom_order = {
                name: this.custom_order.name,
                type: this.custom_order.type,
                weight: this.custom_order.custom_weight,
                wage: this.custom_order.wage,
                gold_order_price_id: this.custom_order.gold_order_price.id,
                full_price: this.custom_order.full_price,
                deposit_total_amount: this.custom_order.deposit_total_amount,
                difference_amount: this.custom_order.difference_amount,
                finish_date: null,
                order_date: this.custom_order.order_date,
                custom_order_worker_id: this.custom_order_worker_store.findByName(this.custom_order.custom_order_worker).id,
                deposit_payment_method: null,
                deposit_credit_card_type: null,
                deposit_bank_name: null,
                deposit_paid_amount: null,
                deposit_change_amount: null,
                deposit_slip_image: null,
                user_id: this.custom_order.user.id,
                employee_id: this.user.employee.id
            }

            var date = new Date(this.custom_order.finish_date).toLocaleDateString().split("/")
            var year = String(date[2]).padStart(4, '0')
            var day = String(date[1]).padStart(2, '0')
            var month = String(date[0]).padStart(2, '0')
            var formatted_date = year + "-" + month + "-" + day
            custom_order.finish_date = formatted_date

            if (this.select.payment_method == 'บัตรเครดิต') {
                custom_order.deposit_payment_method = "credit card"
                if (this.custom_order.credit_card.type == "อื่นๆ") {
                    custom_order.deposit_credit_card_type = this.custom_order.credit_card.custom_type
                } else {
                    custom_order.deposit_credit_card_type = this.custom_order.credit_card.type
                }
                if (this.custom_order.credit_card.bank_name == "อื่นๆ") {
                    custom_order.deposit_bank_name = this.custom_order.credit_card.custom_bank_name
                } else {
                    custom_order.deposit_bank_name = this.custom_order.credit_card.bank_name
                }
            } else if (this.select.payment_method == 'เงินสด') {
                custom_order.deposit_payment_method = "cash"
                custom_order.deposit_paid_amount = this.custom_order.cash.paid_amount
                custom_order.deposit_change_amount = this.custom_order.cash.change_amount
            } else if (this.select.payment_method == 'โอน') {
                custom_order.deposit_payment_method = "transfer"
                custom_order.deposit_slip_image = this.custom_order.transfer.slip_image
            }

            try {
                await this.custom_order_store.add(custom_order)
                this.$router.push("/custom_order/view");
            } catch (error) {
                console.error(error.response.data)
            }
        },
        onFileChange(e) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                this.custom_order.transfer.slip_image = e.target.result
            }
            e.preventDefault()
        },
        findUser(e) {
            var temp_user = this.user_store.findByPhone(this.custom_order.user_phone_search)
            if (temp_user == undefined ||
                temp_user == null) {
                this.custom_order.user = null
                this.custom_order.user_phone_search = null
                e.preventDefault();
                return
            }
            this.custom_order.user = temp_user
            e.preventDefault();
        }
    }
}
</script>
