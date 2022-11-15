<template>
    <div v-if='user.role == "manager"'>
        <div class="block my-5">
        <router-link to="/sale/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
        </div>
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
                <p v-if="onsiteSale.gold.custom_weight == null"> นำ้หนัก: {{onsiteSale.gold.weight}}</p>
                <p v-if="onsiteSale.gold.weight == null"> นำ้หนัก: {{onsiteSale.gold.custom_weight}}</p>
                <p> ลาย: {{onsiteSale.gold.gold_pattern.name}}</p>
                <p> วันที่ขาย: {{onsiteSale.sale_date}}</p>
                <label class="mx-3 my-3">ประเภททองเปลี่ยน</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onsiteSale.is_switch_gold">
                        <option value="0">ไม่เป็นทองเปลี่ยน</option>
                        <option value="1">เป็นทองเปลี่ยน</option>
                </select>
                

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
                    <label v-if="redemption_found == true" class="inline-block mx-3">>>> พบเลขที่บิลรับซื้อท่ี {{onsiteSale.redemption.id}}  </label> 
                </p>
                <!-- <p>{{onsiteSale.redemption}}</p> -->

                <p>ราคาทอง ณ เวลาขาย: {{onsiteSale.gold_sell_price.sell_price}}</p>
                <p>ราคาสินค้าที่ขาย:</p>
                <p> {{onsiteSale.gold_price}} </p>

                <p>ช่องทางการชำระเงิน: </p>
                <p>{{onsiteSale.payment_method}}</p>

                <p v-if="onsiteSale.payment_method == 'cash'">
                    <div >
                        <p>เงินที่ลูกค้าชำระ: </p>
                        <p> {{onsiteSale.paid_amount}}</p>
                        <p> เงินทอน: </p>
                        <p> {{onsiteSale.paid_change}}</p>
                    </div>
                </p>

                <p v-if="onsiteSale.payment_method == 'transfer'">
                        <p>รูปสลิป: </p>
                        <img :src="`${onsiteSale.slip_image}`" width="200">
                        <p>สถานะโอน: </p>
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onsiteSale.transfer_status">
                        <option value="ยังไม่ได้ตรวจสอบ">ยังไม่ได้ตรวจสอบ</option>
                        <option value="มีปัญหา">มีปัญหา</option>
                        <option value="ยืนยัน">ยืนยัน</option>
                        </select>
                        <div v-if="onsiteSale.transfer_status == 'มีปัญหา'"> 
                            <input type="text" v-model="onsiteSale.transfer_note">
                        </div>
                </p>

                <label class="mx-3 my-3">สถานะยกเลิกรายการ</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onsiteSale.is_cancel_bill">
                        <option value="0">ไม่เป็นรายการที่ถูกยกเลิก</option>
                        <option value="1">ยกเลิกรายการ</option>
                </select>
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
            redemption_found: false,
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
                    this.redemption_found = false
                    return
            }
            this.onsiteSale.redemption.id = redemption.id
            this.redemption_found = true
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