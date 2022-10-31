<template>
<div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
        <!-- {{user.employee.id}} -->
    </div>
    <form @submit.prevent="createRedemption()">
        <div class="mx-3 my-3">
            <label for="nextID" class="mx-3">เลขบิล: {{redemption.id}}</label>
        </div>
        <div class="mx-3 my-3">
            <label for="gold.percentage" class="mx-3">เปอร์เซนต์ทอง</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="redemption.gold.percentage">
                <option disabled value="">กรุณาเลือกเปอร์เซนต์ทอง</option>
                <option value="96.5% รูปพรรณ">96.5% รูปพรรณ</option>
                <option value="96.5% ทองแท่ง">96.5% ทองแท่ง</option>
            </select>
            <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="checks.gold_percentage == false">กรุณาเลือกเปอร์เซนต์ทอง</label>
        </div>
        <div class="mx-3 my-3">
            <label for="gold.type" class="mx-3">ประเภททอง</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="redemption.gold.gold_type">
                <option disabled value="">กรุณาเลือกประเภททอง</option>
                <option v-for="gold_type in gold_types" :value="gold_type.name">{{ gold_type.name }}</option>
            </select>
            <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="checks.gold_type == false">กรุณาเลือกประเภททอง</label>
        </div>
        <div class="mx-3 my-3">
            <label for="gold.weight" class="mx-3">น้ำหนัก</label>
            <input class="mx-3" type="number" v-model="temp_weight" step=".01" autocomplete="off" required>
            <label for="gold.weight" class="mx-3">กรัม</label>
        </div>
        <div class="mx-3 my-3">
            <label for="gold.type" class="mx-3">ลายทอง</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="redemption.gold.gold_pattern">
                <option disabled value="">กรุณาเลือกลายทอง</option>
                <option v-for="gold_pattern in gold_patterns" :value="gold_pattern.name">{{ gold_pattern.name }}</option>
            </select>
            <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="checks.gold_type == false">กรุณาเลือกลายทอง</label>
        </div>
        <div class="mx-3 my-3">
            <input v-model="checked_brand.inside" id="ทางร้าน" :disabled="checked_brand.outside == true" type="checkbox" value="ทางร้าน" class="brand">
            <label class="mx-3">ทองของทางร้าน</label>
        </div>
        <div class="mx-3 my-3">
            <input v-model="checked_brand.outside" id="ร้านอื่น" :disabled="checked_brand.inside == true" type="checkbox" value="ร้านอื่น" class="brand">
            <label class="mx-3">ทองของร้านอื่น</label>
            <div v-if="checked_brand.outside == true" class="inline">
                <label>ระบุร้าน</label>
                <input class="mx-3" type="text" v-model="redemption.gold.brand" :required="checked_brand.outside == true" autocomplete="off">
            </div>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">วันที่รับซื้อ: {{redemption.redemption_date}}</label>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">ราคาทองตอนรับซื้อ: {{redemption.gold_redemption_price.buy_price}} บาท</label>
        </div>
        <div class="mx-3 my-3" v-if="redemption.gold.weight != null">
            <label class="mx-3">ราคาที่รับซื้อ: {{redemption.redemption_price}} บาท</label>
        </div>
        <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
            ข้อมูลลูกค้า
        </h5>
        <div class="mx-3 my-3">
            <label class="mx-3">ชื่อ</label>
            <input class="mx-3" type="text" v-model="redemption.user.first_name" autocomplete="off" required>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">นามสกุล</label>
            <input class="mx-3" type="text" v-model="redemption.user.last_name" autocomplete="off" required>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">เลขบัตรประชาชน</label>
            <input class="mx-3" type="text" v-model="redemption.user.id_card_number" autocomplete="off" required>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">ที่อยู่</label>
            <input class="mx-3" type="text" v-model="redemption.user.address" autocomplete="off" required>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">เบอร์โทร</label>
            <input class="mx-3" type="text" v-model="redemption.user.phone" autocomplete="off" required>
            <button @click="findUser" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                ค้นหา
            </button>
            <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="checks.phone_user == false">ไม่มีผู้ใช้ที่ใช้เบอร์โทรนี้</label>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">รูปบัตรประชาชน</label>
            <input type="file" ref="fileInput" accept="image/*" v-on:change="onFileChange" id="file-input">
            <img :src="`${redemption.id_card_image}`" width="200">
        </div>

        <button type="submit" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
            บันทึกรายการรับซื้อ
        </button>
    </form>
</div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useRedemptionStore
} from '@/stores/redemption.js'
import {
    useGoldTypeStore
} from '@/stores/gold_type.js'
import {
    useGoldPatternStore
} from '@/stores/gold_pattern.js'
import {
    useGoldPriceStore
} from '@/stores/gold_price.js'
import {
    useUserStore
} from '@/stores/user.js'
import {
    useGoldStore
} from '@/stores/gold.js'
import moment from 'moment'
export default {
    setup() {
        const auth_store = useAuthStore()
        const redemption_store = useRedemptionStore()
        const gold_type_store = useGoldTypeStore()
        const gold_pattern_store = useGoldPatternStore()
        const gold_price_store = useGoldPriceStore()
        const user_store = useUserStore()
        const gold_store = useGoldStore()
        return {
            auth_store,
            redemption_store,
            gold_type_store,
            gold_pattern_store,
            gold_price_store,
            user_store,
            gold_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            temp_weight: null,
            redemption: {
                id: -1,
                gold: {
                    percentage: null,
                    gold_type: null,
                    weight: null,
                    gold_pattern: null,
                    brand: null
                },
                redemption_date: "",
                gold_redemption_price: {
                    id: -1,
                    buy_price: -1,
                    sell_price: -1
                },
                redemption_price: -1,
                user: {
                    id: null,
                    first_name: null,
                    last_name: null,
                    id_card_number: null,
                    address: null,
                    phone: null,
                },
                id_card_image: null
            },
            checks: {
                gold_percentage: true,
                gold_type: true,
                gold_pattern: true,
                phone_user: true,
                create_user: false,
                user_change_id_card_number: false,
                user_change_address: false
            },
            gold_types: [],
            gold_patterns: [],
            disabledButton: false,
            checked_brand: {
                inside: false,
                outside: false
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
        temp_weight: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (newValue > 0) {
                    this.redemption.gold.weight = newValue
                    this.redemption.redemption_price = this.redemption.gold_redemption_price.buy_price * 90 / 100 * 0.0656 * this.redemption.gold.weight
                    // console.log(this.redemption.gold.weight)
                } else {
                    this.redemption.gold.weight = null
                }
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
        this.redemption.id = await this.redemption_store.getNextID()
        await this.gold_type_store.fetch()
        this.gold_types = this.gold_type_store.getGoldTypes
        await this.gold_pattern_store.fetch()
        this.gold_patterns = this.gold_pattern_store.getGoldPatterns
        var formattedDate = moment().format("YYYY-MM-DD")
        this.redemption.redemption_date = formattedDate
        this.redemption.gold_redemption_price = await this.gold_price_store.getLast()
        await this.user_store.fetch()
        await this.gold_store.fetch()
    },
    methods: {
        async createRedemption() {
            if (this.redemption.gold.percentage == null ||
                this.redemption.gold.percentage == "") {
                this.checks.gold_percentage = false
                return
            }
            this.checks.gold_percentage = true
            if (this.redemption.gold.gold_type == null ||
                this.redemption.gold.gold_type == "") {
                this.checks.gold_type = false
                return
            }
            this.checks.gold_type = true
            if (this.redemption.gold.gold_pattern == null ||
                this.redemption.gold.gold_pattern == "") {
                this.checks.gold_pattern = false
                return
            }
            this.checks.gold_pattern = true
            var gold_id = null
            var user_id = this.redemption.user.id
            var redemption_id = null

            try {
                var gold = {
                    percentage: this.redemption.gold.percentage,
                    gold_type_id: this.gold_type_store.findByName(this.redemption.gold.gold_type).id,
                    custom_weight: this.redemption.gold.weight,
                    gold_pattern_id: this.gold_pattern_store.findByName(this.redemption.gold.gold_pattern).id,
                    brand: this.redemption.gold.brand,
                    import_date: this.redemption.redemption_date,
                    employee_add_stock_id: this.user.employee.id,
                    is_redemption: true
                }
                // console.log(gold)
                gold_id = await this.gold_store.add(gold)
                // console.log("added gold:"+gold_id)

                if (this.checks.create_user == true) {
                    var user = {
                        first_name: this.redemption.user.first_name,
                        last_name: this.redemption.user.last_name,
                        id_card_number: this.redemption.user.id_card_number,
                        address: this.redemption.user.address,
                        phone: this.redemption.user.phone
                    }
                    user_id = await this.user_store.add(user)
                } else {
                    if (this.checks.user_change_id_card_number) {
                        await this.user_store.editIDCardNumber(user_id, this.redemption.user.id_card_number)
                    }
                    if (this.checks.user_change_address) {
                        await this.user_store.editAddress(user_id, this.redemption.user.address)
                    }
                }

                var redemption = {
                    gold_id: gold_id,
                    redemption_date: this.redemption.redemption_date,
                    gold_redemption_price_id: this.redemption.gold_redemption_price.id,
                    redemption_price: this.redemption.redemption_price,
                    user_id: user_id,
                    id_card_image: this.redemption.id_card_image,
                    employee_id: this.user.employee.id
                }
                // console.log(redemption)
                redemption_id = await this.redemption_store.add(redemption)

                this.$router.push("/redemption/view");
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }

        },
        onFileChange(e) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                this.redemption.id_card_image = e.target.result
                // console.log(this.image)
            }
        },
        findUser() {
            var temp_user = this.user_store.findByPhone(this.redemption.user.phone)
            if (temp_user == undefined ||
                temp_user == null) {
                this.redemption.user.id = null
                this.redemption.user.first_name = null
                this.redemption.user.last_name = null
                this.redemption.user.id_card_number = null
                this.redemption.user.address = null
                this.checks.create_user = true
                return
            }
            this.redemption.user.id = temp_user.id
            this.redemption.user.first_name = temp_user.first_name
            this.redemption.user.last_name = temp_user.last_name
            if (temp_user.id_card_number == null) {
                this.checks.user_change_id_card_number = true
            }
            this.redemption.user.id_card_number = temp_user.id_card_number
            if (temp_user.address == null) {
                this.checks.user_change_address = true
            }
            this.redemption.user.address = temp_user.address
            this.checks.create_user = false
        }
    }
}
</script>
