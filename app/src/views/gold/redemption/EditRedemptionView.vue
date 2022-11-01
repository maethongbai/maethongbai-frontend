<template>
<div v-if='user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/redemptions/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <form @submit.prevent="saveRedemption()">
        <div v-if="redemption != null" class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เลขบิล: {{redemption.id}}
            </p>
            <div class="mx-3 my-3">
                <label class="mx-3">เปอร์เซนต์ทอง</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="redemption.gold.percentage">
                    <option value="96.5% รูปพรรณ">96.5% รูปพรรณ</option>
                    <option value="96.5% ทองแท่ง">96.5% ทองแท่ง</option>
                </select>
            </div>
            <div class="mx-3 my-3">
                <label class="mx-3">ประเภททอง</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="redemption.gold.gold_type">
                    <option v-for="gold_type in select.gold_types" :value="gold_type.name">{{ gold_type.name }}</option>
                </select>
            </div>
            <div class="mx-3 my-3">
                <label class="mx-3">น้ำหนัก</label>
                <input class="mx-3" type="number" step=".01" v-model="redemption.gold.custom_weight" autocomplete="off" required>
                <label class="mx-3">กรัม</label>
            </div>
            <div class="mx-3 my-3">
                <label class="mx-3">ลายทอง</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="redemption.gold.gold_pattern">
                    <option v-for="gold_pattern in select.gold_patterns" :value="gold_pattern.name">{{ gold_pattern.name }}</option>
                </select>
            </div>
            <div class="mx-3 my-3">
                <input v-model="select.brand_status" id="ทองของทางร้าน" type="radio" value="ทองของทางร้าน">
                <label class="mx-3">ทางของทางร้าน</label>
                <input v-model="select.brand_status" id="ทองของร้านอื่น" type="radio" value="ทองของร้านอื่น">
                <label class="mx-3">ทางของร้านอื่น</label>
            </div>
            <div v-if="select.brand_status == 'ทองของร้านอื่น'" class="mx-3 my-3">
                <label class="mx-3">ระบุร้าน</label>
                <input class="mx-3" type="text" v-model="redemption.gold.brand" autocomplete="off" :required="select.brand_status == 'ทองของร้านอื่น'">
            </div>
            <div class="mx-3 my-3">
                <label class="mx-3">วันที่รับซื้อ: {{redemption.redemption_date}}</label>
            </div>
            <div class="mx-3 my-3">
                <label class="mx-3">ราคาทองตอนรับซื้อ: {{redemption.gold_redemption_price.buy_price}} บาท</label>
            </div>
            <div class="mx-3 my-3">
                <label class="mx-3">ราคาที่รับซื้อ</label>
                <input class="mx-3" type="number" v-model="redemption.redemption_price" autocomplete="off" required>
                <label class="mx-3">บาท</label>
            </div>
            <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
                ข้อมูลลูกค้า
            </h5>
            <div class="mx-3 my-3">
                <label class="mx-3">เบอร์โทร</label>
                <input class="mx-3" type="text" v-model="temp.phone" autocomplete="off" required>
                <button @click="findUser" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                    ค้นหา
                </button>
            </div>
            <div class="mx-3 my-3">
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
                    <input class="mx-3" type="text" v-model="temp.id_num" autocomplete="off" v-if="redemption.user.id_card_number == null" :required="redemption.user.id_card_number == null">
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ที่อยู่: {{redemption.user.address}}
                    <input class="mx-3" type="text" v-model="temp.address" autocomplete="off" v-if="redemption.user.address == null" :required="redemption.user.address == null">
                </p>
            </div>
            <div class="mx-3 my-3">
                <label class="mx-3">รูปบัตรประชาชน</label>
                <input type="file" ref="fileInput" accept="image/*" v-on:change="onFileChange" id="file-input">
                <img :src="`${redemption.id_card_image}`" width="200">
            </div>

            <button class="px-4 py-2 rounded-lg bg-lime-400">
                ยืนยันการเปลี่ยนแปลง
            </button>

        </div>
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
    useUserStore
} from '@/stores/user.js'
import {
    useGoldStore
} from '@/stores/gold.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const redemption_store = useRedemptionStore()
        const gold_type_store = useGoldTypeStore()
        const gold_pattern_store = useGoldPatternStore()
        const user_store = useUserStore()
        const gold_store = useGoldStore()
        return {
            auth_store,
            redemption_store,
            gold_type_store,
            gold_pattern_store,
            user_store,
            gold_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            disabledButton: false,
            redemption: null,
            redemption_id: null,
            select: {
                gold_types: [],
                gold_patterns: [],
                brand_status: null
            },
            temp: {
                gold_type_name: null,
                phone: null,
                address: null,
                id_num: null
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
                // console.log(this.redemption)
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
                console.log("authorized " + document.URL);
            } else {
                this.$router.push("/redemption/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.gold_type_store.fetch()
        this.select.gold_types = this.gold_type_store.getGoldTypes
        this.redemption.gold.gold_type = this.redemption.gold.gold_type.name
        await this.gold_pattern_store.fetch()
        this.select.gold_patterns = this.gold_pattern_store.getGoldPatterns
        this.redemption.gold.gold_pattern = this.redemption.gold.gold_pattern.name
        if (this.redemption.gold.brand == null) {
            this.select.brand_status = "ทองของทางร้าน"
        } else {
            this.select.brand_status = "ทองของร้านอื่น"
        }
        await this.user_store.fetch()
        this.temp.phone = this.redemption.user.phone
        this.temp.address = this.redemption.user.address
        this.temp.id_num = this.redemption.user.id_num
    },
    methods: {
        async saveRedemption() {
            try {
                // set goldtypename -> goldtype object
                // set goldpatternname -> goldpattern object
                // set brand -> if brand status = null, brand = null, else brand = input brand
                var gold = {
                    id: this.redemption.gold.id,
                    percentage: this.redemption.gold.percentage,
                    gold_type_id: this.gold_type_store.findByName(this.redemption.gold.gold_type).id,
                    custom_weight: this.redemption.gold.custom_weight,
                    gold_pattern_id: this.gold_pattern_store.findByName(this.redemption.gold.gold_pattern).id,
                    brand: this.redemption.gold.brand,
                }
                if (this.select.brand_status == "ทองของทางร้าน") {
                    gold.brand = null
                }

                await this.gold_store.edit(gold)

                var redemption = {
                    id: this.redemption.id,
                    redemption_price: this.redemption.redemption_price,
                    id_card_image: this.redemption.id_card_image,
                    user_id: this.user_store.findByPhone(this.temp.phone).id
                }
                await this.redemption_store.edit(redemption)

                if (this.redemption.user.id_card_number == null) {
                    await this.user_store.editIDCardNumber(this.redemption.user.id, this.temp.id_num)
                }
                if (this.redemption.user.address == null) {
                    await this.user_store.editAddress(this.redemption.user.id, this.temp.address)
                }
                
                this.$router.push("/redemption/view")
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }

        },
        findUser(e) {
            this.disabledButton = true
            try {
                var user = this.user_store.findByPhone(this.temp.phone)
                if (user != null) {
                    this.redemption.user = user
                }
            } catch (error) {
                console.error(error)
            }

            this.disabledButton = false
            e.preventDefault()
        },
        onFileChange(e) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                this.redemption.id_card_image = e.target.result
            }
            e.preventDefault()
        },
    }
}
</script>
