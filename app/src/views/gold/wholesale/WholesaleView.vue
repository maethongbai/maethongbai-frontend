<template>
<div v-if='user.role == "manager"'>
    <div class="pt-8 pb-8 flex items-center justify-center">
        <div class="card-white w-[1200px] text-s1">
            <div class="m-4 mb-0">
                <!-- breadcrumb -->
                <b>หน้าหลักระบบหลังร้าน > ร้านขายส่งทั้งหมด</b>
                <div class="flex flex-row mt-5">
                    <div class="flex flex-row mr-auto">
                        <form @submit.prevent="searchID()">
                            <div class="flex flex-row">
                                <p class="p-2">รหัสร้านขายส่ง</p>
                                <input class="mx-3 mt-0 text-field w-[200px]" type="text" v-model="wholesaleSearchID" autocomplete="off">
                                <button type="submit" class="red-btn w-[70px] h-[40px]">
                                    ค้นหา
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="ml-auto red-btn w-[150px]">
                        <a v-bind:href="'/wholesale/create'">
                            เพิ่มร้าน +
                        </a>
                    </div>
                </div>

            </div>

            <div class="card-gray w-[1044px] mt-4">
                <table class="w-full text-sm w-[1014px]">
                    <thead class="table-head text-left text-base">
                        <tr>
                            <th scope="col" class="p-2 w-[200px] text-center">
                                    รหัสร้าน
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    ชื่อร้าน
                                </th>
                                <th scope="col" class="text-left">
                                    เบอร์โทร
                                </th>
                                <th scope="col" class="text-left">
                                    ที่อยู่
                                </th>
                                <th scope="col" class="px-6 py-3 ml-auto w-[200px]">
                                    แก้ไข
                                </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="wholesale in wholesales" class="table-card" @click="setSearched(wholesale)">
                            <th scope="row" class="text-center">
                                {{ wholesale.id }}
                            </th>
                            <td class="pl-5 w-[220px]">
                                {{ wholesale.name }}
                            </td>
                            <td>
                                {{ wholesale.phone }}
                            </td>
                            <td>
                                {{ wholesale.address }}
                            </td>
                            <td class="px-6 py-4">
                                <a v-bind:href="'/wholesale/edit/'+ wholesale.id" >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
