<template>
<div v-if='user.role == "employee" ||
user.role == "account" ||
user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>

    <div class="block mx-3 my-5">
        <h1 class="text-xl font-semibold">รายการงานสั่งทั้งหมด</h1>
    </div>

    <div class="center">
        <form @submit.prevent="searchID()">
            <div class="inline">
                <label>ID</label>
                <input class="mx-3" type="text" v-model="custom_order_searchID" autocomplete="off">
            </div>

            <button type="submit" :disabled="disabledSearchButton" class="inline p-2 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                งานสั่งที่ยังไม่ส่งมอบให้ลูกค้า
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        เลขงาน
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อลูกค้า
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อสินค้า
                    </th>
                    <th scope="col" class="px-1 py-3">
                        สถานะงานสั่ง
                    </th>
                    <th scope="col" class="px-6 py-3">
                        สถานะโอนมัดจำ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        สถานะโอนส่วนต่าง
                    </th>
                    <th scope="col" class="px-6 py-3">
                        พนักงาน
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="custom_order in custom_orders_not_sent" class="bg-white border-b hover:bg-gray-50" @click="setSearched(custom_order.id)">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{custom_order.id}}
                    </th>
                    <td class="px-6 py-4">
                        {{custom_order.user.first_name}} {{custom_order.user.last_name}}
                    </td>
                    <td class="px-6 py-4">
                        {{custom_order.name}}
                    </td>
                    <td class="px-6 py-4">
                        {{custom_order.custom_order_status}}
                    </td>
                    <td class="px-6 py-4">
                        {{custom_order.deposit_status}}
                    </td>
                    <td class="px-6 py-4">
                        {{custom_order.difference_status}}
                    </td>
                    <td class="px-6 py-4">
                        {{custom_order.employee.nickname}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                งานสั่งที่ส่งมอบให้ลูกค้าแล้ว
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        เลขงาน
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อลูกค้า
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อสินค้า
                    </th>
                    <th scope="col" class="px-1 py-3">
                        สถานะงานสั่ง
                    </th>
                    <th scope="col" class="px-6 py-3">
                        สถานะโอนมัดจำ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        สถานะโอนส่วนต่าง
                    </th>
                    <th scope="col" class="px-6 py-3">
                        พนักงาน
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="custom_order in custom_orders_sent" class="bg-white border-b hover:bg-gray-50" @click="setSearched(custom_order.id)">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{custom_order.id}}
                    </th>
                    <td class="px-6 py-4">
                        {{custom_order.user.first_name}} {{custom_order.user.last_name}}
                    </td>
                    <td class="px-6 py-4">
                        {{custom_order.name}}
                    </td>
                    <td class="px-6 py-4">
                        {{custom_order.custom_order_status}}
                    </td>
                    <td class="px-6 py-4">
                        {{custom_order.deposit_status}}
                    </td>
                    <td class="px-6 py-4">
                        {{custom_order.difference_status}}
                    </td>
                    <td class="px-6 py-4">
                        {{custom_order.employee.nickname}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="px-3 py-3">
        <a v-bind:href="'/custom_order/create'" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            เพิ่ม
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </a>
    </div>

    <div v-if="custom_order_searched != null" class="py-5">
        <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เลขที่งานสั่ง: {{custom_order_searched.id}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ชื่องานสั่ง: {{custom_order_searched.name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ประเภท/ลักษณะ: {{custom_order_searched.type}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                น้ำหนัก: {{custom_order_searched.weight}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ค่าแรง: {{custom_order_searched.wage}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ราคาเต็ม: {{custom_order_searched.full_price}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                มัดจำ: {{custom_order_searched.deposit_total_amount}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ส่วนต่าง: {{custom_order_searched.difference_amount}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                วันที่เสร็จ: {{custom_order_searched.finish_date}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                วันที่สั่ง: {{custom_order_searched.order_date}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                วันที่ส่งมอบ: {{custom_order_searched.delivery_date}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ช่างที่ผลิต: {{custom_order_searched.custom_order_worker.name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ช่องทางการชำระเงินมัดจำ: {{custom_order_searched.deposit_payment_method}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ช่องทางการชำระเงินส่วนต่าง: {{custom_order_searched.difference_paymeny_method}}
            </p>
            <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
                ข้อมูลลูกค้า
            </h5>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เลขสมาชิก: {{custom_order_searched.user.id}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ชื่อ: {{custom_order_searched.user.first_name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                นามสกุล: {{custom_order_searched.user.last_name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เบอร์โทร: {{custom_order_searched.user.phone}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                สถานะงานสั่ง: {{custom_order_searched.custom_order_status}}
            </p>
            <div v-if="custom_order_searched.deposit_payment_method == 'transfer'">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    สถานะโอนมัดจำ: {{custom_order_searched.deposit_status}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    สถานะโอนส่วนต่าง: {{custom_order_searched.difference_status}}
                </p>
            </div>
            <div v-else-if="custom_order_searched.deposit_payment_method == 'cash'">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    เงินที่ลูกค้าจ่าย: {{custom_order_searched.deposit_paid_amount}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    เงินทอน: {{custom_order_searched.depoosit_change_amount}}
                </p>
            </div>
            <div v-else-if="custom_order_searched.deposit_payment_method == 'credit card'">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    ประเภทบัตรเครดิต: {{custom_order_searched.deposit_credit_card_type}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    ธนาคาร: {{custom_order_searched.depoosit_bank_name}}
                </p>
            </div>

            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                พนักงานที่รับผิดชอบ: {{custom_order_searched.employee.nickname}}
            </p>
            <div v-if="user.role == 'manager'"
            class="py-3">
                <a v-bind:href="'/custom_order/edit/'+custom_order_searched.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    แก้ไข
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
            <div v-if="user.role == 'employee' ||
                    user.role == 'account'"
                    class="py-3">
                <a v-bind:href="'/custom_order/edit/'+custom_order_searched.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    เปลี่ยนสถานะ
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
            <div class="py-3">
                <a v-bind:href="'/custom_order/edit_customer/'+custom_order_searched.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    ลูกค้ามารับสินค้า
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
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
    useCustomOrderStore
} from '@/stores/custom_order.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const custom_order_store = useCustomOrderStore()
        return {
            auth_store,
            custom_order_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            custom_orders_not_sent: null,
            custom_orders_sent: null,
            custom_order_searched: null,
            disabledSearchButton: false,
            custom_order_searchID: null
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
        await this.custom_order_store.fetch()
        this.custom_orders_not_sent = this.custom_order_store.filterNotSent
        this.custom_orders_sent = this.custom_order_store.filterSent
    },
    methods: {
        async searchID() {
            this.error = null
            this.disabledSearchButton = true
            if (this.custom_order_searchID == null ||
                this.custom_order_searchID == "") {
                this.custom_order_searched = null
                this.$router.go(0)
            }
            try {
                this.custom_order_searched = await this.custom_order_store.getID(this.custom_order_searchID)
                this.custom_orders_not_sent = this.custom_order_store.filterNotSent
                this.custom_orders_sent = this.custom_order_store.filterSent
                console.log(this.custom_order_searched)
                this.custom_orders_not_sent = this.custom_order_store.filterCustomOrdersByID(this.custom_orders_not_sent, this.custom_order_searchID)
                this.custom_orders_sent = this.custom_order_store.filterCustomOrdersByID(this.custom_orders_sent, this.custom_order_searchID)
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
            }
        },
        async setSearched(id) {
            this.error = null
            try {
                this.custom_order_searched = await this.custom_order_store.getID(id)
                console.log(this.custom_order_searched)
            } catch (error) {
                this.error = error.message
            }
        }
    }
}
</script>
