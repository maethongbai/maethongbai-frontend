<template>
<div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/income/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <form @submit.prevent="createIncome()">
        <div class="mx-3 my-3">
            <label for="nextID" class="mx-3">เลขบิล: {{income.id}} </label>
            <div>
                <p>รายการรับเงิน:</p>
                <input type="text" v-model="income.name">
            </div>

            <div>
                <p>จำนวนเงิน:</p>
                <input type="number" step=".01" v-model="income.amount">
            </div>

            <div>
                <p>หมายเหตุ:</p>
                <input type="text" v-model="income.note">
            </div>
        </div>

        <button type="submit" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
            บันทึกรายการรับเงิน
        </button>
        <label v-if="input_check.is_valid == false" class="inline-block mx-1 mb-2 text-red-500 font-bold">
            บันทึกรายการรับเงินไม่สำเร็จ ตรวจสอบ error ข้างล่าง
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
