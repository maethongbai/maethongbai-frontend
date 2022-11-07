<template>
<!-- back button -->

<!-- redemptions will show up when logged in -->
<div v-if='user.role == "employee" ||
    user.role == "account" ||
    user.role == "manager"'>
    <div class="pt-8 pb-8 flex items-center justify-center">
        <div class="card-white w-[1200px] text-s1">
            <div class="m-4 mb-0">
                <b>หน้าหลักระบบหลังร้าน > รายการรับซื้อทอง</b>
                <div class="flex flex-row mt-5">

                    
                    <div class="mr-auto">
                        <p class="text-xl">รอการยืนยัน</p>
                    </div>

                    <div class="flex flex-row ml-auto">
                        <form @submit.prevent="searchID()">
                            <div class="flex flex-row">
                                <p class="p-2">รหัสใบเสร็จ</p>
                                <input class="mx-3 mt-0 text-field w-[200px]" type="text" v-model="redemptionSearchID" autocomplete="off">
                                <button type="submit" :disabled="disabledSearchButton" class="red-btn w-[70px] h-[40px]">
                                    ค้นหา
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div>
                <div v-if="redemption_searched != null" class="py-5">
                    <div class="card-gray p-10 text-base">
                        <div class="grid grid-cols-2">
                            <div>
                                <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    รายละเอียด
                                </h5>
                                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                                    เลขบิล: {{redemption_searched.id}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    เปอร์เซนต์ทอง: {{redemption_searched.gold.percentage}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    ประเภท: {{redemption_searched.gold.gold_type.name}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700" v-if="redemption_searched.gold.weight != null">
                                    น้ำหนัก: {{redemption_searched.gold.weight}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-grv  ay-700" v-else>
                                    น้ำหนัก: {{redemption_searched.gold.custom_weight}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    ลาย: {{redemption_searched.gold.gold_pattern.name}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    ยี่ห้อทอง: {{redemption_searched.gold.brand}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    วันที่รับซื้อ: {{redemption_searched.redemption_date}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    ราคาทองตอนรับซื้อ: {{redemption_searched.gold_redemption_price.buy_price}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    ราคาที่รับซื้อ: {{redemption_searched.redemption_price}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    สถานะตรวจสอบ: {{redemption_searched.check_status}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    พนักงาน: {{redemption_searched.employee.nickname}}
                                </p>

                            </div>

                            <div>
                                <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    ข้อมูลลูกค้า
                                </h5>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    รหัสสมาชิก: {{redemption_searched.user.id}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    ชื่อ: {{redemption_searched.user.first_name}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    นามสกุล: {{redemption_searched.user.last_name}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    เลขบัตรประชาชน: {{redemption_searched.user.id_card_number}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    เบอร์โทร: {{redemption_searched.user.phone}}
                                </p>
                                <p class="mx-1 mb-3 font-normal text-gray-700">
                                    ที่อยู่: {{redemption_searched.user.address}}
                                </p>
                                <div>
                                    <p class="mx-1 mb-3 font-normal text-gray-700">
                                        รูปบัตรประชาชน
                                        <img :src="`${redemption_searched.id_card_image}`" alt="ไม่พบรูปบัตรประชาชน" width="200">
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-if="user.role == 'manager'">
                            <a v-bind:href="'/redemption/edit/'+redemption_searched.id" class="red-btn w-[200px]">
                                แก้ไข
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="">
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
                            <tr v-for="redemption in redemptions_checking" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" @click="setSearched(redemption.id)">
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
                                </td>
                                <td class="px-6 py-4">
                                    {{ redemption.note }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div>
                <div class="rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                            รายการรับซื้อคืนไม่สมบูรณ์
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
                            <tr v-for="redemption in redemptions_failed" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" @click="setSearched(redemption.id)">
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
                                </td>
                                <td class="px-6 py-4">
                                    {{ redemption.note }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
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
            redemption_searched: null,
            redemptions_checking: null,
            redemptions_confirmed: null,
            redemptions_failed: null,
            error: null,
            disabledSearchButton: false,
            redemptionSearchID: null
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
        await this.redemption_store.fetch()
        this.redemptions_checking = this.redemption_store.filterChecking
        this.redemptions_confirmed = this.redemption_store.filterConfirmed
        this.redemptions_failed = this.redemption_store.filterFailed
    },
    methods: {
        async searchID() {
            this.error = null
            this.disabledSearchButton = true
            if (this.redemptionSearchID == null ||
                this.redemptionSearchID == "") {
                this.redemption_searched = null
                this.$router.go(0)
            }
            try {
                this.redemption_searched = await this.redemption_store.getID(this.redemptionSearchID)
                this.redemptions_checking = this.redemption_store.filterChecking
                this.redemptions_confirmed = this.redemption_store.filterConfirmed
                this.redemptions_failed = this.redemption_store.filterFailed
                // console.log(this.redemption_searched)
                this.redemptions_checking = this.redemption_store.filterRedemptionsByID(this.redemptions_checking, this.redemptionSearchID)
                this.redemptions_confirmed = this.redemption_store.filterRedemptionsByID(this.redemptions_confirmed, this.redemptionSearchID)
                this.redemptions_failed = this.redemption_store.filterRedemptionsByID(this.redemptions_failed, this.redemptionSearchID)
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
            }
        },
        async setSearched(redemption_id) {
            this.error = null
            try {
                this.redemption_searched = await this.redemption_store.getID(redemption_id)
                console.log(this.redemption_searched)
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
            }
        }
    }
}
</script>
