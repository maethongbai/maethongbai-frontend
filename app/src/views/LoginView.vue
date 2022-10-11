<template>
    <div class="m-8">
      <h1 class="text-3xl">Login</h1>
    
      <div v-if="error">
        {{ error }}
      </div>
  
      <form @submit.prevent="onFormSubmit()">
        <div>
          <label>Phone</label>
          <input type="phone" v-model="phone" required autocomplete="off">
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
        disabledButton: false
      }
    },
    methods: {
      async onFormSubmit() {
        this.error = null
        this.disabledButton = true
        try {
          if (await this.auth_store.login(this.phone, this.password)) {
            this.$router.push('/')
          } else {
            this.disabledButton = false
          }
        } catch (error) {
          this.error = error.message
          this.disabledButton = false
        }
      }
    },
  }
  </script>