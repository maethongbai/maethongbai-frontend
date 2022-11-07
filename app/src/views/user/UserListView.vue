<template>
    <div class="block my-5">
        <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <div class="center">
        <form @submit.prevent="searchID()">
            <div class="inline">
                <label>เบอร์โทรศัพท์</label>
                <input class="mx-3" type="text" v-model="search_id" autocomplete="off">
            </div>

            <button type="submit" :disabled="disabledSearchButton" class="inline p-2 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
    </div>
    <h5 class="mx-6 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียดผู้ใช้
            </h5>
    <div v-if="selected != null" class="py-5">
        <div class="mx-3 p-5 bg-white border border-gray-200 rounded-lg shadow-md grid grid-cols-2">
            <div class="mx-5">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">รหัสผู้ใช้: {{ selected.id }}</p>
                <div class="grid grid-cols-3">
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">ชื่อ: {{ selected.first_name }}</p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">นามสกุล: {{ selected.last_name }}</p>
                </div>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">เบอร์โทรศัพท์: {{ selected.phone }}</p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">อีเมล: {{ selected.email }}</p>
            </div>
            <div>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">ตำแหน่ง: {{ selected.role }}</p>
                <a v-bind:href="'/user/'+ selected.id + '/edit'" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    แก้ไข
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
                <a v-bind:href="'/user/'+ selected.id + '/history'" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    ดูประวัติ
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="mx-3 p-5 bg-white border border-gray-200 rounded-lg shadow-md grid grid-cols-2">
            <p>ยังไม่ได้เลือก</p>
        </div>
    </div>

    <div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                รายชื่อผู้ใช้ทั้งหมด
                <router-link to="/register" class="mx-5 px-5 py-2 bg-blue-200 rounded-xl">เพิ่มผู้ใช้ใหม่</router-link>
            </caption>
            
            
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <!-- <th scope="col" class="px-6 py-3">
                        ลำดับ
                    </th> -->
                    <th scope="col" class="px-6 py-3">
                        รหัสผู้ใช้
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        นามสกุล
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ตำแหน่ง
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" 
                    :key="user.id"
                    @click="setSelected(user.id)">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.id }}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.first_name }}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.last_name }}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.role }}
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
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
            selected: null,
            error: null,

            disabledSearchButton: false,
            searched_user: null,

            search_id: null
        }
      },
      async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "manager") {
                console.log("authorized " + document.URL);
            } else {
                this.$router.push("/");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        
        await this.user_store.fetch()
        this.users = this.user_store.getUsers
        
      },
      methods: {
        async setSelected(id) {
            this.error = null
            try {
                this.selected = await this.user_store.findById(id)
                console.table(this.selected)
            } catch (error) {
                console.log(error.message)
            }
            
        },
        searchID() {
            const id = this.search_id
            this.selected = this.users.find((user) => user.phone == id)
        }
      }
    }
</script>