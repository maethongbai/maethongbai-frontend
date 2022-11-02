<template>
<div v-if='user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <div class="inline">
        <div class="text-3xl">ร้านขายส่งทั้งหมด</div>
        <form @submit.prevent="searchID()">
            <div class="inline">
                <label>ID</label>
                <input class="mx-3" type="text" v-model="wholesaleSearchID" autocomplete="off">
            </div>

            <button type="submit" class="inline p-2 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
    </div>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-blue-100 dark:text-blue-100">
            <thead class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        รหัสร้านขายส่ง
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อร้านขายส่ง
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="wholesale in wholesales" class="bg-yellow-700 border-b border-blue-400 hover:bg-yellow-500" @click="setSearched(wholesale)">
                    <th scope="row" class="py-4 px-6 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                        {{ wholesale.id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ wholesale.name }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="wholesale_searched != null" class="py-5">
            <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
                <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    รายละเอียด
                </h5>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    รหัสร้ายขายส่ง: {{wholesale_searched.id}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ชื่อช่าง: {{wholesale_searched.name}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    เบอร์โทรศัพท์: {{ wholesale_searched.phone }}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ที่อยู่ร้านขายส่ง: {{ wholesale_searched.address }}
                </p>
                <div v-if="user.role == 'manager'" class="py-3">
                    <a v-bind:href="'/wholesale/edit/'+wholesale_searched.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        แก้ไข
                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </div>
            </div>

        </div>
        <a v-bind:href="'/wholesale/create'" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            เพิ่ม
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </a>
    </div>
</div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useWholesaleStore
} from '@/stores/wholesale.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const wholesale_store = useWholesaleStore()
        return {
            auth_store,
            wholesale_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            wholesales: null,
            temp_wholesales: null,
            wholesaleSearchID: null,
            wholesale_searched: null,
            error: null
        }
    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                // console.log(newValue.getAuth)
                this.auth = newValue.getAuth
                this.user = JSON.parse(newValue.getUser)
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
                console.log("authorized");
            } else {
                this.$router.push("/")
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }

        await this.wholesale_store.fetch()
        this.wholesales = this.wholesale_store.getWholesales

    },
    methods: {
        async searchID() {
            this.error = null
            if (this.wholesaleSearchID == null || this.wholesaleSearchID == "") {
                this.wholesale_searched = null
                this.$router.go(0)
            }
            try {
                this.wholesale_searched = await this.wholesale_store.getWholesaleID(this.wholesaleSearchID)
                this.temp_wholesales = this.wholesale_store.getWholesales
                this.wholesales = this.wholesale_store.filterWholesaleByID(this.temp_wholesales, this.wholesaleSearchID)
            } catch (error) {
                this.error = error.message
            }
        },
        setSearched(wholesale) {
            this.wholesale_searched = wholesale
        }

    }
}
</script>
