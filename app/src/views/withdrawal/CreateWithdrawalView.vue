<template>
    <div v-if= 'user.role == "account" ||
        user.role == "manager"'>
         <div class="block my-5">
               <router-link to="/withdrawal/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
        </div>
        <form @submit.prevent="createWithdrawal()">
            <div class="mx-3 my-3">
            <label for="nextID" class="mx-3">เลขบิล: {{withdrawal.id}} </label>
            <div>
                <p>รายการเบิกเงิน:</p>
                <input type="text" v-model="withdrawal.name">
            </div>

            <div>
                <p>จำนวนเงิน:</p>
                <input type="text" v-model="withdrawal.amount">
            </div>

            <div>
                <p>พนักงานที่ต้องการเบิกเงิน:</p>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="withdrawal.employee">
                    <option disabled value="">กรุณาเลือกพนักงานที่ต้องการเบิกเงิน</option>
                    <option v-for="employee in options.employees" :value="employee.id"> {{ employee.nickname }}</option>
                </select>
            </div>

            <div>
                <p>วันที่เบิก:</p>
                <p>{{withdrawal.withdrawal_date}}</p>
            </div>
            </div>
        
        <button type="submit" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
            บันทึกรายการเบิกเงิน
        </button>
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
import moment from 'moment'
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
            withdrawal: {
                id: -1,
                name: null,
                amount: null,
                employee: null,
                withdrawal_date: "",
            },
            options: {
                employees: []
            },
            disabledButton: false,
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
        await this.withdrawal_store.fetch()
        await this.employee_store.fetch()
        this.options.employees = this.employee_store.getEmployees
        this.withdrawal.id = this.withdrawal_store.getNextID()
        this.withdrawal.withdrawal_date = moment().format("YYYY-MM-DD")
    },
    methods: {
        async createWithdrawal() {
            try {
                var withdrawal = {
                    name: this.withdrawal.name,
                    amount: this.withdrawal.amount,
                    employee_id: this.withdrawal.employee,
                    withdrawal_date: this.withdrawal.withdrawal_date,
                    withdrawals_employee_id: this.user.employee.id
                }
                await this.withdrawal_store.add(withdrawal)
                console.log(withdrawal)

                this.$router.push("/withdrawal/view");
            } catch (error) {
                console.log(withdrawal)

                this.error = error.message
                console.error(error.response.data)
            }
        }

    }


}
</script>