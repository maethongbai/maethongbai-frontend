<template>

</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useUserStore
} from '@/stores/user.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        
        return {
            auth_store,
            user_store,
            
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null
        }
    }
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
    },
    // methods: {
    //     findUser(tel)

    // }
}
</script>

<style>
</style>