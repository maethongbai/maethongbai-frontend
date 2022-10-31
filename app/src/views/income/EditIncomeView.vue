<template>
    <div v-if='user.role == "manager"'>
        <div v-if="income != null" class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เลขบิล: {{income.id}}
            </p>
            <p>รายการรับเงิน: </p>
            <input type="text" v-model="income.name">
            
            <p>จำนวนเงิน: </p>
            <p>{{income.amount}}</p>

            <p>หมายเหตุ: </p>
            <input type="text" v-model="income.note">

            <p>พนักงาน: </p>
            <p> {{income.employee.nickname}}</p>

            <p>วันที่ทำรายการ: </p>
            <p> {{income.transaction_date}}</p>

            <button @click="saveIncome()" class="px-4 py-2 rounded-lg bg-lime-400">
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
    useIncomeStore
} from '@/stores/income.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const income_store = useIncomeStore()
        return {
            auth_store,
            income_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            income: null,
            income_id: null,
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
        const url = `/incomes/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.income = response.data.data
                // console.log(this.redemption)
                this.income_id = this.income.id
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
    },
    methods: {
        async saveIncome(e) {
            try {
                console.log(this.income)
                await this.income_store.edit(this.income.id,this.income)
                this.$router.push("/total");
                
            } catch (error) {
                this.error = error.message
                console.error(error.response)    
                
            }


        }

    }
}
</script>