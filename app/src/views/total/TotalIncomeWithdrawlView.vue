<template>
    <div class="block my-5">
        <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <h5 class="mx-6 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียดข้อมูล
            </h5>
    <div v-if="selected_income != null" class="py-5 grid grid-cols-2">
        <div class="mx-3 p-5 bg-white border border-gray-200 rounded-lg shadow-md">
            <div class="mx-5">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">ชื่อรายการ: {{ selected_income.name }}</p>
                <div v-if="selected_income.note != null">
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">รายละเอียด: {{ selected_income.note }}</p>
                </div>
                <div v-else>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">รายละเอียด: (ไม่มีรายละเอียดเพิ่มเติม)</p>
                </div>
                
                <p class="mx-1 mb-3 font-normal text-gray-700 ">จำนวนเงิน: {{ selected_income.amount }} บาท</p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">พนักงานที่รับผิดชอบ: {{ selected_income.employee.nickname }}</p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">วันที่ทำรายการ: {{ selected_income.transaction_date }}</p>
            </div>
        </div>
    </div>
    <div v-else class="grid grid-cols-2">
        <div class="mx-3 mt-5 p-5 bg-white border border-gray-200 rounded-lg shadow-md grid grid-cols-2">
            <p>ยังไม่ได้เลือกรายการ</p>
        </div>
    </div>
    <div class="grid grid-cols-2 mt-5">
        <div>
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                รายรับ
            </caption>
            <table>
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                        ลำดับ
                        </th>
                        <th scope="col" class="px-6 py-3">
                        ชื่อรายการ
                        </th>
                        <th scope="col" class="px-6 py-3">
                        จำนวนเงิน
                        </th>
                        <th scope="col" class="px-6 py-3">
                        พนักงาน
                        </th>
                        <th scope="col" class="px-6 py-3">
                        วันที่ทำรายการ
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="income in incomes"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" 
                        :key="income.id" @click="setSelectedIncome(income.id)">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ income.id }}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ income.name }}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ income.amount }}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ income.employee.nickname }}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ income.transaction_date }}
                        </th>

                    </tr>
                </tbody>
            </table>
        </div>

        <div>
            <caption class="p-5 text-lg font-semibold text-left text-gray-900">
                รายจ่าย
            </caption>

            <table>
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                        ลำดับ
                        </th>
                        <th scope="col" class="px-6 py-3">
                        ชื่อรายการ
                        </th>
                        <th scope="col" class="px-6 py-3">
                        จำนวนเงิน
                        </th>
                        <th scope="col" class="px-6 py-3">
                        พนักงาน
                        </th>
                        <th scope="col" class="px-6 py-3">
                        สถานะ
                        </th>
                        <th scope="col" class="px-6 py-3">
                        วันที่ทำรายการ
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="withdrawal in withdrawals"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" 
                        :key="withdrawal.id" >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ withdrawal.id }}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ withdrawal.name }}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ withdrawal.amount }}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ withdrawal.employee.nickname }}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ withdrawal.withdrawal_status }}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ withdrawal.withdrawal_date }}
                        </th>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { useEmployeeStore } from '@/stores/employee.js'
import { useAuthStore } from '@/stores/auth.js'
import { useIncomeStore } from '@/stores/income.js'
import { useWithdrawalStore } from '@/stores/withdrawal.js'

export default {
      setup() {
        const auth_store = useAuthStore()
        const employee_store = useEmployeeStore()
        const income_store = useIncomeStore()
        const withdrawal_store = useWithdrawalStore()
        return { employee_store, auth_store, income_store, withdrawal_store }
      },
      data() {
        return {
            auth: null,
            incomes: null,
            withdrawals: null,
            selected_income: null,
            selected_withdrawal: null,
            error: null,
        }
      },
      async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "manager" ||
                this.user.role == "account") {
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
        console.table(this.incomes)

        await this.withdrawal_store.fetch()
        this.withdrawals = this.withdrawal_store.getWithdrawals
        console.table(this.withdrawals)
        
      },
      methods: {
        async setSelectedIncome(id) {
            this.error = null
            try {
                this.selected_income = await this.income_store.findById(id)
            } catch (error) {
                console.log(error.message)
            }
            
        }
      }
    }
</script>