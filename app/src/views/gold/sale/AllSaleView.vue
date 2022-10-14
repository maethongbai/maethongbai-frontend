<template>
    <p>รายการขายหน้าร้าน</p>
    <div class="text-black-500" v-for="onsiteSale in onsiteSales">
        {{onsiteSale.id}}
        {{onsiteSale.user.first_name}}
        {{onsiteSale.gold.name}}
        {{onsiteSale.transfer_status}}
        {{onsiteSale.employee.nickname}}
    </div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useOnsiteSaleStore
} from '@/stores/onsiteSale.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const onsiteSale_store = useOnsiteSaleStore()
        return {
            auth_store,
            onsiteSale_store
        }
    },
    data () {
        return {
            auth: null,
            user: null,
            onsiteSales: null,
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
        console.log(this.onsiteSale_store.getOnsiteSales)
    },
}
</script>

<style>
</style>
