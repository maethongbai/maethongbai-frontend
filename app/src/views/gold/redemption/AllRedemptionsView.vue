<template>
<!-- back button -->
<div>
    <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
</div>

<!-- redemptions will show up when logged in -->
<div v-if="auth" class="mt-5 center">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                รายการรอยืนยัน
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ลำดับ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อลูกค้า
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อสินค้า
                    </th>
                    <th scope="col" class="px-1 py-3">
                        สถานะการตรวจสอบ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        พนักงาน
                    </th>
                    <th scope="col" class="px-6 py-3">
                        หมายเหตุ
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="redemption in redemptions_checking" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ redemption.id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ redemption.user.first_name }} {{ redemption.user.last_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ redemption.gold.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ redemption.check_status }}
                    </td>
                    <td class="px-6 py-4">
                        {{ redemption.employee.nickname }}
                    </td><td class="px-6 py-4">
                        {{ redemption.note }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                รายการรับซื้อคืนสมบูรณ์
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ลำดับ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อลูกค้า
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อสินค้า
                    </th>
                    <th scope="col" class="px-1 py-3">
                        สถานะการตรวจสอบ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        พนักงาน
                    </th>
                    <th scope="col" class="px-6 py-3">
                        หมายเหตุ
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="redemption in redemptions_confirmed" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ redemption.id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ redemption.user.first_name }} {{ redemption.user.last_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ redemption.gold.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ redemption.check_status }}
                    </td>
                    <td class="px-6 py-4">
                        {{ redemption.employee.nickname }}
                    </td><td class="px-6 py-4">
                        {{ redemption.note }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                รายการทั้งหมด
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ลำดับ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อลูกค้า
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อสินค้า
                    </th>
                    <th scope="col" class="px-1 py-3">
                        สถานะการตรวจสอบ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        พนักงาน
                    </th>
                    <th scope="col" class="px-6 py-3">
                        หมายเหตุ
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="redemption in redemptions" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ redemption.id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ redemption.user.first_name }} {{ redemption.user.last_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ redemption.gold.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ redemption.check_status }}
                    </td>
                    <td class="px-6 py-4">
                        {{ redemption.employee.nickname }}
                    </td><td class="px-6 py-4">
                        {{ redemption.note }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div> -->
</div>
<div v-else>
    please log in first
</div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useRedemptionStore
} from '@/stores/redemption.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const redemption_store = useRedemptionStore()
        return {
            auth_store,
            redemption_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            redemptions: null,
            redemptions_checking: null,
            redemptions_confirmed: null,
            error: null
        }
    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                console.log(newValue.getAuth)
                this.auth = newValue.getAuth
                this.user = JSON.parse(newValue.getUser)
            }
        }
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            // console.log(this.auth.user)
            this.user = JSON.parse(this.auth_store.getUser)
            if(this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager") {
                console.log("authorized");
            } else {
                this.$router.push("/");
            }
            
            // console.log(this.user);
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }

        await this.redemption_store.fetch()
        this.redemptions = this.redemption_store.getRedemptions
        this.redemptions_checking = this.redemption_store.filterChecking
        this.redemptions_confirmed = this.redemption_store.filterConfirmed
    }
}
</script>
