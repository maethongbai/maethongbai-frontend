<template>
    <br>
    <br>
    <h1 class="text-3xl">รายการขายหน้าร้าน</h1>
    <br>
    <div>
        <form  @submit.prevent="onsiteSearchID()">
           <div class="inline">
            <label>ID</label>
            <input class="mx-3" type="text" v-model="onsite_SearchID" autocomplete="off">
           </div>

           <button type="submit" class="inline p-1 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
    </div>
    <br>
    <p>รายการขายหน้าร้านที่รอตรวจสอบการโอน</p>
    <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> สถานะโอน </th>
                <th class="border border-green-700"> พนักงาน </th>
                <th class="border border-green-700"> หมายเหตุ </th>
            </tr>
        </thead>
        <tbody class="border border-green-700" v-for="onsiteSale in onsiteSales_checking">
            <tr >
                <td class="border border-green-700">{{onsiteSale.id}}</td>
                <td class="border border-green-700">{{onsiteSale.user.first_name}}</td>
                <td class="border border-green-700">{{onsiteSale.gold.name}}</td>
                <td class="border border-green-700"> {{onsiteSale.transfer_status}}</td>
                <td class="border border-green-700">{{onsiteSale.employee.nickname}}</td>
                <td class="border border-green-700">{{onsiteSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>
    <p>รายการขายหน้าร้านที่ยืนยันการโอน</p>
    <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> สถานะโอน </th>
                <th class="border border-green-700"> พนักงาน </th>
                <th class="border border-green-700"> หมายเหตุ </th>
            </tr>
        </thead>
        <tbody class="border border-green-700" v-for="onsiteSale in onsiteSales_confirm">
            <tr >
                <td class="border border-green-700">{{onsiteSale.id}}</td>
                <td class="border border-green-700">{{onsiteSale.user.first_name}}</td>
                <td class="border border-green-700">{{onsiteSale.gold.name}}</td>
                <td class="border border-green-700"> {{onsiteSale.transfer_status}}</td>
                <td class="border border-green-700">{{onsiteSale.employee.nickname}}</td>
                <td class="border border-green-700">{{onsiteSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>
    <p>รายการขายหน้าร้านที่การโอนมีปัญหา</p>
    <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> สถานะโอน </th>
                <th class="border border-green-700"> พนักงาน </th>
                <th class="border border-green-700"> หมายเหตุ </th>
            </tr>
        </thead>
        <tbody class="border border-green-700" v-for="onsiteSale in onsiteSales_problem">
            <tr >
                <td class="border border-green-700">{{onsiteSale.id}}</td>
                <td class="border border-green-700">{{onsiteSale.user.first_name}}</td>
                <td class="border border-green-700">{{onsiteSale.gold.name}}</td>
                <td class="border border-green-700"> {{onsiteSale.transfer_status}}</td>
                <td class="border border-green-700">{{onsiteSale.employee.nickname}}</td>
                <td class="border border-green-700">{{onsiteSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
    <br>
    <h1 class="text-3xl">รายการขายออนไลน์</h1>
    <br>
    <div>
        <form @submit.prevent="onlineSearchID()">
           <div class="inline">
            <label>ID</label>
            <input class="mx-3" type="text" v-model="online_SearchID" autocomplete="off">
           </div>

           <button type="submit" class="inline p-1 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
    </div>
    <br>
    <p>รายการขายออนไลน์ส่งมอบให้ลูกค้าไม่สำเร็จ</p>
    <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> สถานะคำสั่งซื้อ </th>
                <th class="border border-green-700"> สถานะสินค้า </th>
                <th class="border border-green-700"> พนักงาน </th>
                <th class="border border-green-700"> หมายเหตุ </th>
            </tr>
        </thead>
        <tbody class="border border-green-700" v-for="onlineSale in onlineSales_not_delivery">
            <tr >
                <td class="border border-green-700">{{onlineSale.id}}</td>
                <td class="border border-green-700">{{onlineSale.user.first_name}}</td>
                <td class="border border-green-700">{{onlineSale.gold.name}}</td>
                <td class="border border-green-700">{{onlineSale.transfer_status}}</td>
                <td class="border border-green-700">{{onlineSale.delivery_status}}</td>
                <td class="border border-green-700" v-if="onlineSale.tracking_id_employee != null">{{onlineSale.tracking_id_employee.nickname}}</td>
                <td class="border border-green-700" v-else>-</td>
                <td class="border border-green-700">{{onlineSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>
    <p>รายการขายออนไลน์มอบให้ลูกค้าสำเร็จ</p>
    <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> สถานะคำสั่งซื้อ </th>
                <th class="border border-green-700"> พนักงาน </th>
                <th class="border border-green-700"> หมายเหตุ </th>
            </tr>
        </thead>
        <tbody class="border border-green-700" v-for="onlineSale in onlineSales_delivery">
            <tr >
                <td class="border border-green-700">{{onlineSale.id}}</td>
                <td class="border border-green-700">{{onlineSale.user.first_name}}</td>
                <td class="border border-green-700">{{onlineSale.gold.name}}</td>
                <td class="border border-green-700">{{onlineSale.transfer_status}}</td>
                <td class="border border-green-700" v-if="onlineSale.tracking_id_employee != null">{{onlineSale.tracking_id_employee.nickname}}</td>
                <td class="border border-green-700" v-else>-</td>
                <td class="border border-green-700">{{onlineSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useOnsiteSaleStore
} from '@/stores/onsiteSale.js'
import {
    useOnlineSaleStore
} from '@/stores/onlineSale.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const onsiteSale_store = useOnsiteSaleStore()
        const onlineSale_store = useOnlineSaleStore()
        return {
            auth_store,
            onsiteSale_store,
            onlineSale_store
        }
    },
    data () {
        return {
            auth: null,
            user: null,
            onsiteSales: null,
            onlineSales: null,
            onsiteSale_search: null,
            onsiteSales_checking: null,
            onsiteSales_problem: null,
            onsiteSales_confirm: null,
            onlineSale_search: null,
            onlineSales_delivery: null,
            onlineSales_not_delivery: null,
            tracking_employee: null,
            error: null,
            disabledSearchButton: false,
            onsite_SearchID: null,
            online_SearchID: null
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
                console.log("authorized "+document.URL);
            } else {
                this.$router.push("/");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.onsiteSale_store.fetch()
        this.onsiteSales = this.onsiteSale_store.getOnsiteSales
        this.onsiteSales_checking = this.onsiteSale_store.filterChecking
        this.onsiteSales_problem = this.onsiteSale_store.filterProbleum
        this.onsiteSales_confirm = this.onsiteSale_store.filterConfirm
        await this.onlineSale_store.fetch()
        this.onlineSales = this.onlineSale_store.getOnlineSales
        this.onlineSales_delivery = this.onlineSale_store.filterDelivery
        this.onlineSales_not_delivery = this.onlineSale_store.filterNotDelivery

    },
    methods: {
        async onsiteSearchID() {
            console.log("opallers")
            this.error = null
            this.disabledSearchButton = true
            if (this.onsite_SearchID == null ||
                this.onsite_SearchID == "") {
                    this.onsiteSale_search = null
                    this.$router.go(0)
            }
            try {
                console.log("opaller")
                this.onsiteSale_search = await this.onsiteSale_store.getID(this.onsite_SearchID)
                console.log("opaller")
                this.onsiteSales_checking = this.onsiteSale_store.filterChecking
                console.log("opaller")
                this.onsiteSales_problem = this.onsiteSale_store.filterProblem
                this.onsiteSales_confirm = this.onsiteSale_store.filterConfirm
                this.onsiteSales_checking = this.onsiteSale_store.filterOnsiteByID(this.onsiteSales_checking, this.onsite_SearchID)
                this.onsiteSales_problem = this.onsiteSale_store.filterOnsiteByID(this.onsiteSales_problem, this.onsite_SearchID)
                this.onsiteSales_confirm = this.onsiteSale_store.filterOnsiteByID(this.onsiteSales_confirm, this.onsite_SearchID)
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
               
            }
        },
        async onlineSearchID() {
            console.log("opallers")
            this.error = null
            this.disabledSearchButton = true
            if (this.online_SearchID == null ||
                this.online_SearchID == "") {
                    this.onlineSale_search = null
                    this.$router.go(0)
            }
            try {
                console.log("opaller_line")
                this.onlineSale_search = await this.onlineSale_store.getID(this.online_SearchID)
                console.log("opaller_line2")
                this.onlineSales_delivery = this.onlineSale_store.filterDelivery
                this.onlineSales_not_delivery = this.onlineSale_store.filterNotDelivery
                this.onlineSales_delivery = this.onlineSale_store.filterOnlineByID(this.onlineSales_delivery, this.online_SearchID)
                this.onlineSales_not_delivery = this.onlineSale_store.filterOnlineByID(this.onlineSales_not_delivery, this.online_SearchID)
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
               
            }
        }
    }
}
</script>

<style>
</style>
