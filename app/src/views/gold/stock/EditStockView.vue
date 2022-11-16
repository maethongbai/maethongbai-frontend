<template>
    <div v-if='user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-4 ml-0">
                    <!-- breadcrumb -->
                    <b>หน้าหลักระบบหลังร้าน > สถานะทองที่ถูกเพิ่ม > แก้ไขข้อมูลทองลงสต็อก</b>
                </div>
                <form @submit.prevent="saveGold()">
                    <div class="card-gray w-[1044px] mb-4">
                        <div class="grid grid-cols-2">
                            <div class="flex flex-col">
                                <p class="pt-2 pb-2 text-xl"><b>รายละเอียดทอง</b></p>
                                <label for="goldID" class="p-2">รหัสทอง: {{ gold.id }}</label>
                                <div class="flex flex-row">
                                    <label for="gold.type" class="p-2">ประเภททอง</label>
                                    <select class="select-box w-[300px] ml-auto mr-6" v-model="gold.gold_type.name">
                                        <option disabled value="">กรุณาเลือกประเภททอง</option>
                                        <option v-for="gold_type in gold_types" :value="gold_type.name">{{
                                                gold_type.name
                                        }}</option>
                                    </select>
                                </div>

                                <div>
                                    <div class="flex flex-row">
                                        <label for="gold.weight" class="p-2">น้ำหนักทอง</label>
                                        <select class="select-box w-[300px] ml-auto mr-6" v-model="gold.weight">
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
                                    </div>
                                </div>

                                <div class="flex flex-row" v-if="gold.weight == 'ตามชั่ง'">
                                    <label for="gold.custom_weight" class="p-2">น้ำหนักทองตามชั่ง</label>
                                    <input class="text-field w-[300px]" type="number" step=".01"
                                        v-model="gold.custom_weight">
                                    <label for="gold.custom_weight" class="p-2">กรัม</label>
                                </div>

                                <div class="mx-2 mt-2">

                                    <label for="gold.pattern_type" class="mr-3">ประเภทลายทอง</label>
                                    <input type="radio" id="ทองตัน" value="ทองตัน" v-model="gold.pattern_type">
                                    <label for="ทองตัน" class="mr-5 ml-1 ">ตัน</label>
                                    <input type="radio" id="ทองโป่ง" value="ทองโป่ง" v-model="gold.pattern_type">
                                    <label for="ทองโป่ง" class="ml-1">โป่ง</label>

                                </div>

                                <div class="flex flex-row">
                                    <label for="gold.pattern" class="p-2">ลายทอง</label>
                                    <select class="select-box w-[300px] ml-auto mr-6" v-model="gold.gold_pattern.name">
                                        <option disabled value="">กรุณาเลือกลายทอง</option>
                                        <option v-for="gold_pattern in gold_patterns" :value="gold_pattern.name">{{
                                                gold_pattern.name
                                        }}</option>
                                    </select>
                                </div>

                                <div class="flex flex-row">
                                    <label for="gold.size" class="p-2">ขนาด</label>
                                    <input class="text-field w-[300px] ml-auto mr-3" type="number" step=".01"
                                        v-model="gold.size">
                                    <label for="gold.size" class="p-2"
                                        v-if="gold.gold_type.name != 'แหวน'">เซนติเมตร</label>
                                </div>

                                <div class="flex flex-row">
                                    <label for="gold.goldsmith_charge" class="p-2">ค่ากำเหน็จต่อชิ้น {{
                                            gold.pension_per_piece.toLocaleString()
                                    }} บาท</label>

                                </div>

                            </div>

                            <div class="flex flex-col">
                                <div class="my-3 mt-12">
                                    <label for="gold.import_date" class="p-2">วันที่นำทองเข้า: {{ gold.import_date
                                    }}</label>
                                </div>

                                <div class="flex flex-row">
                                    <label for="gold.wholesale" class="p-2">ร้านขายส่ง</label>
                                    <select class="select-box w-[276px] ml-auto mr-12" v-model="gold.wholesale.name">
                                        <option disabled value="">กรุณาเลือกร้านขายส่ง</option>
                                        <option v-for="wholesale in wholesales" :value="wholesale.name">{{
                                                wholesale.name
                                        }}</option>
                                    </select>
                                </div>

                                <div class="flex flex-row">
                                    <label for="gold.gold_buy_price_wholesale" class="p-2">ราคาทองตอนซื้อจากร้านขายส่ง
                                        {{
                                                gold.gold_buy_price_wholesale.toLocaleString()
                                        }} บาท</label>
                                </div>

                                <div class="flex flex-row">
                                    <label for="gold.stock_approval_status" class="p-2">สถานะสินค้า </label>
                                    <select
                                        class="select-box w-[300px] ml-auto mr-6" v-model="gold.stock_approval_status">
                                        <option disabled value="">กรุณาเลือกสถานะ</option>
                                        <option value="รออนุมัติ">รออนุมัติ</option>
                                        <option value="อนุมัติ">อนุมัติ</option>
                                        <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                                    </select>
                                </div>
                                <div class="flex flex-row">
                                    <label for="gold.employee_add_stock" class="p-2">พนักงานที่ทำรายการ {{
                                            gold.employee_add_stock.nickname
                                    }}</label>
                                </div>

                                <div>
                                    <p class="p-2"><b>รูปสินค้า</b></p>
                                    <input type="file" ref="fileInput" accept="image/*" v-on:change="onFileChange"
                                        id="file-input">
                                    <img :src="`${gold.image}`" width="200">
                                </div>
                            </div>

                        </div>
                        <div class="w-[250px] mx-auto mt-4">
                            <button type="submit" class="red-btn w-[323px] mx-auto">
                                ยืนยันการเปลี่ยนแปลงรายการ
                            </button>
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
                image: this.gold.image,
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

        },
        onFileChange(e) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                this.gold.image = e.target.result
                // console.log(this.image)
            }
        }
    }

}
</script>
