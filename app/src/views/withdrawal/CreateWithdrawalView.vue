<template>
        <div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    <div class="pt-8 pb-8 flex items-center justify-center">
        <div class="card-white w-[1200px]">
            <div class="flex flex-col text-s1">
                <p>หน้าหลัก > เพิ่ม</p>
                <div class="flex flex-row w-[554px]">
                    <label for="nextID" class="m-3">เลขบิล: {{withdrawal.id}} </label>
                    <p class="ml-auto m-3">วันที่เพิ่ม: {{withdrawal.withdrawal_date}}</p>
                </div>
                
                <div class="card-gray w-[554px] flex flex-col">
                    <form @submit.prevent="createWithdrawal()">
                        <div class="flex flex-row">
                            <p class="pt-2">ชื่อรายการ:</p>
                            <input type="text" class="text-field w-[384px] ml-auto mr-3" v-model="withdrawal.name">
                        </div>

                        <div class="flex flex-row">
                            <p class="pt-2">จำนวนเงิน:</p>
                            <input type="number" class="text-field w-[384px] ml-auto mr-3" v-model="withdrawal.amount">
                        </div>

                        <div class="flex flex-row">
                            <p  class="pt-2">พนักงานที่ต้องการเบิกเงิน:</p>
                            <select class="select-box w-[280px] ml-auto mr-3" v-model="withdrawal.employee">
                                <option v-for="employee in options.employees" :value="employee.id"> {{ employee.nickname }}</option>
                            </select>
                        </div>

                        <div class="w-[250px] mx-auto">
                            <button type="submit" :disabled="disabledButton" class="red-btn w-[282px] m-2 mt-6 mx-auto">
                                บันทึกรายการรับเงิน
                            </button>
                            <label v-if="input_check.is_valid == false" class="inline-block mx-1 mb-2 text-red-500 font-bold">
                                บันทึกรายการรับเงินไม่สำเร็จ ตรวจสอบ error ข้างล่าง
                            </label>
                            <label v-if="input_check.is_valid == false" v-for="error in input_check.errors" class="block mx-3 font-medium text-red-500">
                                - {{error}}
                            </label>
                        </div>
                    </form>
                </div>

                </div>
            </div>
        </div>
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
            this.disabledButton = true
            // validation
            this.input_check.errors = []
            this.input_check.is_valid = true

            if (this.withdrawal.amount <= 0) {
                this.input_check.errors.push("จำนวนเงินต้องเป็นจำนวนบวก")
                this.input_check.is_valid = false
            }
            if (this.withdrawal.employee == null) {
                this.input_check.errors.push("กรุณาเลือกพนักงานที่ต้องการเบิกเงิน")
                this.input_check.is_valid = false
            }

            if (this.input_check.is_valid == false) {
                this.disabledButton = false
                return
            }

            try {
                var withdrawal = {
                    name: this.withdrawal.name,
                    amount: this.withdrawal.amount,
                    employee_id: this.withdrawal.employee,
                    withdrawal_date: this.withdrawal.withdrawal_date,
                    withdrawals_employee_id: this.user.employee.id
                }
                await this.withdrawal_store.add(withdrawal)
                console.table(this.withdrawal_store.getWithdrawals)
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