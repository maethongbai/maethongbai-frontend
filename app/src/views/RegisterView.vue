<template>
    <div class="pt-8 pb-8 flex items-center justify-center">
        <div class="card-white w-[600px] text-s1">
            <div class="">
                <h1 class="text-3xl text-center p-2"><b>สร้างบัญชีใหม่</b></h1>
                <form @submit.prevent="onFormSubmit()">
                    <div>
                        <label for="email">อีเมล</label>
                        <input class="text-field mb-2" type="text" v-model="user.email" placeholder="อีเมล" autocomplete="off">
                    </div>
                    <div>
                        <label for="phone">เบอร์โทรศัพท์</label>
                        <input class="text-field mb-2" type="text" v-model="user.phone" placeholder="เบอร์โทรศัพท์" required autocomplete="off">
                    </div>
                    <div>
                        <label for="password">รหัสผ่าน</label>
                        <input class="text-field mb-2" type="password" v-model="user.password" placeholder="รหัสผ่าน" required autocomplete="off">
                    </div>
                    <div>
                        <label for="comfirm_password">ยืนยันรหัสผ่าน</label>
                        <input class="text-field mb-2" type="password" v-model="confirm_password" placeholder="ยืนยันรหัสผ่าน" required autocomplete="off">
                    </div>
                    <div>
                        <label for="name_prefix">คำนำหน้าชื่อ</label>
                        <select class="select-box mb-2" v-model="user.name_prefix">
                            <option value="นาย">นาย</option>
                            <option value="นาง">นาง</option>
                            <option value="นางสาว">นางสาว</option>
                        </select>

                        <label for="first_name">ชื่อ</label>
                        <input class="text-field mb-2" type="text" v-model="user.first_name" placeholder="ชื่อ" autocomplete="off" required>

                        <label for="last_name">นามสกุล</label>
                        <input class="text-field mb-2" type="text" v-model="user.last_name" placeholder="นามสกุล" autocomplete="off" required>
                    </div>

                    <div>
                        <label for="id_card_number">เลขบัตรประชาชน</label>
                        <input class="text-field mb-2" type="text" v-model="user.id_card_number" placeholder="เลขบัตรประชาชน" autocomplete="off">
                    </div>

                    <div>
                        <label for="address">ที่อยู่</label>
                    </div>

                    <div>
                        <textarea class="text-field mb-2" v-model="user.address" placeholder="ที่อยู่" id="address" name="address" rows="4" cols="50"></textarea>
                    </div>

                    <div class="w-[250px] mx-auto text-center">
                        <button type="submit" :disabled="disabledButton" class="red-btn w-[282px] m-2 mt-6 mx-auto">
                            สร้างบัญชีใหม่
                        </button>
                        <a href="/register" class="hover:underline">กลับไปยังหน้าเข้าสู่ระบบ</a>
                    </div>

                    <label v-if="input_check.is_valid == false" class="inline-block mx-1 mb-2 text-red-500 font-bold">
                        สร้างบัญชีใหม่ไม่สำเร็จ ตรวจสอบ error ข้างล่าง
                    </label>
                    <label v-if="input_check.is_valid == false" v-for="error in input_check.errors" class="block mx-3 font-medium text-red-500">
                        - {{error}}
                    </label>
                </form>
            </div>
        </div>
    </div>






<hr>

</template>

<script>
import {
    useUserStore
} from '@/stores/user.js'
import {
    useAuthStore
} from '@/stores/auth.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        return {
            auth_store,
            user_store
        }
    },
    data() {
        return {
            user: {
                email: null,
                phone: null,
                password: null,
                name_prefix: "นาย",
                first_name: null,
                last_name: null,
                id_card_number: null,
                address: null
            },
            confirm_password: null,
            error_message: null,
            error: null,
            disabledButton: false,
            input_check: {
                errors: [],
                is_valid: true
            },
            auth: null,
            auth_user: null
        }
    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                this.auth = this.auth_store.getAuth
                this.auth_user = JSON.parse(this.auth_store.getUser)
            }
        },
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.auth_user = JSON.parse(this.auth_store.getUser)
            if (this.auth_user.role == "employee" ||
                this.auth_user.role == "account" ||
                this.auth_user.role == "manager") {
                console.log("authorized " + document.URL);
            } else {
                this.$router.push("/");
            }
        }

        await this.user_store.fetch()
        this.users = this.user_store.getUsers
    },
    methods: {
        async onFormSubmit() {
            this.disabledButton = true
            // validation
            this.input_check.errors = []
            this.input_check.is_valid = true


            if (this.user_store.findByEmail(this.user.email) != undefined &&
                this.user.email != null) {
                this.input_check.errors.push("อีเมลนี้ถูกใช้ไปแล้ว")
                this.input_check.is_valid = false
            }
            if (this.user.password.length < 6) {
                this.input_check.errors.push("รหัสผ่านสั้นไป")
                this.input_check.is_valid = false
            }
            if (this.user.phone.length != 10) {
                this.input_check.errors.push("กรุณาตรวจสอบเบอร์โทรศัพท์")
                this.input_check.is_valid = false
            }

            if (this.user.password != this.confirm_password) {
                this.input_check.errors.push("รหัสผ่านกับยืนยันรหัสผ่านไม่เหมือนกัน")
                this.input_check.is_valid = false
            }

            if (this.input_check.is_valid == false) {
                this.disabledButton = false
                return
            }

            var user_obj = {
                email: this.user.email,
                password: this.user.password,
                phone: this.user.phone,
                name_prefix: this.user.name_prefix,
                first_name: this.user.first_name,
                last_name: this.user.last_name,
                id_card_number: this.user.id_card_number,
                address: this.user.address
            }
            try {
                console.log(user_obj)
                await this.user_store.add(user_obj)
                this.$router.push('/login')
            } catch (error) {
                console.error(error.response.data)
                this.disabledButton = false
            }

        }

    }
}
</script>
