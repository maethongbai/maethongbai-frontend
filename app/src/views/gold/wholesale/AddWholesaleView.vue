<template>
    <div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    <form @submit.prevent="createWholesale()">
    <div class="mx-3 my-3">
        <label for="nextID" class="mx-3">รหัสร้านขายส่ง: {{ wholesale.id }}</label>
    </div>
    <div class="my-3">
        <label for="wholesale.name" class="mx-3">ชื่อร้านขายส่ง</label>
        <input class="mx-3" type="text" v-model="wholesale.name">
    </div>
    <div class="my-3">
        <label for="wholesale.phone" class="mx-3">เบอร์โทรศัพท์ติดต่อ</label>
        <input class="mx-3" type="text" v-model="wholesale.phone">
    </div>
    <div class="my-3">
        <label for="wholesale.address" class="mx-3">ที่อยู่ร้านขายส่ง</label>
        <input class="mx-3" type="text" v-model="wholesale.address">
    </div>
    <button type="submit" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
    บันทึกรายการ
    </button>
    </form>
    </div>

</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useWholesaleStore } from '@/stores/wholesale.js';

export default {
    setup() {
        const auth_store = useAuthStore()
        const wholesale_store = useWholesaleStore()

        return {
            auth_store, wholesale_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            wholesale: {
                id: -1,
                name: null,
                phone: null,
                address: null
            },
            disabledButton: false
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

        await this.wholesale_store.fetch()
        this.wholesale.id = this.wholesale_store.getNextID()
    },
    methods: {
        async createWholesale() {
            try {
                var wholesale = {
                    name: this.wholesale.name,
                    phone: this.wholesale.phone,
                    address: this.wholesale.address
                }
                await this.wholesale_store.add(wholesale)
            }catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }
}

</script>