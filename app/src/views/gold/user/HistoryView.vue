<template>
<div v-if='auth_user != null'>
    <div class="block my-5">
        <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <div class="mx-3 my-3">
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="options.chosen_history">
            <option value="ประวัติทั้งหมด">ประวัติทั้งหมด</option>
            <option v-for="val in options.history" :value="val"> {{ val }}</option>
        </select>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        รายการ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อรายการ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ประเภทรายการ
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="val in histories" class="bg-white border-b hover:bg-gray-50"
                @click="setSearched(val)">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{val.id}}
                    </th>

                    <th v-if="val.type == 'ซื้อทองหน้าร้าน' || 
                                   val.type == 'ซื้อทองออนไลน์' || 
                                   val.type == 'ขายทอง' ||
                                   val.type == 'เปลี่ยน'" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{val.item.gold.name}}
                    </th>
                    <th v-else-if="val.type == 'งานสั่ง'" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{val.item.name}}
                    </th>

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{val.type}}
                    </th>
                </tr>
            </tbody>
        </table>
    </div>

    <div>
        <div v-if="searched_obj != null">
            <div v-if="searched_obj.type == 'ขายทอง'" class="py-5">
                <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
                    <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        รายละเอียด
                    </h5>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        เลขบิล: {{searched_obj.item.id}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        เปอร์เซนต์ทอง: {{searched_obj.item.gold.percentage}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        ประเภท: {{searched_obj.item.gold.gold_type.name}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700" v-if="redemption_searched.gold.weight != null">
                        น้ำหนัก: {{searched_obj.item.gold.weight}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700" v-else>
                        น้ำหนัก: {{searched_obj.item.gold.custom_weight}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        ลาย: {{searched_obj.item.gold.gold_pattern.name}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        ยี่ห้อทอง: {{searched_obj.item.gold.brand}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        วันที่รับซื้อ: {{searched_obj.item.redemption_date}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        ราคาทองตอนรับซื้อ: {{searched_obj.item.gold_redemption_price.buy_price}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        ราคาที่รับซื้อ: {{searched_obj.item.redemption_price}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        สถานะตรวจสอบ: {{searched_obj.item.check_status}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        พนักงาน: {{searched_obj.item.employee.nickname}}
                    </p>
                </div>
            </div>
            <div v-else-if="searched_obj.type == 'งานสั่ง'" class="py-5">
                <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
                    <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        รายละเอียด
                    </h5>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        เลขที่งานสั่ง: {{searched_obj.item.id}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        ชื่องานสั่ง: {{searched_obj.item.name}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        ประเภท/ลักษณะ: {{searched_obj.item.type}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        น้ำหนัก: {{searched_obj.item.weight}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        ค่าแรง: {{searched_obj.item.wage}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        ราคาเต็ม: {{searched_obj.item.full_price}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        มัดจำ: {{searched_obj.item.deposit_total_amount}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        ส่วนต่าง: {{searched_obj.item.difference_amount}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        วันที่เสร็จ: {{searched_obj.item.finish_date}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        วันที่สั่ง: {{searched_obj.item.order_date}}
                    </p>
                    <div class="mx-1 mb-3 font-normal text-gray-700">
                        <p class="inline">
                            วันที่ส่งมอบ:
                        </p>
                        <p class="inline" v-if="searched_obj.item.delivery_date != null">
                            {{searched_obj.item.delivery_date}}
                        </p>
                        <p class="inline" v-else>
                            -
                        </p>
                    </div>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        ช่างที่ผลิต: {{searched_obj.item.custom_order_worker.name}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        ช่องทางการชำระเงินมัดจำ: {{searched_obj.item.deposit_payment_method}}
                    </p>

                    <div class="mx-1 mb-3 font-normal text-gray-700">
                        <p class="inline">
                            ช่องทางการชำระเงินส่วนต่าง:
                        </p>
                        <p class="inline" v-if="searched_obj.item.difference_paymeny_method != null">
                            {{searched_obj.item.difference_paymeny_method}}
                        </p>
                        <p class="inline" v-else>
                            -
                        </p>
                    </div>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                        สถานะงานสั่ง: {{searched_obj.item.custom_order_status}}
                    </p>
                    <div v-if="searched_obj.item.deposit_payment_method == 'transfer'">
                        <p class="mx-1 mb-3 font-normal text-gray-700 ">
                            สถานะโอนมัดจำ: {{searched_obj.item.deposit_status}}
                        </p>
                        <p class="mx-1 mb-3 font-normal text-gray-700 ">
                            สถานะโอนส่วนต่าง: {{searched_obj.item.difference_status}}
                        </p>
                    </div>
                    <div v-else-if="searched_obj.item.deposit_payment_method == 'cash'">
                        <p class="mx-1 mb-3 font-normal text-gray-700 ">
                            เงินที่ลูกค้าจ่าย: {{searched_obj.item.deposit_paid_amount}}
                        </p>
                        <p class="mx-1 mb-3 font-normal text-gray-700 ">
                            เงินทอน: {{searched_obj.item.depoosit_change_amount}}
                        </p>
                    </div>
                    <div v-else-if="searched_obj.item.deposit_payment_method == 'credit card'">
                        <p class="mx-1 mb-3 font-normal text-gray-700 ">
                            ประเภทบัตรเครดิต: {{searched_obj.item.deposit_credit_card_type}}
                        </p>
                        <p class="mx-1 mb-3 font-normal text-gray-700 ">
                            ธนาคาร: {{searched_obj.item.depoosit_bank_name}}
                        </p>
                    </div>

                    <div class="mx-1 mb-3 font-normal text-gray-700">
                        <p class="inline">
                            พนักงานที่รับผิดชอบ: {{searched_obj.item.employee.nickname}}
                        </p>
                        <p class="inline" v-if="searched_obj.item.employee != null">
                            {{searched_obj.item.employee.nickname}}
                        </p>
                        <p class="inline" v-else>
                            -
                        </p>
                    </div>
                </div>
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
    useHistoryStore
} from '@/stores/history.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const history_store = useHistoryStore()
        return {
            auth_store,
            history_store
        }
    },
    data() {
        return {
            index: 0,
            auth: null,
            auth_user: null,
            user: null,
            user_id: null,
            searched_obj: null,
            histories: [ // all history, generate id
                {
                    id: 1,
                    type: "",
                    item: "test item"
                },
            ],
            options: {
                chosen_history: '',
                history: [
                    // 'ประวัติทั้งหมด' // all of the below
                    'ซื้อทอง', // onlinesales & onsitesales
                    'ขายทอง', // redemption
                    'งานสั่ง', // custom_order
                    'เปลี่ยน' // is_switch_gold from onsitesales
                ]
            }
        }
    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                this.auth = this.auth_store.getAuth
                this.auth_user = JSON.parse(this.auth_store.getUser)
            }
        }
    },
    async created() {
        const id = this.$route.params.id
        const url = `/users/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.user = response.data.data
                this.user_id = this.user.id
            }
        } catch (error) {
            console.error(error)
        }
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            console.log("authorized " + document.URL);
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.history_store.fetch()
        this.histories = this.history_store.filterByUser(this.user)

    },
    methods: {
        setSearched(obj) {
            this.error = null
            try {
                this.searched_obj = obj
                console.log(this.searched_obj)
            } catch (error) {
                this.error = error.message
            }
        }
    }
}
</script>
