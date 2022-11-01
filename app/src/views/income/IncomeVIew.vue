<template>
    <div v-if= 'user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    </div>
    <div>
        <form  @submit.prevent="incomeSearchID()">
            <div class="inline">
                <label>เลขที่บิลรายการรับเงิน</label>
                <input id="income_SearchID" class="mx-3" type="text" v-model="income_SearchID" autocomplete="off">
            </div>

           <button type="submit" class="inline p-1 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
        </div>
        <br>
        <p>รายการรับเงิน</p>
        <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
            <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> รายการรับเงิน </th>
                <th class="border border-green-700"> จำนวนเงิน </th>
                <th class="border border-green-700"> พนักงานที่ลงรายการรับเงิน </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700  hover:bg-green-100 dark:hover:bg-gray-600" v-for="income in incomes" @click="setSearched(income.id)">
            <tr>
                <td class="border border-green-700"> {{income.id}} </td>
                <td class="border border-green-700"> {{income.name}} </td>
                <td class="border border-green-700"> {{income.amount}} </td>
                <td class="border border-green-700"> {{income.employee.nickname}} </td>
            </tr>
        </tbody>
        </table>
        <br>
        <br>
        <br>
        <div v-if="income_search != null" class="py-5" >
        <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>
            <p> เลขที่บิลรับเงิน : {{income_search.id}}</p>
            <p> รายการรับเงิน : {{income_search.name}}</p>
            <p> จำนวนเงิน : {{income_search.amount}}</p>
            <p> หมายเหตุ : {{income_search.note}}</p>
            <p> พนักงานที่ลงรายการ : {{income_search.employee.nickname}}</p>
        </div>
        <div class="block my-5">
               <router-link to="/income/create" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">เพิ่มรายการรับเงิน</router-link>
        </div>

        <div v-if="user.role == 'manager'">
                <a v-bind:href="'/income/edit/'+ income_search.id " class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    แก้ไข
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
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
    useEmployeeStore
} from '@/stores/employee.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const income_store = useIncomeStore()
        const employee_store = useEmployeeStore()
        return {
            auth_store,
            employee_store,
            income_store
        }

    },
    data() {
        return {
            auth: null,
            user: null,
            incomes: null,
            income_search: null,
            disabledSearchButton: false,
            income_SearchID: null
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
        this.incomes = this.income_store.getIncomes
    },
    methods: {
        async incomeSearchID() {
            this.error = null
            this.disabledSearchButton = true
            if (this.income_SearchID == null ||
                this.income_SearchID == "") {
                    this.income_search = null
                    this.$router.go(0)
            }
            try {
                this.income_search = await this.income_store.getID(this.income_SearchID)
                this.incomes = this.income_store.getIncomes
                this.incomes = this.income_store.filterIncomeByID(this.incomes,this.income_SearchID)
                this.income_search = this.income_search
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
               
            }
        },
        async setSearched(income_id) {
            this.error = null
            try { 
                console.log(this.income_store.getID(income_id))
                this.income_search = await this.income_store.getID(income_id)
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
            }
        }

    }

}
</script>