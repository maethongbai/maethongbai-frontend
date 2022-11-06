<template>
<div v-if='user.role == "employee" ||
user.role == "account" ||
user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/custom_order/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <div v-if="custom_order != null" class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
        <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            รายละเอียด
        </h5>
        <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
            ข้อมูลงานสั่ง
        </h5>
        <div v-if="user.role == 'manager'">
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เลขที่งานสั่ง: {{custom_order.id}}
            </p>
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
                <input class="mx-3" step=".01" type="number" v-model="custom_order.weight" autocomplete="off" required>
                <label class="mx-3">กรัม</label>
            </div>
            <div class="mx-3 my-3">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    ค่าแรง: {{custom_order.wage}} บาท
                </p>
            </div>
            <div class="mx-3 my-3">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    ราคาเต็ม: {{custom_order.full_price}} บาท
                </p>
            </div>
            <div class="mx-3 my-3">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    มัดจำ: {{custom_order.deposit_total_amount}} บาท
                </p>
            </div>
            <div class="mx-3 my-3">
                <label class="ml-3">ส่วนต่าง: {{custom_order.difference_amount}} บาท</label>
            </div>
            <div class="mx-3 my-3">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    วันที่สั่ง: {{custom_order.order_date}}
                </p>
            </div>
            <div class="mx-3 my-3">
                <label class="mx-3">วันที่เสร็จ</label>
                <Datepicker v-model="custom_order.finish_date"></Datepicker>
            </div>
            <div class="mx-1 mb-3 font-normal text-gray-700">
                <p class="inline">วันที่ส่งมอบ</p>
                <Datepicker v-model="custom_order.delivery_date"></Datepicker>
            </div>
            <div class="mx-3 my-3">
                <label class="mx-3">ช่างที่ผลิต</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="custom_order.custom_order_worker.name">
                    <option v-for="worker in select.custom_order_workers" :value="worker.name"> {{ worker.name }}</option>
                </select>
            </div>

        </div>
        <div v-else>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เลขที่งานสั่ง: {{custom_order.id}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ชื่องานสั่ง: {{custom_order.name}}
            </p>
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
        </div>
        <div>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ช่องทางการชำระเงินมัดจำ: {{custom_order.deposit_payment_method}}
            </p>
            <div v-if="custom_order.deposit_payment_method == 'credit card'">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    ประเภท: {{custom_order.deposit_credit_card_type}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    ธนาคาร: {{custom_order.deposit_bank_name}}
                </p>
            </div>
            <div v-else-if="custom_order.deposit_payment_method == 'cash'">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    เงินที่ลูกค้าจ่าย: {{custom_order.deposit_paid_amount}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    เงินทอน: {{custom_order.deposit_change_amount}}
                </p>
            </div>
            <div v-else-if="custom_order.deposit_payment_method == 'transfer'">
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    รูปสลิป
                    <img :src="`${custom_order.deposit_slip_image}`" alt="ไม่พบรูปสลิป" width="200">
                </p>
            </div>

            <div class="mx-1 mb-3 font-normal text-gray-700">
                <p class="inline">ช่องทางการชำระเงินส่วนต่าง: </p>
                <p class="inline" v-if="custom_order.difference_payment_method != null">{{custom_order.difference_payment_method}}</p>
                <p class="inline" v-else>-</p>
            </div>
            <div v-if="custom_order.difference_payment_method == 'credit card'">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    ประเภท: {{custom_order.difference_credit_card_type}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    ธนาคาร: {{custom_order.difference_bank_name}}
                </p>
            </div>
            <div v-else-if="custom_order.difference_payment_method == 'cash'">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    เงินที่ลูกค้าจ่าย: {{custom_order.difference_paid_amount}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    เงินทอน: {{custom_order.difference_change_amount}}
                </p>
            </div>
            <div v-else-if="custom_order.difference_payment_method == 'transfer'">
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    รูปสลิป
                    <img :src="`${custom_order.difference_slip_image}`" alt="ไม่พบรูปสลิป" width="200">
                </p>
            </div>

        </div>
        <div v-if="user.role == 'manager'">
            <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
                ข้อมูลลูกค้า
            </h5>
            <div class="mx-3 my-3">
                <label class="mx-3">เบอร์โทร</label>
                <input class="mx-3" type="text" v-model="user_phone_search" autocomplete="off" required>
                <button @click="findUser" :disabled="disableButton" class="p-2 bg-green-400 border rounded-lg">
                    ค้นหา
                </button>
            </div>
            <div class="mx-3 my-3">
                <label class="ml-3">รหัสสมาชิก: </label>
                <label class="inline" v-if="custom_order.user != null">{{custom_order.user.id}}</label>
                <label class="inline" v-else>-</label>
            </div>
            <div class="mx-3 my-3">
                <label class="ml-3">ชื่อ: </label>
                <label class="inline" v-if="custom_order.user != null">{{custom_order.user.first_name}}</label>
                <label class="inline" v-else>-</label>
            </div>
            <div class="mx-3 my-3">
                <label class="ml-3">นามสกุล: </label>
                <label class="inline" v-if="custom_order.user != null">{{custom_order.user.last_name}}</label>
                <label class="inline" v-else>-</label>
            </div>

        </div>
        <div v-else>
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
        </div>

        <label class="inline-block mx-1 mb-2 font-medium text-gray-900">สถานะงานสั่ง</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="custom_order.custom_order_status">
            <option value="รับเรื่อง">รับเรื่อง</option>
            <option value="กำลังผลิต">กำลังผลิต</option>
            <option value="เสร็จสิ้น">เสร็จสิ้น</option>
            <option value="ยกเลิก">ยกเลิก</option>
        </select>
        <div v-if='user.role == "manager" && custom_order.deposit_payment_method == "transfer"'>
            <label class="inline-block mx-1 mb-2 font-medium text-gray-900">สถานะโอนมัดจำ</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="custom_order.deposit_status">
                <option value="ยังไม่ได้ตรวจสอบ">ยังไม่ได้ตรวจสอบ</option>
                <option value="ผ่านการตรวจสอบ">ผ่านการตรวจสอบ</option>
                <option value="ไม่ผ่านการตรวจสอบ">ไม่ผ่านการตรวจสอบ</option>
            </select>
        </div>

        <div v-if='user.role == "manager" && custom_order.difference_payment_method == "transfer"'>
            <label class="inline-block mx-1 mb-2 font-medium text-gray-900">สถานะโอนส่วนต่าง</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="custom_order.difference_status">
                <option value="ยังไม่ได้ตรวจสอบ">ยังไม่ได้ตรวจสอบ</option>
                <option value="ผ่านการตรวจสอบ">ผ่านการตรวจสอบ</option>
                <option value="ไม่ผ่านการตรวจสอบ">ไม่ผ่านการตรวจสอบ</option>
            </select>
        </div>

        <button @click="saveCustomOrder()" class="px-4 py-2 rounded-lg bg-lime-400">
            ยืนยันการเปลี่ยนแปลง
        </button>
        <label v-if="input_check.is_valid == false" class="inline-block mx-1 mb-2 text-red-500 font-bold">
            ยืนยันการเปลี่ยนแปลงไม่สำเร็จ ตรวจสอบ error ข้างล่าง
        </label>
        <label v-if="input_check.is_valid == false" v-for="error in input_check.errors" class="block mx-3 font-medium text-red-500">
            - {{error}}
        </label>
    </div>
</div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useCustomOrderStore
} from '../../../stores/custom_order'
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
        const custom_order_worker_store = useCustomOrderWorkerStore()
        const user_store = useUserStore()
        return {
            auth_store,
            custom_order_store,
            custom_order_worker_store,
            user_store,
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            custom_order: null,
            custom_order_id: null,
            user_phone_search: "-",
            disableButton: false,
            select: {
                custom_order_workers: []
            },
            input_check: {
                errors: [],
                is_valid: true
            }
        }
    },
    components: {
        Datepicker
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
                if (newValue != null) {
                    if (newValue.weight > 0 &&
                        newValue.wage >= 0) {
                        this.custom_order.full_price = Number(Math.round(((this.custom_order.gold_order_price.sell_price / 15.16 * this.custom_order.weight) + this.custom_order.wage) + 'e2') + 'e-2')
                        if (newValue.deposit_total_amount >= 0 && newValue.deposit_total_amount <= newValue.full_price) {
                            this.custom_order.difference_amount = Number(Math.round((this.custom_order.full_price - this.custom_order.deposit_total_amount) + 'e2') + 'e-2')
                        } else {
                            this.custom_order.difference_amount = "-"
                        }
                    } else {
                        this.custom_order.full_price = "-"
                    }
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
                console.log(this.custom_order)
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

        await this.custom_order_worker_store.fetch()
        await this.user_store.fetch()

        this.select.custom_order_workers = this.custom_order_worker_store.getCustomOrderWorkers
        this.user_phone_search = this.custom_order.user.phone

    },
    methods: {
        async saveCustomOrder() {
            this.input_check.errors = []
            this.input_check.is_valid = true
            // validate
            if (this.custom_order.weight < 0) {
                this.input_check.errors.push("น้ำหนักต้องมีค่าเป็นบวก")
                this.input_check.is_valid = false
            }
            if (this.custom_order.delivery_date != null) {
                if (new Date(this.custom_order.delivery_date) < moment()) {
                    // if finish date is before today
                    this.input_check.errors.push("วันที่ส่งมอบต้องไม่อยู่ในอดีต")
                    this.input_check.is_valid = false
                }
            } else {
                this.input_check.errors.push("กรุณาใส่วันที่ส่งมอบ")
                this.input_check.is_valid = false
            }
            if (this.custom_order.user == null) {
                this.input_check.errors.push("กรุณากรอกข้อมูลลูกค้าที่สั่ง")
                this.input_check.is_valid = false
            }

            if (this.input_check.is_valid == false) {
                return
            }

            var custom_order = {
                name: this.custom_order.name,
                type: this.custom_order.type,
                weight: this.custom_order.weight,
                wage: this.custom_order.wage,
                gold_order_price_id: this.custom_order.gold_order_price.id,
                full_price: this.custom_order.full_price,
                deposit_total_amount: this.custom_order.deposit_total_amount,
                difference_amount: this.custom_order.difference_amount,
                finish_date: null,
                delivery_date: null,
                custom_order_worker_id: this.custom_order_worker_store.findByName(this.custom_order.custom_order_worker.name).id,
                user_id: this.custom_order.user.id,
                employee_id: this.user.employee.id,
                custom_order_status: this.custom_order.custom_order_status,
                deposit_status: this.custom_order.deposit_status,
                difference_status: this.custom_order.difference_status,
            }

            if (this.custom_order.finish_date != null) {
                var date = new Date(this.custom_order.finish_date).toLocaleDateString().split("/")
                var year = String(date[2]).padStart(4, '0')
                var day = String(date[1]).padStart(2, '0')
                var month = String(date[0]).padStart(2, '0')
                var formatted_date = year + "-" + month + "-" + day
                custom_order.finish_date = formatted_date
            }
            if (this.custom_order.delivery_date != null) {
                var date = new Date(this.custom_order.delivery_date).toLocaleDateString().split("/")
                var year = String(date[2]).padStart(4, '0')
                var day = String(date[1]).padStart(2, '0')
                var month = String(date[0]).padStart(2, '0')
                var formatted_date = year + "-" + month + "-" + day
                custom_order.delivery_date = formatted_date
            }
            try {
                await this.custom_order_store.edit(this.custom_order_id, custom_order)
                this.$router.push("/custom_order/view")
            } catch (error) {
                console.log(error.response.data)
            }

        },
        findUser(e) {
            var temp_user = this.user_store.findByPhone(this.user_phone_search)
            if (temp_user == undefined ||
                temp_user == null) {
                this.custom_order.user = null
                this.user_phone_search = null
                e.preventDefault();
                return
            }
            this.custom_order.user = temp_user
            e.preventDefault();
        }
    }
}
</script>
