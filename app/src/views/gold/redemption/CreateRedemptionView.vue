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
                <option value="96.5% รูปพรรณ">96.5% รูปพรรณ</option>
                <option value="96.5% ทองแท่ง">96.5% ทองแท่ง</option>
            </select>
        </div>
        <div class="mx-3 my-3">
            <label for="gold.type" class="mx-3">ประเภททอง</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="redemption.gold.gold_type">
                <option v-for="gold_type in gold_types" :value="gold_type.name">{{ gold_type.name }}</option>
            </select>
        </div>
        <div class="mx-3 my-3">
            <label for="gold.weight" class="mx-3">น้ำหนัก</label>
            <input class="mx-3" type="number" v-model="temp_weight" step=".01" autocomplete="off" required>
            <label for="gold.weight" class="mx-3">กรัม</label>
        </div>
        <div class="mx-3 my-3">
            <label for="gold.type" class="mx-3">ลายทอง</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="redemption.gold.gold_pattern">
                <option v-for="gold_pattern in gold_patterns" :value="gold_pattern.name">{{ gold_pattern.name }}</option>
            </select>
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
            <label class="mx-3">วันที่รับซื้อ: {{showDate}}</label>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">ราคาทองตอนรับซื้อ: {{redemption.gold_redemption_price.buy_price}} บาท</label>
        </div>
        <div class="mx-3 my-3">
            <label class="inline ml-3">ราคาที่รับซื้อ: </label>
            <label class="inline" v-if="redemption.gold.weight != null">{{redemption.redemption_price}} บาท</label>
            <label class="inline" v-else>-</label>
        </div>
        <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
            ข้อมูลลูกค้า
        </h5>
        <div class="mx-3 my-3">
            <label class="ml-3">ชื่อ: </label>
            <label class="inline" v-if="redemption.user != null">{{redemption.user.first_name}}</label>
            <label class="inline" v-else>-</label>
        </div>
        <div class="mx-3 my-3">
            <label class="ml-3">นามสกุล: </label>
            <label class="inline" v-if="redemption.user != null">{{redemption.user.last_name}}</label>
            <label class="inline" v-else>-</label>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">เลขบัตรประชาชน</label>
            <input class="mx-3" type="text" v-if="redemption.user != null" v-model="redemption.user.id_card_number" autocomplete="off" required>
            <label class="inline" v-else>-</label>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">ที่อยู่</label>
            <input class="mx-3" type="text" v-if="redemption.user != null" v-model="redemption.user.address" autocomplete="off" required>
            <label class="inline" v-else>-</label>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">เบอร์โทร</label>
            <input class="mx-3" type="text" v-model="redemption.user_phone" autocomplete="off" required>
            <button @click="findUser" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                ค้นหา
            </button>
            <label class="inline-block mx-1 mb-2 font-medium text-red-500" v-if="checks.phone_user == false">ไม่มีผู้ใช้ที่ใช้เบอร์โทรนี้</label>
            <a v-bind:href="'/register'" v-if="checks.phone_user == false" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                ลงทะเบียน
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
        <div class="mx-3 my-3">
            <label class="mx-3">รูปบัตรประชาชน</label>
            <input type="file" ref="fileInput" accept="image/*" v-on:change="onFileChange" id="file-input">
            <img :src="`${redemption.id_card_image}`" width="200">
        </div>

        <button type="submit" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
            บันทึกรายการรับซื้อ
        </button>
        <label v-if="input_check.is_valid == false" class="inline-block mx-1 mb-2 text-red-500 font-bold">
            บันทึกรายการรับซื้อไม่สำเร็จ ตรวจสอบ error ข้างล่าง
        </label>
        <label v-if="input_check.is_valid == false" v-for="error in input_check.errors" class="block mx-3 font-medium text-red-500">
            - {{error}}
        </label>
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
                search_user: {
                    id_card_number: null,
                    address: null,
                },
                user: null,
                user_phone: null,
                id_card_image: null
            },
            checks: {
                gold_percentage: true,
                gold_type: true,
                gold_pattern: true,
                phone_user: true,
                create_user: false,
                error_message: "",
                user_found: false
            },
            showDate: "",
            gold_types: [],
            gold_patterns: [],
            disabledButton: false,
            checked_brand: {
                inside: false,
                outside: false
            },
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
        temp_weight: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (newValue > 0) {
                    this.redemption.gold.weight = newValue
                    this.redemption.redemption_price = Number(Math.round((this.redemption.gold_redemption_price.buy_price * 90 / 100 * 0.0656 * this.redemption.gold.weight) + 'e2') + 'e-2')
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
        await this.redemption_store.fetch()
        this.redemption.id = this.redemption_store.getNextID()
        await this.gold_type_store.fetch()
        this.gold_types = this.gold_type_store.getGoldTypes
        await this.gold_pattern_store.fetch()
        this.gold_patterns = this.gold_pattern_store.getGoldPatterns
        this.showDate = moment().format("DD/MM/YYYY")
        var formattedDate = moment().format("YYYY-MM-DD")
        this.redemption.redemption_date = formattedDate
        this.redemption.gold_redemption_price = await this.gold_price_store.getLast()
        await this.user_store.fetch()
        await this.gold_store.fetch()
    },
    methods: {
        async createRedemption() {

            this.disableButton = true
            // validation
            this.input_check.errors = []
            this.input_check.is_valid = true

            if (this.redemption.gold.percentage == null) {
                this.input_check.errors.push("กรุณาเลือกเปอร์เซนต์ทอง")
                this.input_check.is_valid = false
            }
            if (this.redemption.gold.gold_type == null) {
                this.input_check.errors.push("กรุณาเลือกประเภททอง")
                this.input_check.is_valid = false
            }
            if (this.redemption.gold.weight == null) {
                this.input_check.errors.push("น้ำหนักทองต้องเป็นจำนวนบวก")
                this.input_check.is_valid = false
            }
            if (this.redemption.gold.gold_pattern == null) {
                this.input_check.errors.push("กรุณาเลือกลายทอง")
                this.input_check.is_valid = false
            }
            if (this.checked_brand.inside == true) {} else if (this.checked_brand.outside == true) {} else {
                this.input_check.errors.push("กรุณาเลือกว่าเป็นทองของทางร้านหรือทองของร้านอื่น")
                this.input_check.is_valid = false
            }
            if (this.redemption.user == null) {
                this.input_check.errors.push("กรุณาค้นหาข้อมูลลูกค้า")
                this.input_check.is_valid = false
            }

            if (this.input_check.is_valid == false) {
                this.disableButton = false
                return
            }

            // create stuff
            var gold_id = null
            var user_id = this.redemption.user.id

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

                if (this.redemption.search_user.id_card_number != this.redemption.user.id_card_number) {
                    this.user_store.editIDCardNumber(this.redemption.user.id, this.redemption.user.id_card_number)
                }
                if (this.redemption.search_user.address != this.redemption.user.address) {
                    this.user_store.editAddress(this.redemption.user.id, this.redemption.user.address)
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

                await this.redemption_store.add(redemption)

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
        findUser(e) {
            var temp_user = this.user_store.findByPhone(this.redemption.user_phone)
            this.search_user = temp_user
            if (temp_user == undefined ||
                temp_user == null) {
                this.redemption.user = null
                this.checks.phone_user = false
                this.checks.create_user = true
                e.preventDefault();
                return
            }
            this.redemption.user = temp_user
            this.checks.create_user = false
            this.checks.phone_user = true
            e.preventDefault();
        }
    }
}
</script>
