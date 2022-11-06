<template>
<div v-if='user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/stock/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <div v-if=" gold != null" class="mx-3 my-3">
        <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            รายละเอียดทอง
        </h5>
        <label for="goldID" class="mx-3">รหัสทอง: {{ gold.id }}</label>
    </div>
    <div class="mx-3 my-3">
        <label for="gold.type" class="mx-3">ประเภททอง</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="gold.gold_type.name">
            <option disabled value="">กรุณาเลือกประเภททอง</option>
            <option v-for="gold_type in gold_types" :value="gold_type.name">{{ gold_type.name }}</option>
        </select>
        <label for="gold.weight" class="mx-3">น้ำหนักทอง</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="gold.weight">
            <option disabled value="">กรุณาเลือกน้ำหนักทอง</option>
            <option value="ครึ่งสลึง">ครึ่งสลึง</option>
            <option value="1 สลึง">1 สลึง</option>
            <option value="2 สลึง">2 สลึง</option>
            <option value="3 สลึง">3 สลึง</option>
            <option value="6 สลึง">6 สลึง</option>
            <option value="1 บาท">1 บาท</option>
            <option value="2 บาท">2 บาท</option>
            <option value="3 บาท">3 บาท</option>
            <option value="4 บาท">4 บาท</option>
            <option value="5 บาท">5 บาท</option>
            <option value="6 บาท">6 บาท</option>
            <option value="7 บาท">7 บาท</option>
            <option value="8 บาท">8 บาท</option>
            <option value="9 บาท">9 บาท</option>
            <option value="10 บาท">10 บาท</option>
            <option value="15 บาท">15 บาท</option>
            <option value="20 บาท">20 บาท</option>
            <option value="ตามชั่ง">น้ำหนักตามชั่ง</option>
        </select>
        <div class=" my-3" v-if=" gold.weight == 'ตามชั่ง'">
            <label for="gold.custom_weight" class="mx-3">น้ำหนักทองตามชั่ง</label>
            <input class="mx-3" type="number" step=".01" v-model="gold.custom_weight">
            <label for="gold.custom_weight" class="mx-3">กรัม</label>
        </div>
        <div class="my-3">
            <label class="mx-3">ประเภทลายทอง</label>
            <input type="radio" id="ทองตัน" value="ทองตัน" v-model="gold.pattern_type">
            <label for="ทองตัน">ตัน</label>
            <input type="radio" id="ทองโป่ง" value="ทองโป่ง" v-model="gold.pattern_type">
            <label for="ทองโป่ง">โป่ง</label>
        </div>
        <label for="gold.pattern" class="mx-3">ลายทอง</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="gold.gold_pattern.name">
            <option disabled value="">กรุณาเลือกลายทอง</option>
            <option v-for="gold_pattern in gold_patterns" :value="gold_pattern.name">{{ gold_pattern.name }}</option>
        </select>
        <div class="my-3">
            <label for="gold.size" class="mx-3">ขนาด</label>
            <input class="mx-3" type="number" step=".01" v-model="gold.size">
            <label for="gold.size" class="mx-3" v-if="gold.gold_type.name != 'แหวน'">เซนติเมตร</label>
        </div>
        <div class="my-3">
            <label for="gold.goldsmith_charge" class="mx-3">ค่ากำเหน็จต่อชิ้น {{ gold.pension_per_piece }} บาท</label>
        </div>
        <!-- <div class="my-3">
        <label for="gold.amount" class="mx-3">จำนวน</label>
        <input class="mx-3" type="number" v-model="gold.amount" autocomplete="off">
        <label for="gold.amount" class="mx-3">ชิ้น</label>
        </div> -->
        <div class="my-3">
            <label for="gold.import_date" class="mx-3">วันที่นำทองเข้า: {{ gold.import_date }}</label>
        </div>
        <div class="my-3">
            <label for="gold.wholesale" class="mx-3">ร้านขายส่ง</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="gold.wholesale.name">
                <option disabled value="">กรุณาเลือกร้านขายส่ง</option>
                <option v-for="wholesale in wholesales" :value="wholesale.name">{{ wholesale.name }}</option>
            </select>
        </div>
        <div class="my-3">
            <label for="gold.gold_buy_price_wholesale" class="mx-3">ราคาทองตอนซื้อจากร้านขายส่ง {{ gold.gold_buy_price_wholesale }} บาท</label>
        </div>
        <div class="my-3">
            <label for="gold.stock_approval_status" class="mx-3">สถานะอนุมัติสินค้าลง stock</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="gold.stock_approval_status">
                <option disabled value="">กรุณาเลือกสถานะ</option>
                <option value="รออนุมัติ">รออนุมัติ</option>
                <option value="อนุมัติ">อนุมัติ</option>
                <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
            </select>
        </div>
        <div>
            <label for="gold.employee_add_stock" class="mx-3">พนักงานที่ทำรายการ {{ gold.employee_add_stock.nickname}}</label>
        </div>
    </div>
    <button @click="saveGold()" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
        ยืนยันการเปลี่ยนแปลงรายการ
    </button>
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
    useGoldTypeStore
} from '@/stores/gold_type.js'
import {
    useGoldPatternStore
} from '@/stores/gold_pattern.js'
import {
    useWholesaleStore
} from '@/stores/wholesale.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_store = useGoldStore()
        const gold_type_store = useGoldTypeStore()
        const gold_pattern_store = useGoldPatternStore()
        const wholesale_store = useWholesaleStore()
        return {
            auth_store,
            gold_store,
            gold_type_store,
            gold_pattern_store,
            wholesale_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            gold: {
                gold_type: {
                    name: ""
                },
                gold_pattern: {
                    name: ""
                },
                wholesale: {
                    name: ""
                },
                employee_add_stock: {
                    nickname: ""
                }

            },
            gold_id: null,
            gold_types: [],
            gold_patterns: [],
            wholesales: [],
            is_switch_gold_weight: false
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
        const url = `/golds/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.gold = response.data.data
                console.log(this.gold)
                this.gold_id = this.gold.id
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
                console.log("authorized " + document.URL);
            } else {
                this.$router.push("/stock/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.gold_type_store.fetch()
        this.gold_types = this.gold_type_store.getGoldTypes
        await this.gold_pattern_store.fetch()
        this.gold_patterns = this.gold_pattern_store.getGoldPatterns
        await this.wholesale_store.fetch()
        this.wholesales = this.wholesale_store.getWholesales
        if (this.gold.weight == null) {
            this.gold.weight = 'ตามชั่ง'
        }

    },
    methods: {
        async saveGold() {
            var gold = {
                // name: this.gold_type + this.gold_pattern + this.gold_size,
                id: this.gold.id,
                name: null,
                gold_type_id: this.gold_type_store.findByName(this.gold.gold_type.name).id,
                weight: this.gold.weight,
                custom_weight: this.gold.custom_weight,
                pattern_type: this.gold.pattern_type,
                gold_pattern_id: this.gold_pattern_store.findByName(this.gold.gold_pattern.name).id,
                size: this.gold.size,
                // amount: this.gold.amount,
                stock_approval_status: this.gold.stock_approval_status,
                wholesale_id: this.wholesale_store.findByName(this.gold.wholesale.name).id,

            }
            if (this.gold.weight != 'ตามชั่ง') {
                gold.name = String(this.gold.gold_type.name) + String(this.gold.gold_pattern.name) + " " + String(this.gold.weight)
                gold.custom_weight = null
            } else {
                gold.name = String(this.gold.gold_type.name) + String(this.gold.gold_pattern.name) + " " + String(this.gold.custom_weight) + " กรัม"
                gold.weight = null
            }
            try {
                await this.gold_store.editGold(gold.id, gold)
                this.$router.push("/stock/view")
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }

        }
    }

}
</script>
