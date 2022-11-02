<template>
    <div class="m-8">
      <h1 class="text-3xl">Login</h1>
    
      <div v-if="error">
        {{ error }}
      </div>
  
      <form @submit.prevent="onFormSubmit()">
        <div>
          <label>Phone</label>
          <input type="text" v-model="phone" required autocomplete="off">
        </div>
  
        <div>
          <label>Password</label>
          <input type="password" v-model="password" required>
        </div>
      
        <button type="submit" :disabled="disabledButton"
          class="p-2 bg-green-400 border rounded-lg"
          >
          Login
        </button>
      </form>
    </div>

    <div>
      <router-link to="/register">
        <button type="submit" :disabled="disabledButton"
          class="p-2 bg-blue-400 border rounded-lg">
          สร้างบัญชีใหม่
        </button>
      </router-link>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '@/stores/auth.js'
  
  export default {
    setup() {
      const auth_store = useAuthStore()
      return { auth_store }
    },
    data() {
      return {
        phone : '',
        password: '',
        error: null,
        disabledButton: false,
        auth: null,
        user: null
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
        },
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
                this.$router.push("/");
        }
      },
    methods: {
      async onFormSubmit() {
        this.error = null
        
        this.disabledButton = true
        try {
          if (await this.auth_store.login(this.phone, this.password)) {
            // if (this.auth_store.isAuthen) {
            //   // this.$router.push('/')
            // }
            this.$router.push('/')
            
          } else {
            this.disabledButton = false
          }
          
        } catch (error) {
          // this.error = error.message
          console.error(error.response.data)
          this.disabledButton = false
        }
      }
    },
  }
</script>