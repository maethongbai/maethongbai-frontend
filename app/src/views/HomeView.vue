<template>
<main>
    <div class="place-content-center">
        <div class="h-screen flex items-center justify-center">
            <card class="flex flex-col rounded-lg shadow-lg w-7/12 p-10 bg-white">
                <router-link v-if="this.user.role == 'manager' || this.user.role == 'account' || this.user.role == 'employee'" to="/manage_home" class="px-5 py-2 mx-4 my-4 bg-yellow-200 rounded-xl">
                    จัดการหน้าร้าน
                </router-link>
            </card>
        </div>
    </div>
</main>
</template>

<script>
    import { useUserStore } from '@/stores/user.js'
    import { useAuthStore } from '@/stores/auth.js'
    export default {
      setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        return { user_store, auth_store }
      },
      data() {
        return {
            auth: null,
            users: null,
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
            if (this.user.role == "manager" || this.user.role == "account" || this.user.role == "employee" ) {
                console.log("authorized " + document.URL);
            } else {
                this.$router.push("/");
            }
        }
        else{
            this.$router.push("/login");
        }
      },
  }
</script>

