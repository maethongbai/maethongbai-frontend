<template>
<div v-if='user.role == "employee" ||
user.role == "account" ||
user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/custom_orders/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
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
        
        <div class="mx-1 mb-3 font-normal text-gray-700">
            <p class="inline">ช่องทางการชำระเงินส่วนต่าง: </p>
            <p class="inline" v-if="custom_order.difference_payment_method != null">{{custom_order.difference_payment_method}}</p>
            <p class="inline" v-else>-</p>
        </div>

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
        <label class="inline-block mx-1 mb-2 font-medium text-gray-900">สถานะงานสั่ง</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="order_status">
            <option disabled value="">กรุณาเลือกสถานะงานสั่ง</option>
            <option value="รับเรื่อง">รับเรื่อง</option>
            <option value="กำลังผลิต">กำลังผลิต</option>
            <option value="เสร็จสิ้น">เสร็จสิ้น</option>
            <option value="ยกเลิก">ยกเลิก</option>
        </select>
        <div v-if='user.role == "manager"'>
            <label class="inline-block mx-1 mb-2 font-medium text-gray-900">สถานะโอนมัดจำ</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="deposit_status">
                <option disabled value="">กรุณาเลือกสถานะโอนมัดจำ</option>
                <option value="ยังไม่ได้ตรวจสอบ">ยังไม่ได้ตรวจสอบ</option>
                <option value="ผ่านการตรวจสอบ">ผ่านการตรวจสอบ</option>
                <option value="ไม่ผ่านการตรวจสอบ">ไม่ผ่านการตรวจสอบ</option>
            </select>
        </div>
        <div v-if="custom_order.deposit_payment_method == 'credit card'">
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ประเภท: {{custom_order.type}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ธนาคาร: {{custom_order.type}}
            </p>
        </div>
        <div v-else-if="custom_order.deposit_payment_method == 'cash'">
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เงินที่ลูกค้าจ่าย: {{custom_order.type}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เงินทอน: {{custom_order.type}}
            </p>
        </div>
        <div v-else-if="custom_order.deposit_payment_method == 'transfer'">
            <p class="mx-1 mb-3 font-normal text-gray-700">
                รูปสลิป
                <img :src="`${custom_order.deposit_slip_image}`" alt="ไม่พบรูปสลิป" width="200">
            </p>
        </div>
        <div v-if='user.role == "manager"'>
            <label class="inline-block mx-1 mb-2 font-medium text-gray-900">สถานะโอนส่วนต่าง</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="difference_status">
                <option disabled value="">กรุณาเลือกสถานะโอนส่วนต่าง</option>
                <option value="ยังไม่ได้ตรวจสอบ">ยังไม่ได้ตรวจสอบ</option>
                <option value="ผ่านการตรวจสอบ">ผ่านการตรวจสอบ</option>
                <option value="ไม่ผ่านการตรวจสอบ">ไม่ผ่านการตรวจสอบ</option>
            </select>
        </div>
        <div v-if="custom_order.difference_payment_method == 'credit card'">
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ประเภท: {{custom_order.type}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ธนาคาร: {{custom_order.type}}
            </p>
        </div>
        <div v-else-if="custom_order.difference_payment_method == 'cash'">
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เงินที่ลูกค้าจ่าย: {{custom_order.type}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เงินทอน: {{custom_order.type}}
            </p>
        </div>
        <div v-else-if="custom_order.difference_payment_method == 'transfer'">
            <p class="mx-1 mb-3 font-normal text-gray-700">
                รูปสลิป
                <img :src="`${custom_order.difference_slip_image}`" alt="ไม่พบรูปสลิป" width="200">
            </p>
        </div>

        <button @click="saveCustomOrder()" class="px-4 py-2 rounded-lg bg-lime-400">
            ยืนยันการเปลี่ยนแปลง
        </button>
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
            deposit_status: null,
            order_status: null,
            difference_status: null
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
        async saveCustomOrder() {
            try {
                if (this.order_status == null ||
                this.order_status == "") {
                // do nothing
            } else {
                await this.custom_order_store.editOrderStatus (this.custom_order.id, this.order_status)
            }
            if (this.deposit_status == null ||
                this.deposit_status == "") {
                // do nothing
            } else {
                await this.custom_order_store.editDepositStatus (this.custom_order.id, this.deposit_status)
            }
            if (this.difference_status == null ||
                this.difference_status == "") {
                // do nothing
            } else {
                await this.custom_order_store.editDifferenceStatus (this.custom_order.id, this.difference_status)
            }
            this.$router.push("/custom_order/view")
            } catch (error) {
                console.log(error.response.data.message)
            }
            
        }
    }
}
</script>
