<template>
<div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    <form @submit.prevent="createGold()">
    <div class="mx-3 my-3">
        <label for="nextID" class="mx-3">รหัสทอง: {{ gold.id }}</label>
    </div>
    <div class="mx-3 my-3">
        <label for="gold.type" class="mx-3">ประเภททอง</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="gold.gold_type">
            <option disabled value="">กรุณาเลือกประเภททอง</option>
            <option v-for="gold_type in gold_types" :value="gold_type.name">{{ gold_type.name }}</option>
        </select>
        <label for="gold.weight" class="mx-3">น้ำหนักทอง</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="gold.gold_weight">
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
        </select>
        <input v-model="is_switch_gold_weight" id="gold.custom_weight" type="checkbox" value="gold.custom_weight">
        <label for="gold.custom_weight" class="mx-3">น้ำหนักทองตามชั่ง</label>
        <div v-if="is_switch_gold_weight == true"> 
            <label for="gold.custom_weight" class="mx-3">น้ำหนัก</label>
            <input class="mx-3" type="number" v-model="gold.gold_custom_weight" autocomplete="off">
            <label for="gold.custom_weight" class="mx-3">กรัม</label>
        </div>
        <div class="my-3">
            <label for="gold.pattern_type" class="mx-3">ประเภทลายทอง</label>
            <input type="radio" id="ทองตัน" value="ทองตัน" v-model="gold.gold_pattern_type">
            <label for="ทองตัน">ตัน</label>
            <input type="radio" id="ทองโป่ง" value="ทองโป่ง" v-model="gold.gold_pattern_type">
            <label for="ทองโป่ง">โป่ง</label>
        </div>
        <label for="gold.pattern" class="mx-3">ลายทอง</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="gold.gold_pattern">
            <option disabled value="">กรุณาเลือกลายทอง</option>
            <option v-for="gold_pattern in gold_patterns" :value="gold_pattern.name">{{ gold_pattern.name }}</option>
        </select>
        <div class="my-3">
        <label for="gold.size" class="mx-3">ขนาด</label>
        <input class="mx-3" type="number" v-model="gold.gold_size" autocomplete="off">
        <label for="gold.size" class="mx-3" v-if="gold.gold_type != 'แหวน'">เซนติเมตร</label>
        </div>
        <div class="my-3">
        <label for="gold.goldsmith_charge" class="mx-3">ค่ากำเหน็จต่อชิ้น</label>
        <input class="mx-3" type="number" v-model="gold.goldsmith_charge" autocomplete="off">
        <label for="gold.goldsmith_charge" class="mx-3">บาท</label>
        </div>
        <!-- <div class="my-3">
        <label for="gold.amount" class="mx-3">จำนวน</label>
        <input class="mx-3" type="number" v-model="gold.amount" autocomplete="off">
        <label for="gold.amount" class="mx-3">ชิ้น</label>
        </div> -->
        <div class="my-3">
        <label for="gold.import_date" class="mx-3">วันที่นำทองเข้า: {{showDate}}</label>
        </div>
        <div class="my-3">
        <label for="gold.type" class="mx-3">ร้านขายส่ง</label>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="gold.wholesale">
            <option disabled value="">กรุณาเลือกร้านขายส่ง</option>
            <option v-for="wholesale in wholesales" :value="wholesale.name">{{ wholesale.name }}</option>
        </select>
        </div>
        <div class="my-3">
        <label for="gold.gold_buy_price_wholesale" class="mx-3">ราคาทองตอนซื้อจากร้านขายส่ง</label>
        <input class="mx-3" type="number" v-model="gold.gold_buy_price_wholesale" autocomplete="off">
        <label for="gold.gold_buy_price_wholesale" class="mx-3">บาท</label>
        </div>
    </div>
    <button type="submit" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
    บันทึกรายการ
    </button>
</form>
</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useGoldStore } from '@/stores/gold.js'
import { useGoldTypeStore } from '@/stores/gold_type.js'
import { useGoldPatternStore } from '@/stores/gold_pattern.js'
import { useWholesaleStore } from '@/stores/wholesale.js'
import moment from 'moment'

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
            gold_types: [],
            gold_patterns: [],
            wholesales: [],
            showDate: "",
            error: null,
            gold: {
                id: -1,
                gold_name: null,
                gold_type: null,
                gold_weight: null,
                gold_custom_weight: null,
                gold_pattern: null,
                gold_pattern_type: null,
                gold_type: null,
                gold_size: null,
                goldsmith_charge: null,
                amount: null,
                import_date: null,
                wholesale: null,
                gold_buy_price_wholesale: null,
                is_sold: false
            },
            is_switch_gold_weight: false,
            disabledButton: false
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
        await this.gold_store.fetch()
        this.gold.id = this.gold_store.getNextID()
        await this.gold_type_store.fetch()
        this.gold_types = this.gold_type_store.getGoldTypes
        await this.gold_pattern_store.fetch()
        this.gold_patterns = this.gold_pattern_store.getGoldPatterns
        this.showDate = moment().format("YYYY-MM-DD")
        var formattedDate = moment().format("YYYY-MM-DD")
        this.gold.import_date = formattedDate
        await this.wholesale_store.fetch()
        this.wholesales = this.wholesale_store.getWholesales
        
    },
    methods: {
        async createGold() {
            try {
                var gold = {
                    // name: this.gold_type + this.gold_pattern + this.gold_size,
                    name: null,
                    gold_type_id: this.gold_type_store.findByName(this.gold.gold_type).id,
                    weight: this.gold.gold_weight,
                    custom_weight: this.gold.gold_custom_weight,
                    pattern_type: this.gold.gold_pattern_type,
                    gold_pattern_id: this.gold_pattern_store.findByName(this.gold.gold_pattern).id,
                    size: this.gold.gold_size,
                    pension_per_piece: this.gold.goldsmith_charge,
                    // amount: this.gold.amount,
                    import_date: this.gold.import_date,
                    is_sold: this.gold.is_sold,
                    wholesale_id: this.wholesale_store.findByName(this.gold.wholesale).id,
                    gold_buy_price_wholesale: this.gold.gold_buy_price_wholesale,
                    employee_add_stock_id: this.user.employee.id
                }
                console.log(gold)
                await this.gold_store.add(gold)
                
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }       
}
</script>