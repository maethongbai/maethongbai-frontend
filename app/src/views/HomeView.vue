<template>
<main>
    <div class="flex flex-col mb-10">
        <div>
            <h1 class="text-xl m-5">สร้างคำสั่งซื้อ</h1>
            <div>
                <router-link to="/onsitesale/create" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
                    ขายทอง
                </router-link>
                <router-link to="/redemption/create" class="px-5 py-2 my-4 bg-gray-200 rounded-xl">
                    รับซื้อทอง
                </router-link>
                <router-link to="/custom_order/create" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
                    สร้างงานสั่งทอง
                </router-link>
            </div>

            <h1 class="text-xl m-5">ประวัติคำสั่งซื้อ</h1>
            <div>
                <RouterLink to="/redemption/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">รายการซื้อ</RouterLink>
                <RouterLink to="/sale/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">รายการขาย</RouterLink>
                <RouterLink to="/custom_order/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">งานสั่ง</RouterLink>
            </div>

            <h1 class="text-xl m-5">สต็อก</h1>
            <div>
                <RouterLink to="/allstock/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
                    สต็อกทอง
                </RouterLink>
                <router-link to="/stock/create" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
                    เพิ่มทองลงสต็อก
                </router-link>
                <RouterLink to="/stock/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
                    รายการสินค้าที่ถูกเพิ่มลงสต็อก
                </RouterLink>
            </div>

            <h1 class="text-xl m-5">การเงิน</h1>
            <div>
                <div>
                    <RouterLink to="/income/create" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">เพิ่มรายการรับเงิน</RouterLink>
                    <RouterLink to="/withdrawal/create" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">เพิ่มรายการเบิกเงิน</RouterLink>
                </div>
                <div class="mt-5">
                    <RouterLink to="/income/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">รายการเงินเข้า</RouterLink>
                    <RouterLink to="/withdrawal/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">รายการเงินออก</RouterLink>
                </div>
            </div>

            <h1 class="text-xl m-5">สรุปการขาย</h1>
            <div>
                <router-link to="/total_sale" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
                    สรุปทองที่ขายทั้งหมด
                </router-link>
                <router-link to="/total" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
                    หน้าสรุปรายรับ-รายจ่าย
                </router-link>
            </div>


            <h1 class="text-xl m-5">จัดการข้อมูล</h1>
            <div>
                <div>
                    <RouterLink to="/gold_type/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">ประเภททองทั้งหมด</RouterLink>
                    <RouterLink to="/gold_pattern/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">ลายทองทั้งหมด</RouterLink>
                </div>

                <div class="mt-5">
                    <RouterLink to="/wholesale/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">ร้านขายส่งทั้งหมด</RouterLink>
                    <RouterLink to="/custom_order_worker/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">ช่างงานสั่งทั้งหมด</RouterLink>
                </div>

                <div class="mt-5">
                    <router-link to="/employee/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
                        ดูรายชื่อพนักงานทั้งหมด
                    </router-link>
                </div>
            </div>
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
                console.log("in")
                this.auth = this.auth_store.getAuth
                this.user = JSON.parse(this.auth_store.getUser)
            }
        }
      },
      async mounted() {
        console.log("inn")
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

