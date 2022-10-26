<template>

    <div v-if='auth_user != null'>

        <div class="block my-5">
            <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
        </div>

        <div class="block mx-3 my-5">
            <h1 class="text-xl font-semibold">รายการสินค้ที่สั่งซื้อ</h1>
        </div>
        
    </div>

</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        return {
            auth_store
        }
    },
    data() {
        return {
            auth: null,
            auth_user: null
        }
    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                this.auth = this.auth_store.getAuth
                this.auth_user = JSON.parse(this.auth_store.getUser)
            }
        }
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.auth_user = JSON.parse(this.auth_store.getUser)
            console.log("authorized " + document.URL);
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }

    }
}
</script>
