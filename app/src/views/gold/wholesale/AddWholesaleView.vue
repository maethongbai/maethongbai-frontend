<template>
    <div v-if='user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-4 mb-0">
                    <!-- breadcrumb -->
                    <b>หน้าหลักระบบหลังร้าน > ร้านขายส่งทั้งหมด > เพิ่มร้านขายส่งใหม่</b>
                </div>

                <div class="card-gray w-[554px] mt-4 mx-auto flex flex-col text-base">
                    <form @submit.prevent="createWholesale()">
                        <div class="flex flex-row">
                            <p class="p-2">รหัสร้านขายส่ง: {{ wholesale.id }}</p>
                        </div>
                        <div class="flex flex-row">
                            <label for="wholesale.name" class="p-2">ชื่อร้านขายส่ง: </label>
                            <input required class="text-field w-[300px] ml-auto mr-12" type="text" v-model="wholesale.name">
                        </div>
                        <div class="flex flex-row">
                            <label for="wholesale.name" class="p-2">เบอร์โทรศัพท์ติดต่อ: </label>
                            <input required class="text-field w-[300px] ml-auto mr-12" type="text" v-model="wholesale.phone">
                        </div>
                        <div class="flex flex-row">
                            <label for="wholesale.name" class="p-2">ที่อยู่ร้านขายส่ง: </label>
                            <textarea required v-model="wholesale.address" class="text-field w-[300px] ml-auto mr-12" name="" id="" cols="30" rows="5"></textarea>
                        </div>
                        <div class="w-[250px] mx-auto">
                            <button type="submit" :disabled="disabledButton" class="red-btn w-[282px] m-2 mt-6 mx-auto">
                                เพิ่มร้านขายส่ง
                            </button>
                        </div>
                    </form>
                </div>
                <label v-if="input_check.is_valid == false" class="inline-block mx-1 mb-2 text-red-500 font-bold">
                            เพิ่มร้านขายส่งไม่สำเร็จ ตรวจสอบ error ข้างล่าง
                </label>
                <label v-if="input_check.is_valid == false" v-for="error in input_check.errors" class="block mx-3 font-medium text-red-500">
                            - {{error}}
                </label>
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
} from '@/stores/wholesale.js';

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
            error: null,
            wholesale: {
                id: -1,
                name: null,
                phone: null,
                address: null
            },
            disabledButton: false,
            input_check: {
                errors: [],
                is_valid: true
            }
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
            if (this.user.role == "manager") {
                console.log("authorized " + document.URL);

            } else {
                this.$router.push("/wholesale/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }

        await this.wholesale_store.fetch()
        this.wholesale.id = this.wholesale_store.getNextID()
    },
    methods: {
        async createWholesale() {

                this.disableButton = true
                // validation
                this.input_check.errors = []
                this.input_check.is_valid = true

                if (this.wholesale.phone.length != 10) {
                    this.input_check.errors.push("เบอร์โทรศัพท์ไม่ถูกต้อง")
                    this.input_check.is_valid = false
                }
 

                if (this.input_check.is_valid == false) {
                    this.disableButton = false
                    return
                }

                try {
                    var wholesale = {
                        name: this.wholesale.name,
                        phone: this.wholesale.phone,
                        address: this.wholesale.address
                    }
                    await this.wholesale_store.add(wholesale)
                    console.table(this.wholesale_store.getWholesales)
                    this.$router.push("/wholesale/view")
                } catch (error) {
                    this.error = error.message
                    console.error(error.response.data)
                }
                this.disabledButton = false
        }
    }
}
</script>
