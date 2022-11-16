<template>
     <div v-if='user.role == "manager"'>
        <div class="block my-5">
               <router-link to="/withdrawal/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
        </div>
        <form @submit.prevent="saveWithdrawal()">
            <div v-if="withdrawal != null" class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>
            
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เลขบิล: {{withdrawal.id}}
            </p>
        
            <p>รายการเบิกเงิน: </p>
            <input type="text" v-model="withdrawal.name">
            
            <p>จำนวนเงิน: </p>
            <p>{{withdrawal.amount.toLocaleString()}} บาท</p>

            <label class="mx-3 my-3">พนักงานที่ต้องการเบิกเงิน</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="withdrawal.employee.id">
                    <option v-for="employee in options.employees" :value="employee.id"> {{ employee.nickname }}</option>
                </select>

            <div>

            </div>
            <label class="mx-3 my-3">วันที่เบิกเงิน:</label>
            <p>{{withdrawal.withdrawal_date}}</p>
            <p class="mx-3 my-3" >พนักงานที่ลงรายการเบิกเงิน:</p>
            <p v-if="withdrawal.employee_withdrawal != null">{{withdrawal.employee_withdrawal.nickname}}</p>
            <label class="mx-3 my-3">สถานะรายการเบิกเงิน:</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="withdrawal.withdrawal_status">
                        <option value="รออนุมัติ">รออนุมัติ</option>
                        <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                        <option value="อนุมัติ">อนุมัติ</option>
            </select>

            <button type="submit" :disabled="disableButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
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
    useWithdrawalStore
} from '@/stores/withdrawal.js'
import {
    useEmployeeStore
} from '@/stores/employee.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const withdrawal_store = useWithdrawalStore()
        const employee_store = useEmployeeStore()
        return {
            auth_store,
            employee_store,
            withdrawal_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            withdrawal: null,
            withdrawal_id: null,
            options: {
                employees: []
            },
            disableButton: false
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
        const url = `/withdrawals/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.withdrawal = response.data.data
                // console.log(this.redemption)
                this.withdrawal_id = this.withdrawal.id
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
                this.$router.push("/total");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.withdrawal_store.fetch()
        await this.employee_store.fetch()
        this.options.employees = this.employee_store.getEmployees
    },
    methods: {
        async saveWithdrawal(e) {
            try {
                console.log(this.withdrawal)
                await this.withdrawal_store.edit(this.withdrawal.id,this.withdrawal)
                console.table(this.withdrawal_store.getWithdrawals)
                this.$router.push("/withdrawal/view");
                
            } catch (error) {
                this.error = error.message
                console.error(error.response)    
                
            }


        }

    }
}
</script>