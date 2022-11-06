<template>
    <div class="grid h-screen flex items-center justify-center w-full md:w-full mx-auto md:mx-0">
      <div class="max-w-md bg-white p-10 flex flex-col items-center justify-center w-full shadow-xl rounded-xl">
        <h2 class=" text-2xl font-bold text-gray-800 text-left mb-5">
          เข้าสู่ระบบ
        </h2>

        <form @submit.prevent="onFormSubmit()" class="w-full">
          <div id="input" class="flex flex-col w-full my-5">
            <label for="username" class="text-gray-500 mb-2"
              >เบอร์โทรศัพท์</label
            >
            <input
              type="text" v-model="phone" required autocomplete="off"
              placeholder="โปรดกรอกเบอร์โทรศัพท์"
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="password" class="text-gray-500 mb-2"
              >รหัสผ่าน</label
            >
            <input
              type="password" v-model="password" required
              placeholder="โปรดกรอกรหัสผ่าน"
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
            />
          </div>

          <div id="button" class="flex flex-col w-full my-5">
            <button
              type="submit" :disabled="disabledButton"
              class="w-full py-4 bg-[#9B0000] rounded-lg text-white"
            >
              <div class="flex flex-row items-center justify-center">
                <div class="mr-2">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </div>
                <div class="font-bold">เข้าสู่ระบบ</div>
              </div>
            </button>
            <div class="flex justify-evenly mt-5 ">
              <a
                href="/register"
                class="w-full text-center underline font-medium text-gray-500"
                >สร้างบัญชีใหม่</a
              >
            </div>
          </div>
        </form>
      </div>
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