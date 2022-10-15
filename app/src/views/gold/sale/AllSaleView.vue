<template>
    <p>รายการขายหน้าร้าน</p>
    <div class="text-black-500" v-for="onsiteSale in onsiteSales">
        {{onsiteSale.id}}
        {{onsiteSale.user.first_name}}
        {{onsiteSale.gold.name}}
        {{onsiteSale.transfer_status}}
        {{onsiteSale.employee.nickname}}
        {{onsiteSale.transfer_note}}
    </div>
    <table  class="border-separate w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class=" text-xs text-green-700 uppercase bg-green-50 ">
                <th>ลำดับ</th>
                <th>ชื่อลูกค้า</th>
                <th>ชื่อสินค้า</th>
                <th>สถานะโอน</th>
                <th>พนักงาน</th>
                <th>หมายเหตุ</th>
            </tr>
        </thead>
        <tbody class="border-separate border border-green-700" v-for="onsiteSale in onsiteSales">
            <tr >
                <td>{{onsiteSale.id}}</td>
                <td>{{onsiteSale.user.first_name}}</td>
                <td>{{onsiteSale.gold.name}}</td>
                <td> {{onsiteSale.transfer_status}}</td>
                <td>{{onsiteSale.employee.nickname}}</td>
                <td>{{onsiteSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>
    <div class="text-black-500" v-for="onlineSale in onlineSales">
        {{onlineSale.id}}
        {{onlineSale.user.first_name}}
        {{onlineSale.gold.name}}
        {{onlineSales.tracking_id_employee}}
        <p  v-for="index in onlineSales.tracking_id_employee">
            opsl
            {{index}}
        </p>
        {{onlineSale.transfer_note}}
    </div>
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
            tracking_employee: null,
            error: null,
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
        await this.onlineSale_store.fetch()
        this.onlineSales = this.onlineSale_store.getOnlineSales
        this.tracking_employee = this.onlineSale_store.getTrackingEmployee

    },
}
</script>

<style>
</style>
