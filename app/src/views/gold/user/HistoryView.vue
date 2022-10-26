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

                    <th v-if="val.type == 'ซื้อทอง' || 
                                   val.type == 'ขายทอง' ||
                                   val.type == 'เปลี่ยน'"
                    scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{val.item.gold.name}}
                    </th>
                    <th v-else-if="val.type == 'งานสั่ง'"
                    scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
        <div v-if="searched_item != null" class="py-5">
            <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
                <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    รายละเอียด
                </h5>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    เลขบิล: {{redemption_searched.id}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    เปอร์เซนต์ทอง: {{redemption_searched.gold.percentage}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ประเภท: {{redemption_searched.gold.gold_type.name}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700" v-if="redemption_searched.gold.weight != null">
                    น้ำหนัก: {{redemption_searched.gold.weight}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700" v-else>
                    น้ำหนัก: {{redemption_searched.gold.custom_weight}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ลาย: {{redemption_searched.gold.gold_pattern.name}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ยี่ห้อทอง: {{redemption_searched.gold.brand}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    วันที่รับซื้อ: {{redemption_searched.redemption_date}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ราคาทองตอนรับซื้อ: {{redemption_searched.gold_redemption_price.buy_price}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ราคาที่รับซื้อ: {{redemption_searched.redemption_price}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    สถานะตรวจสอบ: {{redemption_searched.check_status}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    พนักงาน: {{redemption_searched.employee.nickname}}
                </p>
                <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
                    ข้อมูลลูกค้า
                </h5>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    รหัสสมาชิก: {{redemption_searched.user.id}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ชื่อ: {{redemption_searched.user.first_name}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    นามสกุล: {{redemption_searched.user.last_name}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    เลขบัตรประชาชน: {{redemption_searched.user.id_card_number}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    เบอร์โทร: {{redemption_searched.user.phone}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ที่อยู่: {{redemption_searched.user.address}}
                </p>
                <div>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        รูปบัตรประชาชน
                        <img :src="`${redemption_searched.id_card_image}`" alt="ไม่พบรูปบัตรประชาชน" width="200">
                    </p>
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
        console.log(this.histories)
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
