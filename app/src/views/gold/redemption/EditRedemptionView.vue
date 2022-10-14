<template>
<div v-if='user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <div v-if="redemption != null" class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
        <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            รายละเอียด
        </h5>
        <p class="mx-1 mb-3 font-normal text-gray-700 ">
            เลขบิล: {{redemption.id}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            เปอร์เซนต์ทอง: {{redemption.gold.percentage}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            ประเภท: {{redemption.gold.gold_type.name}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700" v-if="redemption.gold.weight != null">
            น้ำหนัก: {{redemption.gold.weight}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700" v-else>
            น้ำหนัก: {{redemption.gold.custom_weight}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            ลาย: {{redemption.gold.gold_pattern.name}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            ยี่ห้อทอง: {{redemption.gold.brand}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            วันที่รับซื้อ: {{redemption.redemption_date}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            ราคาทองตอนรับซื้อ: {{redemption.gold_redemption_price.buy_price}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            ราคาที่รับซื้อ: {{redemption.redemption_price}}
        </p>
        <label class="inline-block mx-1 mb-2 font-medium text-gray-900">สถานะตรวจสอบ:</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        v-model="redemption_check_status">
            <option disabled value="กรุณาเลือกสถานะตรวจสอบ">กรุณาเลือกสถานะตรวจสอบ</option>
            <option value="รอตรวจสอบ">รอตรวจสอบ</option>
            <option value="ผ่านการตรวจสอบ">ผ่านการตรวจสอบ</option>
            <option value="ไม่ผ่านการตรวจสอบ">ไม่ผ่านการตรวจสอบ</option>
            <option value="ยกเลิก">ยกเลิกรายการสั่งซื้อ</option>
        </select>
        <label class="inline-block mx-1 mb-2 font-medium text-red-500"
        v-if="check_status_check == false">กรุณาเลือกสถานะตรวจสอบ</label>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            พนักงาน: {{redemption.employee.nickname}}
        </p>
        <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
            ข้อมูลลูกค้า
        </h5>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            รหัสสมาชิก: {{redemption.user.id}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            ชื่อ: {{redemption.user.first_name}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            นามสกุล: {{redemption.user.last_name}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            เลขบัตรประชาชน: {{redemption.user.id_card_number}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            เบอร์โทร: {{redemption.user.phone}}
        </p>
        <p class="mx-1 mb-3 font-normal text-gray-700">
            ที่อยู่: {{redemption.user.address}}
        </p>
        <div>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                รูปบัตรประชาชน
                <img :src="`${redemption_searched.id_card_image}`" alt="ไม่พบรูปบัตรประชาชน" width="200">
            </p>
        </div>
        <button @click="saveRedemption()" class="px-4 py-2 rounded-lg bg-lime-400">
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
    useRedemptionStore
} from '@/stores/redemption.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const redemption_store = useRedemptionStore()
        return {
            auth_store,
            redemption_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            redemption: null,
            redemption_id: null,
            redemption_check_status: null,
            check_status_check: true
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
        const url = `/redemptions/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.redemption = response.data.data
                this.redemption_id = this.redemption.id
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
            if (this.user.role == "manager") {
                console.log("authorized "+document.URL);
            } else {
                this.$router.push("/redemption/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
    },
    methods: {
        async saveRedemption() {
            if (this.redemption_check_status == null ||
            this.redemption_check_status == "กรุณาเลือกสถานะตรวจสอบ") {
                this.check_status_check = false
                return
            }
            this.check_status_check = true
            await this.redemption_store.editCheckStatus (this.redemption_id, this.redemption_check_status)
            this.$router.push("/redemption/view")
        }
    }
}
</script>
