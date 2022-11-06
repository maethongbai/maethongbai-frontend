<template>
    <main>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px]">
                <div class="flex flex-row">
                    <div>
                        <img alt="Maethongbai LOGO" src="@/assets/LOGO-grey.png" width="228" height="84" />
                        <p class="text-s1 text-3xl mt-5">ระบบจัดการหลังร้านแม่ทองใบ คลาคสิก เดอะมอลล์บางแค</p>
                    </div>

                    <div class="ml-auto">
                        <div class="card-gray w-[228px]  mr-auto">
                            <p class="mb-3">รหัสพนักงาน: {{ this.user.id }} </p>
                            <p class="mb-3">ชื่อ: {{ this.user.first_name}}</p>
                            <p>ตำแน่ง: {{ this.user.role}}</p>
                        </div>
                    </div>
                </div>

                <hr class="mt-10 mb-10 border">
                
                <div class="grid grid-cols-2 gap-2">

                    <div>
                        <p class="label-card">บริการหน้าร้าน</p>
                        <div class="card-gray w-[510px] h-[210px] p-7">
                            <div class="grid grid-cols-2 gap-5">
                                <router-link to="/onsitesale/create" class="red-btn h-[40px]">
                                    ขายทอง
                                </router-link>
                                <router-link to="/redemption/create" class="red-btn h-[40px]">
                                    รับซื้อทอง
                                </router-link>
                                <router-link to="/custom_order/create" class="red-btn h-[40px]">
                                    สร้างงานสั่งทอง
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p class="label-card"> ประวัติ</p>
                        <div class="card-gray w-[510px] h-[210px] p-7">
                            <div class="grid grid-cols-2 gap-5">
                                <RouterLink to="/sale/view" class="red-btn h-[40px]">
                                    รายการขาย
                                </RouterLink>
                                <RouterLink to="/redemption/view" class="red-btn h-[40px]">
                                    รายการรับซื้อ
                                </RouterLink>  
                                <RouterLink to="/custom_order/view" class="red-btn h-[40px]">
                                    รายการงานสั่ง
                                </RouterLink>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p class="label-card">สต็อก</p>
                        <div class="card-gray w-[510px] h-[210px] p-7">
                            <div class="grid grid-cols-2 gap-5">
                                <RouterLink v-if="this.user.role == 'manager' || this.user.role == 'account'" to="/allstock/view" class="red-btn h-[40px]">
                                    สต็อกทอง
                                </RouterLink>
                                <router-link to="/stock/create" class="red-btn h-[40px]">
                                    เพิ่มทองลงสต็อก
                                </router-link>
                                <RouterLink to="/stock/view" class="red-btn h-[40px]">
                                    สถานะทองที่เพิ่มลงสต็อก
                                </RouterLink>
                            </div>
                        </div>
                    </div>

                    <div v-if="this.user.role == 'manager' || this.user.role == 'account'">
                        <p class="label-card">การเงิน</p>
                        <div class="card-gray w-[510px] h-[210px] p-7">
                            <div class="grid grid-cols-2 gap-5">
                                <RouterLink to="/income/create" class="red-btn h-[40px]">
                                    เพิ่มรายการรับเงิน
                                </RouterLink>
                                <RouterLink to="/withdrawal/create" class="red-btn h-[40px]">
                                    เพิ่มรายการเบิกเงิน
                                </RouterLink>
                                <RouterLink to="/income/view" class="red-btn h-[40px]">
                                    รายการเงินเข้า
                                </RouterLink>
                                <RouterLink to="/withdrawal/view" class="red-btn h-[40px]">
                                    รายการเงินออก
                                </RouterLink>

                            </div>
                        </div>
                    </div>

                    <div v-if="this.user.role == 'manager' || this.user.role == 'account'">
                        <p class="label-card">สรุปการขาย</p>
                        <div class="card-gray w-[510px] h-[210px] p-7">
                            <div class="grid grid-cols-2 gap-5">
                                <router-link to="/total_sale" class="red-btn h-[40px]">
                                    สรุปทองที่ขายทั้งหมด
                                </router-link>
                                <router-link to="/total" class="red-btn h-[40px]">
                                    หน้าสรุปรายรับ-รายจ่าย
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p class="label-card">รายชื่อ</p>
                        <div class="card-gray w-[510px] h-[210px] p-7">
                            <div class="grid grid-cols-2 gap-5">
                                <router-link v-if="this.user.role == 'manager'" to="/employee/view" class="red-btn h-[40px]">
                                    ดูรายชื่อพนักงานทั้งหมด
                                </router-link>
                                <router-link to="/user/view" class="red-btn h-[40px]">
                                    ดูรายชื่อลูกค้าทั้งหมด
                                </router-link>
                            </div>
                        </div>
                    </div>

                </div>

                <div v-if="this.user.role == 'manager'">
                    <p class="label-card">จัดการข้อมูล</p>
                    <div class="card-gray w-[1044px] h-[210px] p-7">
                        <div class="grid grid-cols-4 gap-5">
                            <RouterLink to="/gold_type/view" class="red-btn h-[40px]">
                                ประเภททองทั้งหมด
                            </RouterLink>
                            <RouterLink to="/gold_pattern/view" class="red-btn h-[40px]">
                                ลายทองทั้งหมด
                            </RouterLink>
                            <RouterLink to="/wholesale/view" class="red-btn h-[40px]">
                                ร้านขายส่งทั้งหมด
                            </RouterLink>
                            <RouterLink to="/custom_order_worker/view" class="red-btn h-[40px]">
                                ช่างงานสั่งทั้งหมด
                            </RouterLink>
                        </div>
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
    
    