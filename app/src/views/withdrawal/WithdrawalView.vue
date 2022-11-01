<template>
<div v-if= 'user.role == "account" ||
        user.role == "manager"'>
         <div>
        <form  @submit.prevent="withdrawalsSearchID()">
           <div class="inline">
            <label>เลขที่บิลรายการเบิกเงิน</label>
            <input id="withdrawal_SearchID" class="mx-3" type="text" v-model="withdrawal_SearchID" autocomplete="off">
           </div>

           <button type="submit" class="inline p-1 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
        </div>
        <br>
        <p>รายการเบิกเงินที่รอการอนุมัติ</p>
        <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
            <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> รายการเบิก </th>
                <th class="border border-green-700"> พนักงานที่ต้องการเบิก </th>
                <th class="border border-green-700"> พนักงานที่ลงรายการเบิก </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700  hover:bg-green-100 dark:hover:bg-gray-600" v-for="withdrawal in withdrawals_checking" @click="setSearched(withdrawal.id)">
            <tr>
                <td class="border border-green-700"> {{withdrawal.id}} </td>
                <td class="border border-green-700"> {{withdrawal.name}} </td>
                <td class="border border-green-700"> {{withdrawal.employee.nickname}} </td>
                <td class="border border-green-700" v-if="withdrawal.employee_withdrawal !=null"> {{withdrawal.employee_withdrawal.nickname}} </td>
            </tr>
        </tbody>
        </table>
        
        <p>รายการเบิกเงินที่ได้รับอนุมัติ</p>
        <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
            <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> รายการเบิก </th>
                <th class="border border-green-700"> พนักงานที่ต้องการเบิก </th>
                <th class="border border-green-700"> พนักงานที่ลงรายการเบิก </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700  hover:bg-green-100 dark:hover:bg-gray-600" v-for="withdrawal in withdrawals_confirm" @click="setSearched(withdrawal.id)">
            <tr>
                <td class="border border-green-700"> {{withdrawal.id}} </td>
                <td class="border border-green-700"> {{withdrawal.name}} </td>
                <td class="border border-green-700"> {{withdrawal.employee.nickname}} </td>
                <td class="border border-green-700" v-if="withdrawal.employee_withdrawal !=null"> {{withdrawal.employee_withdrawal.nickname}} </td>
            </tr>
        </tbody>
        </table>

        <p>รายการเบิกเงินที่ไม่ได้รับอนุมัติ</p>
        <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
            <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> รายการเบิก </th>
                <th class="border border-green-700"> พนักงานที่ต้องการเบิก </th>
                <th class="border border-green-700"> พนักงานที่ลงรายการเบิก </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700  hover:bg-green-100 dark:hover:bg-gray-600" v-for="withdrawal in withdrawals_problem" @click="setSearched(withdrawal.id)">
            <tr>
                <td class="border border-green-700"> {{withdrawal.id}} </td>
                <td class="border border-green-700"> {{withdrawal.name}} </td>
                <td class="border border-green-700"> {{withdrawal.employee.nickname}} </td>
                <td class="border border-green-700" v-if="withdrawal.employee_withdrawal !=null"> {{withdrawal.employee_withdrawal.nickname}} </td>
            </tr>
        </tbody>
        </table>    

    </div>
    <br>
    <br>
    <div v-if="withdrawal_search != null" class="py-5" >
        <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>
            <p> เลขที่บิลเบิกเงิน : {{withdrawal_search.id}}</p>
            <p> รายการเบิกเงิน : {{withdrawal_search.name}}</p>
            <p> จำนวนเงิน : {{withdrawal_search.amount}}</p>
            <p> สถานะรายการเบิกเงิน : {{withdrawal_search.withdrawal_status}}</p>
            <p> พนักงานที่ต้องการเบิกเงิน : {{withdrawal_search.employee.nickname}}</p>
            <p v-if="withdrawal_search.employee_withdrawal !=null"> พนักงานที่ลงรายการเบิกเงิน : {{withdrawal_search.employee_withdrawal.nickname}}</p>
        </div>

        <div v-if="user.role == 'manager'">
                <a v-bind:href="'/withdrawal/edit/'+ withdrawal_search.id " class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
            withdrawals: null,
            withdrawal_search: null,
            withdrawals_checking: null,
            withdrawals_confirm: null,
            withdrawals_problem: null,
            disabledSearchButton: false,
            withdrawal_SearchID: null
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
        this.withdrawals = this.withdrawal_store.getWithdrawals
        this.withdrawals_checking = this.withdrawal_store.filterChecking
        this.withdrawals_problem = this.withdrawal_store.filterProblem
        this.withdrawals_confirm = this.withdrawal_store.filterConfirm
    },
    methods: {
        async withdrawalsSearchID() {
            this.error = null
            this.disabledSearchButton = true
            if (this.withdrawal_SearchID == null ||
                this.withdrawal_SearchID == "") {
                    this.withdrawal_search = null
                    this.$router.go(0)
            }
            try {
                this.withdrawal_search = await this.withdrawal_store.getID(this.withdrawal_SearchID)
                this.withdrawals_checking = this.withdrawal_store.filterChecking
                this.withdrawals_problem = this.withdrawal_store.filterProblem
                this.withdrawals_confirm = this.withdrawal_store.filterConfirm
                this.withdrawals_checking = this.withdrawal_store.findByID(this.withdrawals_checking, this.withdrawal_SearchID)
                this.withdrawals_problem = this.withdrawal_store.findByID(this.withdrawals_problem, this.withdrawal_SearchID)
                this.withdrawals_confirm = this.withdrawal_store.findByID(this.withdrawals_confirm, this.withdrawal_SearchID)
                this.withdrawal_search = this.withdrawal_search
                this.withdrawal_SearchID = null
                this.withdrawal_search = null
                
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
               
            }
        },
        async setSearched(withdrawal_id) {
            this.error = null
            try { 
                console.log(this.withdrawal_store.getID(withdrawal_id))
                this.withdrawal_search = await this.withdrawal_store.getID(withdrawal_id)
               

            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
            }
        }

    }

}
</script>