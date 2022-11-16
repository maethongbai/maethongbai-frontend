<template>
    <div class="block my-5">
        <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <h5 class="mx-6 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียดพนักงาน
            </h5>
    <div v-if="selected != null" class="py-5">
        <div class="mx-3 p-5 bg-white border border-gray-200 rounded-lg shadow-md grid grid-cols-2">
            <div class="mx-5">
                <p class="mx-1 mb-3 font-normal text-gray-700 ">รหัสพนักงาน: {{ selected.employee.id }}</p>
                <div class="grid grid-cols-3">
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">ชื่อ: {{ selected.first_name }}</p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">นามสกุล: {{ selected.last_name }}</p>
                    <p class="mx-1 mb-3 font-normal text-gray-700 ">ชื่อเล่น: {{ selected.employee.nickname }}</p>
                </div>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">เบอร์โทรศัพท์: {{ selected.phone }}</p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">อีเมล: {{ selected.email }}</p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">วันเกิด: {{ selected.employee.birth_date }}</p>
            </div>
            <div>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">ตำแหน่ง: {{ selected.role }}</p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">วันที่เริ่มทำงาน: {{ selected.employee.work_start_date }}</p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">เงินเดือน: {{ selected.employee.salary.toLocaleString() }} บาท</p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">วันที่แก้ไขล่าสุด: {{ selected.employee.updated_at }}</p>
                <a v-bind:href="'/employee/view/edit/'+ selected.id " class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    แก้ไข
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
                รายชื่อพนักงานทั้งหมดในร้าน
                <router-link to="/employee/view/create" class="mx-5 px-5 py-2 bg-blue-200 rounded-xl">เพิ่มพนักงานใหม่</router-link>
            </caption>
            
            
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <!-- <th scope="col" class="px-6 py-3">
                        ลำดับ
                    </th> -->
                    <th scope="col" class="px-6 py-3">
                        รหัสพนักงาน
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        นามสกุล
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อเล่น
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
                        {{ user.employee.id }}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.first_name }}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.last_name }}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.employee.nickname }}
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
            users: [],
            selected: null,
            error: null,
            user: null
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
        this.users = this.user_store.filterEmployee
        this.users.forEach((user) => console.log(user))
        
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
            
        }
      }
    }
</script>