<template>
<div v-if='user.role == "employee" ||
    user.role == "account" ||
    user.role == "manager"'>
    <form @submit.prevent="editCustomOrder()">
        <div v-if="custom_order != null" class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เลขที่งานสั่ง: {{custom_order.id}}
            </p>
            <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
                ข้อมูลงานสั่ง
            </h5>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ประเภท/ลักษณะ: {{custom_order.type}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                น้ำหนัก: {{custom_order.weight}} กรัม
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ค่าแรง: {{custom_order.wage}} บาท
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ราคาเต็ม: {{custom_order.full_price}} บาท
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                มัดจำ: {{custom_order.deposit_total_amount}} บาท
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ส่วนต่าง: {{custom_order.difference_amount}} บาท
            </p>
            <div class="mx-1 mb-3 font-normal text-gray-700">
                <p class="inline">วันที่เสร็จ: </p>
                <p class="inline" v-if="custom_order.finish_date != null">{{custom_order.finish_date}}</p>
                <p class="inline" v-else>-</p>
            </div>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                วันที่สั่ง: {{custom_order.order_date}}
            </p>
            <div class="mx-1 mb-3 font-normal text-gray-700">
                <p class="inline">วันที่ส่งมอบ: </p>
                <p class="inline" v-if="custom_order.delivery_date != null">{{custom_order.delivery_date}}</p>
                <p class="inline" v-else>-</p>
            </div>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ช่างที่ผลิต: {{custom_order.custom_order_worker.name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ช่องทางการชำระเงินมัดจำ: {{custom_order.deposit_payment_method}}
            </p>
            <p v-if="custom_order.deposit_payment_method == 'transfer'" class="mx-1 mb-3 font-normal text-gray-700 ">
                สถานะโอนมัดจำ: {{custom_order.deposit_status}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                สถานะงานสั่ง: {{custom_order.custom_order_status}}
            </p>

            <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
                ข้อมูลลูกค้า
            </h5>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ชื่อ: {{custom_order.user.first_name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                นามสกุล: {{custom_order.user.last_name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เบอร์โทร: {{custom_order.user.phone}}
            </p>

            <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
                ช่องทางการชำระเงินส่วนต่าง
            </h5>
            <div class="mx-3 my-3">
                <input v-model="checks.cash_check" :disabled="checks.credit_card_check == true ||
                checks.transfer_check == true" type="checkbox">
                <label class="mx-3 my-3">เงินสด</label>
                <div v-if="checks.cash_check == true">
                    <div>
                        <label class="my-3 ml-3">ราคาสุทธิ: {{custom_order.difference_amount}} บาท</label>
                    </div>
                    <div>
                        <label class="mx-3 my-3">เงินที่ลูกค้าจ่าย</label>
                        <input class="mx-3 my-3" type="text" :required="checks.cash_check == true" v-model="temp_paid_amount" autocomplete="off">
                        <label class="mx-3 my-3">บาท</label>
                    </div>
                    <div>
                        <label class="my-3 ml-3">เงินทอน: </label>
                        <label class="inline" v-if="difference_values.cash.change_amount != null">{{difference_values.cash.change_amount}} บาท</label>
                        <label class="inline" v-else>-</label>
                    </div>
                </div>
            </div>
            <div class="mx-3 my-3">
                <input v-model="checks.credit_card_check" :disabled="checks.cash_check == true ||
                    checks.transfer_check == true" type="checkbox">
                <label class="mx-3 my-3">บัตรเครดิต</label>
                <div v-if="checks.credit_card_check == true">
                    <label class="mx-3 my-3">ประเภท</label>
                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="difference_values.credit_card.type">
                        <option disabled value="">กรุณาเลือกประเภทบัตรเครดิต</option>
                        <option v-for="card in options.credit_card_type" :value="card">{{ card }}</option>
                    </select>
                    <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="difference_values.credit_card.type == ''">กรุณาเลือกประเภทบัตรเครดิต</label>
                    <div class="mb-3" v-if="difference_values.credit_card.type == 'อื่นๆ'">
                        <label class="ml-3">ระบุประเภทบัตรเครดิต </label>
                        <input class="mx-3 my-3" type="text" :required="difference_values.credit_card.type == 'อื่นๆ'" v-model="difference_values.credit_card.custom_type" autocomplete="off">
                    </div>

                    <label class="mx-3 my-3">ชื่อธนาคาร</label>
                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="difference_values.credit_card.bank_name">
                        <option disabled value="">กรุณาเลือกชื่อธนาคาร</option>
                        <option v-for="bank in options.credit_card_bank_name" :value="bank">{{ bank }}</option>
                    </select>
                    <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="difference_values.credit_card.bank_name == ''">กรุณาเลือกชื่อธนาคาร</label>
                    <div class="mb-3" v-if="difference_values.credit_card.bank_name == 'อื่นๆ'">
                        <label class="ml-3">ระบุชื่อธนาคาร </label>
                        <input class="mx-3 my-3" type="text" :required="difference_values.credit_card.bank_name == 'อื่นๆ'" v-model="difference_values.credit_card.custom_bank_name" autocomplete="off">
                    </div>
                </div>
            </div>
            <div class="mx-3 my-3">
                <input v-model="checks.transfer_check" :disabled="checks.credit_card_check == true ||
                           checks.cash_check == true" type="checkbox">
                <label class="mx-3 my-3">โอน</label>
                <div v-if="checks.transfer_check == true">
                    <div class="mx-3 my-3">
                        <input type="file" ref="fileInput" accept="image/*" v-on:change="onFileChange" id="file-input">
                        <img :src="`${difference_values.transfer.slip_image}`" width="200">
                    </div>
                </div>
            </div>
            <button type="submit" :disabled="disableButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                ยืนยันการเปลี่ยนแปลง
            </button>
            <label v-if="input_check.is_valid == false" class="inline-block mx-1 mb-2 text-red-500 font-bold">
                ยืนยันการเปลี่ยนแปลงไม่สำเร็จ ตรวจสอบ error ข้างล่าง
            </label>
            <label v-if="input_check.is_valid == false" v-for="error in input_check.errors" class="block mx-3 font-medium text-red-500">
                - {{error}}
            </label>
        </div>
    </form>
</div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useCustomOrderStore
} from '@/stores/custom_order'
import moment from 'moment'

export default {
    setup() {
        const auth_store = useAuthStore()
        const custom_order_store = useCustomOrderStore()
        return {
            auth_store,
            custom_order_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            custom_order: null,
            custom_order_id: null,
            disableButton: false,
            difference_values: {
                payment_method: null,
                cash: {
                    paid_amount: null,
                    change_amount: null
                },
                credit_card: {
                    type: null,
                    custom_type: null,
                    bank_name: null,
                    custom_bank_name: null
                },
                transfer: {
                    slip_mage: null
                }
            },
            checks: {
                cash_check: false,
                credit_card_check: false,
                transfer_check: false
            },
            options: {
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
            temp_paid_amount: null,
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
        temp_paid_amount: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (this.custom_order != null &&
                    newValue >= this.custom_order.difference_amount) {
                    this.difference_values.cash.paid_amount = newValue
                    this.difference_values.cash.change_amount = this.difference_values.cash.paid_amount - this.custom_order.difference_amount
                } else {
                    this.difference_values.cash.change_amount = null
                }
            }
        }
    },
    async created() {
        const id = this.$route.params.id
        // api
        const url = `/custom_orders/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.custom_order = response.data.data
                this.custom_order_id = this.custom_order.id
                if (this.custom_order.delivery_date != null) {
                    this.$router.push("/custom_order/view");
                }
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
            if (this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager") {
                console.log("authorized " + document.URL);
            } else {
                this.$router.push("/custom_order/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
    },
    methods: {
        async editCustomOrder() {
            this.disableButton = true
            // validate
            this.input_check.errors = []
            this.input_check.is_valid = true

            if (this.checks.credit_card_check == true) {
                if (this.difference_values.credit_card.type == "อื่นๆ") {
                    // check custom type
                    if (this.difference_values.credit_card.custom_type == null) {
                        this.input_check.errors.push("กรุณาใส่ประเภทบัตรเครดิต")
                        this.input_check.is_valid = false
                    }
                } else if (this.difference_values.credit_card.type == null) {
                    // check type
                    this.input_check.errors.push("กรุณาเลือกประเภทบัตรเครดิต")
                    this.input_check.is_valid = false
                }
                if (this.difference_values.credit_card.bank_name == "อื่นๆ") {
                    // check custom bank name
                    if (this.difference_values.credit_card.custom_bank_name == null) {
                        this.input_check.errors.push("กรุณาใส่ชื่อธนาคาร")
                        this.input_check.is_valid = false
                    }
                } else if (this.difference_values.credit_card.bank_name == null) {
                    // check bank name
                    this.input_check.errors.push("กรุณาเลือกชื่อธนาคาร")
                    this.input_check.is_valid = false
                }
            } else if (this.checks.cash_check == true) {
                if (this.difference_values.cash.change_amount == null) {
                    this.input_check.errors.push("เงินที่ลูกค้าจ่ายต้องมีค่ามากกว่าหรือเท่ากับราคาสุทธิ")
                    this.input_check.is_valid = false
                }

            } else if (this.checks.transfer_check == true) {
                if (this.difference_values.transfer.slip_mage == null) {
                    this.input_check.errors.push("กรุณาอัพโหลดรูปสลิป")
                    this.input_check.is_valid = false
                }
            } else {
                this.input_check.errors.push("กรุณาเลือกช่องทางการชำระเงินส่วนต่าง")
                this.input_check.is_valid = false
            }

            if (this.input_check.is_valid == false) {
                this.disableButton = false
                return
            }

            var difference_values = {
                difference_payment_method: null,
                difference_paid_amount: null,
                difference_change_amount: null,
                difference_credit_card_type: null,
                difference_bank_name: null,
                difference_slip_image: null
            }
            if (this.checks.cash_check == true) {
                difference_values.difference_payment_method = 'cash'
                difference_values.difference_paid_amount = this.difference_values.cash.paid_amount
                difference_values.difference_change_amount = this.difference_values.cash.change_amount
            } else if (this.checks.credit_card_check == true) {
                difference_values.difference_payment_method = 'credit card'
                if (this.difference_values.credit_card.type = 'อื่นๆ') {
                    difference_values.difference_credit_card_type = this.difference_values.credit_card.custom_type
                } else {
                    difference_values.difference_credit_card_type = this.difference_values.credit_card.type
                }
                if (this.difference_values.credit_card.bank_name = 'อื่นๆ') {
                    difference_values.difference_bank_name = this.difference_values.credit_card.custom_bank_name
                } else {
                    difference_values.difference_bank_name = this.difference_values.credit_card.bank_name
                }
            } else if (this.checks.transfer_check == true) {
                difference_values.difference_slip_image = this.difference_values.transfer.slip_mage
            }

            try {
                await this.custom_order_store.editDeliveryDate(this.custom_order_id, moment().format("YYYY-MM-DD"))
                await this.custom_order_store.editDifferenceValues(this.custom_order_id, difference_values)
                this.$router.push("/custom_order/view")
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
    }
}
</script>
