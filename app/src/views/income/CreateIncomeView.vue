<template>
    <div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    <div class="pt-8 pb-8 flex items-center justify-center">
        <div class="card-white w-[1200px]">
            <div class="flex flex-col text-s1">
                <p>หน้าหลัก > เพิ่ม</p>
                <div class="flex flex-row w-[554px]">
                    <label for="nextID" class="m-3">เลขบิล: {{income.id}} </label>
                    <p class="ml-auto m-3">วันที่เพิ่ม: {{income.transaction_date}}</p>
                </div>
                
                <div class="card-gray w-[554px] flex flex-col">
                    <form @submit.prevent="createIncome()">
                        <div class="flex flex-row">
                            <p class="pt-2">ชื่อรายการ:</p>
                            <input type="text" class="text-field w-[384px] ml-auto mr-3" v-model="income.name">
                        </div>

                        <div class="flex flex-row">
                            <p class="pt-2">จำนวนเงิน:</p>
                            <input type="number" class="text-field w-[384px] ml-auto mr-3" v-model="income.amount">
                        </div>

                        <div class="flex flex-row">
                            <p class="pt-2">หมายเหตุ:</p>
                            <textarea v-model="income.note" name="" id="" cols="30" rows="10" class="text-field w-[384px] ml-auto mr-3"></textarea>
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
    useIncomeStore
} from '@/stores/income.js'
import {
    useUserStore
} from '@/stores/user.js'
import moment from 'moment'
export default {
    setup() {
        const auth_store = useAuthStore()
        const income_store = useIncomeStore()
        const user_store = useUserStore()
        return {
            auth_store,
            income_store,
            user_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            income: {
                id: -1,
                name: null,
                amount: null,
                note: null,
                employee: null,
                transaction_date: "",
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
        await this.income_store.fetch()
        await this.user_store.fetch()
        this.income.id = this.income_store.getNextID()
        this.income.transaction_date = moment().format("YYYY-MM-DD")
    },
    methods: {
        async createIncome() {
            this.disabledButton = true
            // validation
            this.input_check.errors = []
            this.input_check.is_valid = true

            if (this.income.amount <= 0) {
                this.input_check.errors.push("จำนวนเงินต้องเป็นจำนวนบวก")
                this.input_check.is_valid = false
            }

            if (this.input_check.is_valid == false) {
                this.disabledButton = false
                return
            }


            try {
                var income = {
                    name: this.income.name,
                    amount: this.income.amount,
                    note: this.income.note,
                    employee_id: this.user.employee.id,
                    transaction_date: this.income.transaction_date
                }
                await this.income_store.add(income)
                console.log(income)

                this.$router.push("/income/view");
            } catch (error) {
                console.log(income)

                this.error = error.message
                console.error(error.response.data)
            }
        }

    }

}
</script>
