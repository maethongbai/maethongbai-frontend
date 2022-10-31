<template>
    <div v-if='user.role == "manager"'>
        <div v-if=" onsiteSale!= null" class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            รายละเอียด
            </h5>

            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เลขบิล: {{onsiteSale.id}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                ช่องทางการขาย: หน้าร้าน
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                ชื่อลูกค้า: {{onsiteSale.user.username}}

                <input v-model="edit_user" id="edit_user" type="checkbox" value="edit_user">
                <label class="mx-3">แก้ไขลูกค้า</label>
                <div v-if="edit_user == true" >
                    <label class="mx-3">ค้นหาเบอร์ลูกค้า</label>
                    <input class="mx-3" type="text" v-model="onsiteSale.user.phone" autocomplete="off">
                    <button @click="findUser" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                        ค้นหา
                    </button>
                 </div>
            </p>

            <p class="mx-1 mb-3 font-normal text-gray-700">
                รหัสสินค้า: {{onsiteSale.gold.id}}

                <input v-model="edit_gold" id="edit_gold" type="checkbox" value="edit_gold">
                <label class="mx-3">แก้ไขสินค้า</label>
                <div v-if="edit_gold == true" >
                    <label class="mx-3">ค้นหารหัสสินค้า</label>
                    <input class="mx-3" type="text" v-model="onsiteSale.gold.id" autocomplete="off">
                    <button @click="findGold" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                        ค้นหา
                    </button>
                </div>

                <p> ชื่อสินค้า: {{onsiteSale.gold.name}}</p>
                <p> ประเภทสินค้า: {{onsiteSale.gold.gold_type.name}}</p>
                <p> นำ้หนัก: {{onsiteSale.gold.weight}}</p>
                <p> ลาย: {{onsiteSale.gold.gold_pattern.name}}</p>
                <p> วันที่ขาย: {{onsiteSale.sale_date}}</p>
                <label class="mx-3 my-3">ประเภททองเปลี่ยน</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onsiteSale.is_switch_gold">
                        <option value="0">ไม่เป็นทองเปลี่ยน</option>
                        <option value="1">เป็นทองเปลี่ยน</option>
                </select>
                <p> {{onsiteSale.is_switch_gold}}</p>

                <p v-if="onsiteSale.is_switch_gold == 1 && onsiteSale.redemption == null"> 
                    เลขที่บิลรับซื้อ: 
                    <input type="text" v-model="new_onsiteSale.redemption.id">
                    <button @click="findNewRedemption" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                        ค้นหา
                    </button>

                </p>
                <p v-if="onsiteSale.is_switch_gold == 1 && onsiteSale.redemption != null">
                    เลขที่บิลรับซื้อ: 
                    <input type="text" v-model="onsiteSale.redemption.id">
                    <button @click="findRedemption" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                        ค้นหา
                    </button>
                </p>
                <p>{{onsiteSale.redemption}}</p>

                <p>ราคาทอง ณ เวลาขาย: {{onsiteSale.gold_sell_price.sell_price}}</p>
                <p>ราคาสินค้าที่ขาย:</p>
                <input type="text" v-model="onsiteSale.gold_price" >
                <p> {{onsiteSale.gold_price}} </p>

                <p>ช่องทางการชำระเงิน: </p>
                <input v-model="onsiteSale.payment_method" id="cash" type="radio" value="cash">
                <label for="cash"> เงินสด </label>
                <input v-model="onsiteSale.payment_method" id="transfer" type="radio" value="transfer">
                <label for="transfer"> โอน </label>
                <input v-model="onsiteSale.payment_method" id="credit_card" type="radio" value="credit_card">
                <label for="credit_card"> บัตรเครดิต </label>

                <p>{{onsiteSale.payment_method}}</p>

                <p v-if="onsiteSale.payment_method == 'cash'">
                    <div >
                        <p>เงินที่ลูกค้าชำระ: </p>
                        <input type="text" v-model="onsiteSale.paid_amount">
                        <div v-if="onsiteSale.paid_amount - onsiteSale.gold_price > 0">
                            เงินทอน: {{onsiteSale.paid_change = onsiteSale.paid_amount - onsiteSale.gold_price}}
                        </div>
                        <p>{{onsiteSale.paid_change}}</p>
                        <p>{{onsiteSale.payment_method}}</p>
                    </div>
                </p>

                <p v-if="onsiteSale.payment_method == 'transfer'">
                        <p>รูปสลิป: </p>
                        <input type="file" ref="fileInput" accept="image/*" v-on:change="onFileChange" id="file-input">
                        <img :src="`${onsiteSale.slip_image}`" width="200">
                        <p>สถานะโอน: </p>
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onsiteSale.transfer_status">
                        <option value="ยังไม่ได้ตรวจสอบ">ยังไม่ได้ตรวจสอบ</option>
                        <option value="มีปัญหา">มีปัญหา</option>
                        <option value="ยืนยัน">ยืนยัน</option>
                        </select>
                        {{onsiteSale.transfer_status}}
                        <div v-if="onsiteSale.transfer_status == 'มีปัญหา'"> 
                            <input type="text" v-model="onsiteSale.transfer_note">
                        </div>
                </p>

                <p v-if="onsiteSale.payment_method == 'credit_card'">
                    <div>
                        <label class="mx-3 my-3">ประเภทบัตรเครดิต</label>
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onsiteSale.credit_card_type">
                        <option disabled value="">กรุณาเลือกประเภทบัตรเครดิต</option>
                        <option value="Mastercard">Mastercard</option>
                        <option value="VISA">VISA</option>
                        <option value="Union Pay">Union Pay</option>
                        <option value="American Express">American Express</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                   
                    <label class="mx-3 my-3">ธนาคาร</label>
                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onsiteSale.bank_name">
                        <option disabled value="">กรุณาเลือกธนาคาร</option>
                        <option value="กสิกร">กสิกร</option>
                        <option value="กรุงเทพ">กรุงเทพ</option>
                        <option value="กรุงไทย">กรุงไทย</option>
                        <option value="กรุงศรี">กรุงศรี</option>
                        <option value="ออมสิน">ออมสิน</option>
                        <option value="ไทยพาณิช">ไทยพาณิช</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                    </div>
                </p>
            </p>
            <button @click="saveOnsiteSale()" class="px-4 py-2 rounded-lg bg-lime-400">
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
    useOnsiteSaleStore
} from '@/stores/onsiteSale.js'
import {
    useUserStore
} from '@/stores/user.js'
import {
    useGoldStore
} from '@/stores/gold.js'
import {
    useRedemptionStore
} from '@/stores/redemption.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const onsiteSale_store = useOnsiteSaleStore()
        const user_store = useUserStore()
        const gold_store = useGoldStore()
        const redemption_store = useRedemptionStore()
        return {
            auth_store,
            onsiteSale_store,
            user_store,
            gold_store,
            redemption_store
        }

    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            onsiteSale: null,
            onsiteSale_id: null,
            onsiteSale_check_status: null,
            check_status_check: true,
            edit_user: false,
            edit_gold: false,
            new_onsiteSale: {
            //     user: {
            //         id: null,
            //         username: null,
            //         phone: null
            //     },
            //     gold: {
            //         id: null,
            //         id_show: null,
            //         name: null,
            //         gold_type: null,
            //         weight: null,
            //         pattern_type: null,
            //         gold_pattern: null,
            //         size: null,
            //     },
            //     gold_price: 0,
            //     is_switch_gold: null,
            //     sale_date: "",
                redemption: {
                    id: null
                }
            },
            checks: {
                phone_user: true
            },
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
    },
    async created() {
        const id = this.$route.params.id
        // api
        const url = `/onsite_sales/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.onsiteSale = response.data.data
                console.log(this.onsiteSale)
                this.onsiteSale_id = this.onsiteSale.id
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
                this.$router.push("/sale/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.user_store.fetch()
        await this.onsiteSale_store.fetch()
        await this.gold_store.fetch()
        await this.redemption_store.fetch()
    },
    methods: {
        findUser(e) {
            var user = this.user_store.findByPhone(this.onsiteSale.user.phone)
            console.log(user)
            if (user == undefined ||
                user == null) {
                    this.onsiteSale.user.id = null
                    this.onsiteSale.user.username = null
                    this.checks.phone_user = false
                    e.preventDefault();
                    return
            }
            this.onsiteSale.user.id = user.id
            this.onsiteSale.user.username = user.username
            e.preventDefault();
        },
        findGold(e) {
            var gold = this.gold_store.findByID(this.onsiteSale.gold.id)
            console.log(gold)
            if (gold == undefined ||
                gold == null) {
                    this.onsiteSale.gold.id = null
                    this.onsiteSale.gold.name = null
                    this.onsiteSale.gold.gold_type = null
                    this.onsiteSale.gold.weight = null
                    this.onsiteSale.gold.gold_pattern = null
                    this.onsiteSale.sale_date = null
                    e.preventDefault();
                    return
            }
            this.onsiteSale.gold.id =  gold.id
            this.onsiteSale.gold.name = gold.name
            this.onsiteSale.gold.gold_type = gold.gold_type
            this.onsiteSale.gold.weight = gold.weight
            this.onsiteSale.gold.gold_pattern = gold.gold_pattern
            e.preventDefault();
        },
        findRedemption(e) {
            var redemption = this.redemption_store.findByID(this.onsiteSale.redemption.id)
            console.log(redemption)
            if (redemption == undefined ||
                redemption == null) {
                    this.onsiteSale.redemption.id = null
                    e.preventDefault();
                    return
            }
            this.onsiteSale.redemption.id = redemption.id
            e.preventDefault();
        },
        findNewRedemption(e) {
            var redemption = this.redemption_store.findByID(this.new_onsiteSale.redemption.id)
            console.log(redemption)
            if (redemption == undefined ||
                redemption == null) {
                    this.new_onsiteSale.redemption.id = null
                    e.preventDefault();
                    return
            }
            this.new_onsiteSale.redemption.id = redemption.id
            this.onsiteSale.is_switch_gold = 1
            this.onsiteSale.redemption = redemption
            e.preventDefault();
        },
        onFileChange(e) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                this.onsiteSale.slip_image = e.target.result
                console.log(this.image)
            }
        },
        async saveOnsiteSale(e) {
            try {
                await this.onsiteSale_store.edit(this.onsiteSale.id,this.onsiteSale)
                this.$router.push("/sale/view");
                
            } catch (error) {
                console.log(onsiteSale)
                this.error = error.message
                console.error(error.response.data)    
                
            }


        }
    }
}
</script>