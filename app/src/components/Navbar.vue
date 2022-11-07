<template>
    <nav>
    <div class="bg-gradient-to-b from-[#D61111] via-[#9B0000] to-[#4E0000] w-full h-[120px] items-center justify-center flex flex-col">
        <div class="flex flex-row mx-auto w-[1200px]">
            <div class="mt-0">
                <div class="">
                    <img alt="Maethongbai LOGO" class="logo" src="@/assets/LOGO.png" width="175" height="61.4" />
                </div>
            </div>
            <div class="w-[700px]">
                <div class="ml-2">
                    <form class="flex items-center min-w-[50%]">   
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <input type="text" id="simple-search" class="text-field" placeholder="ค้นหา" required>
                        </div>
                        <button type="submit" class="p-2.5 ml-2 mt-1 text-white bg-[#FFD12F] rounded-lg hover:bg-[#FFC700] focus:ring-4 focus:outline-none">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </form>
                    <div v-if="user != null">
                        <div v-if='user.role == "employee" ||
                        user.role == "account" ||
                        user.role == "manager"' class="text-white mt-4 flex flex-row gap-5">
                        <RouterLink class="hover:underline" to="/">หน้าหลัก</RouterLink>
                        <RouterLink class="hover:underline" to="/onsitesale/create">ขายทอง</RouterLink>
                        <RouterLink class="hover:underline" to="/redemption/create">รับซื้อทอง</RouterLink>
                        <RouterLink class="hover:underline" to="/custom_order/create">สร้างงานสั่งทอง</RouterLink>
                        <RouterLink class="hover:underline" to="/stock/create">เพิ่มทองลงสต็อก</RouterLink>
                        <RouterLink class="hover:underline" to="/stock/view">สถานะทองที่เพิ่ม</RouterLink>
                        </div>

                        <div v-else class="text-white mt-4 flex flex-row gap-5">
                            <RouterLink class="hover:underline" to="/">หน้าหลัก</RouterLink>
                            <RouterLink class="hover:underline" to="/shopping/all">สินค้าทั้งหมด</RouterLink>
                            <RouterLink class="hover:underline" to="/user/sale_status">ติดตามสถานะการสั่งซื้อ</RouterLink>
                                                                    <!-- ใส่ไอดีคนที่ล็อกอิน -->
                            <RouterLink class="hover:underline" :to="'/user/' + user.id + '/history'">ประวัติการใช้บริการ</RouterLink>
                        </div>
                    </div>
                    <div v-else class="text-white mt-4 flex flex-row gap-5">
                            <RouterLink class="hover:underline" to="/">หน้าหลัก</RouterLink>
                            <RouterLink class="hover:underline" to="/shopping/all">สินค้าทั้งหมด</RouterLink>
                                                                    <!-- ใส่ไอดีคนที่ล็อกอิน -->
                    </div>
                </div>
            </div>
                <div class="text-white pt-2 ml-auto text-right">
                    <div v-if="auth && auth.phone">
                        สวัสดีคุณ {{ user.first_name }} | 
                        <router-link to="/logout">ออกจากระบบ</router-link>
                    </div>
                    <div v-else>
                        <router-link to="/login"><u>เข้าสู่ระบบ</u></router-link>
                    </div>
                    <div v-if="user != null">
                        <div v-if='user.role == "employee" ||
                        user.role == "account" ||
                        user.role == "manager"' class="pt-7">
                        <router-link to="/manage_home" class="hover:underline">
                            หน้าหลักระบบหลังร้าน
                        </router-link>
                    </div>
                    </div>
                </div>
        </div>
    </div>
    </nav>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import { useUserStore } from '@/stores/user.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        return {
            auth_store, user_store
        }
    },
    data() {
        return {
            auth: null,
            user: null
        }
    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                // console.log(newValue.getAuth)
                this.auth = this.auth_store.getAuth
                this.user = JSON.parse(this.auth_store.getUser)
            }
        }
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "manager" || this.user.role == "account" || this.user.role == "employee" || this.user.role == "user") {
                console.log("authorized " + document.URL);
            } else {
                // this.$router.push("/"); 
            }
        }
        else{
            // this.$router.push("/");
        }

    }
}
</script>