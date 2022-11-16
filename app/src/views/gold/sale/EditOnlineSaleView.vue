<template>
    <div v-if='user.role == "employee" ||
               user.role == "account" ||
               user.role == "manager"'>
               <div class="block my-5">
               <router-link to="/sale/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
                </div>
                <div v-if=" onlineSale!= null" class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
                    <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    รายละเอียด
                    </h5>

                    <p class="mx-1 mb-3 font-normal text-gray-700 ">
                       เลขบิล: {{onlineSale.id}}
                    </p>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        ช่องทางการขาย: ออนไลน์
                    </p>

                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        รหัสสินค้า: {{onlineSale.gold.id}}
                        
                        <div v-if='user.role == "manager"'>
                            <input v-model="edit_gold" id="edit_gold" type="checkbox" value="edit_gold">
                            <label class="mx-3">แก้ไขสินค้า</label>
                            <div v-if="edit_gold == true" >
                                <label class="mx-3">ค้นหารหัสสินค้า</label>
                                <input class="mx-3" type="text" v-model="onlineSale.gold.id" autocomplete="off">
                                <button @click="findGold" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                                    ค้นหา
                                </button>
                            </div>
                        </div>

                        <p> ชื่อสินค้า: {{onlineSale.gold.name}}</p>
                        <p> ประเภทสินค้า: {{onlineSale.gold.gold_type.name}}</p>
                        <p v-if="onlineSale.gold.custom_weight == null"> นำ้หนัก: {{onlineSale.gold.weight}}</p>
                        <p v-if="onlineSale.gold.weight == null"> นำ้หนัก: {{onlineSale.gold.custom_weight.toLocaleString()}} กรัม</p>
                        <p> ลาย: {{onlineSale.gold.gold_pattern.name}}</p>
                        <p> ไซส์: {{onlineSale.gold.size}}</p>
                        <p> ราคาสินค้า:</p>
                        <p> {{onlineSale.gold_price.toLocaleString()}} บาท</p>
                    
                    
                        <p> วันที่ขาย: {{onlineSale.sale_date}}</p>
                        <p> ราคาทอง ณ เวลาขาย: {{onlineSale.gold_sell_price.sell_price.toLocaleString()}} บาท</p>
                        
                        <div v-if='user.role == "manager"'>
                            <p> รายละเอียดเพิ่มเติมจากลูกค้า:</p>
                            <input type="text" v-model="onlineSale.additional_note" >
                            <p> {{onlineSale.additional_note}} </p>
                            
                            <p>รูปสลิป: </p>
                            <img :src="`${onlineSale.slip_image}`" width="200">

                            <p>สถานะคำสั่งซื้อ: </p>
                            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onlineSale.transfer_status">
                                <option value="ยังไม่ได้ตรวจสอบ">ยังไม่ได้ตรวจสอบ</option>
                                <option value="มีปัญหา">มีปัญหา</option>
                                <option value="ยืนยัน">ยืนยัน</option>
                                <option value="ยกเลิกรายการ">ยกเลิกรายการ</option>
                            </select>

                            <div v-if="onlineSale.transfer_status == 'มีปัญหา' || onlineSale.transfer_status == 'ยกเลิกรายการ'">
                                <p>หมายเหตุ: </p>
                                <input type="text" v-model="onlineSale.transfer_note" >
                            </div>
                        </div>

                        <div v-if='user.role == "account" ||
                                user.role == "employee"'>
                            <p> {{onlineSale.additional_note}} </p>
                            <p>รูปสลิป: </p>
                            <img :src="`${onlineSale.slip_image}`" width="200">

                            <p>สถานะคำสั่งซื้อ: {{onlineSale.transfer_status}}</p>
                        </div>

                        <div v-if="onlineSale.transfer_status == 'ยืนยัน'">
                            <p>สถานะการจัดส่ง: </p>
                            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onlineSale.delivery_status">
                                <option value="เตรียม">เตรียม</option>
                                <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
                                <option value="จัดส่งสำเร็จ">จัดส่งสำเร็จ</option>
                            </select>

                            <div v-if="onlineSale.delivery_status == 'กำลังจัดส่ง'">
                                <p>เลข track:</p>
                                <input type="text" v-model="onlineSale.tracking_number" >
                            </div>
   
                            <div v-if="onlineSale.delivery_status == 'จัดส่งสำเร็จ'">
                                <p>เลข track: </p>
                                {{onlineSale.tracking_number}}
                            </div>
                        </div>

                        <div v-if="onlineSale.delivery_status !=  old_onlineSale.delivery_status">
                            พนักงานเปลี่ยนสถานะจัดส่ง: 
                            <div>
                                {{onlineSale.delivery_status_employee.nickname = user.employee.nickname}}
                            </div>

                        </div>

                        <div v-if="onlineSale.delivery_status != null && onlineSale.delivery_status ==  old_onlineSale.delivery_status">
                            พนักงานเปลี่ยนสถานะจัดส่ง: 
                            <div>
                                {{onlineSale.delivery_status_employee.nickname}}
                            </div>

                        </div>

                        <div v-if="onlineSale.tracking_number !=  old_onlineSale.tracking_number">
                            พนักงานเปลี่ยนสถานะจัดส่ง: 
                            <div>
                                {{onlineSale.tracking_id_employee.nickname = user.employee.nickname}}
                            </div>

                        </div>

                        <div v-if="onlineSale.tracking_number != null && onlineSale.tracking_number ==  old_onlineSale.tracking_number">
                            พนักงานเพิ่มเลข track: 
                            <div>
                                {{onlineSale.tracking_id_employee.nickname}}
                            </div>

                        </div>

                        <p>note(ภายในร้าน)</p>
                        <input type="text" v-model="onlineSale.note">
                    
                        <br>
                        <br>
                        <br>
                        <button @click="saveOnlineSale()" class="px-4 py-2 rounded-lg bg-lime-400">
                            ยืนยันการเปลี่ยนแปลง
                        </button>
                    </p>
                </div>
    </div>

</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useUserStore
} from '@/stores/user.js'
import {
    useGoldStore
} from '@/stores/gold.js'
import {
    useOnlineSaleStore
} from '@/stores/onlineSale.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        const gold_store = useGoldStore()
        const onlineSale_store = useOnlineSaleStore()
        return {
            auth_store,
            user_store,
            gold_store,
            onlineSale_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            onlineSale: null,
            onlineSale_id: null,
            edit_gold: false,
            old_onlineSale: {
                delivery_status: null,
                tracking_number: null
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
    },
    async created() {
        const id = this.$route.params.id
        // api
        const url = `/online_sales/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.onlineSale = response.data.data
                console.log(this.onlineSale)
                this.onlineSale_id = this.onlineSale.id
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
            if (this.user.role == "manager" ||
                this.user.role == "employee" ||
                this.user.role == "account") {
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
        this.old_onlineSale.delivery_status = this.onlineSale.delivery_status
        this.old_onlineSale.tracking_number = this.onlineSale.tracking_number
        await this.onlineSale_store.fetch()
        await this.gold_store.fetch()
        
    },
    methods: {
        findGold(e) {
            var gold = this.gold_store.findByID(this.onlineSale.gold.id)
            console.log(gold)
            if (gold == undefined ||
                gold == null) {
                    this.onlineSale.gold.id = null
                    this.onlineSale.gold.name = null
                    this.onlineSale.gold.gold_type = null
                    this.onlineSale.gold.weight = null
                    this.onlineSale.gold.gold_pattern = null
                    this.onlineSale.sale_date = null
                    e.preventDefault();
                    return
            }
            this.onlineSale.gold.id =  gold.id
            this.onlineSale.gold.name = gold.name
            this.onlineSale.gold.gold_type = gold.gold_type
            this.onlineSale.gold.weight = gold.weight
            this.onlineSale.gold.gold_pattern = gold.gold_pattern
            e.preventDefault();
        },
        onFileChange(e) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = e => {
                this.onlineSale.slip_image = e.target.result
                console.log(this.image)
            }
        },
        async saveOnlineSale(e) {
            try {
                await this.onlineSale_store.edit(this.onlineSale.id,this.onlineSale)
                this.$router.push("/sale/view");
                
            } catch (error) {
                console.log(onlineSale)
                this.error = error.message
                console.error(error.response.data)    
                
            }


        }

    }
}
</script>