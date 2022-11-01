<template>
    <div class="m-8">
        <h1 class="text-3xl">สร้างบัญชีใหม่</h1>
        <div v-if="error">
            {{ error }}
        </div>
    </div>
    <hr>
    <form @submit.prevent="onFormSubmit()">
        <div>
            <label for="email">อีเมล</label>
            <input type="text" v-model="user.email" placeholder="อีเมล" required autocomplete="off">
        </div>
        <div>
            <label for="phone">เบอร์โทรศัพท์</label>
            <input type="text" v-model="user.phone" placeholder="เบอร์โทรศัพท์" required autocomplete="off">
        </div>
        <div>
            <label for="password">รหัสผ่าน</label>
            <input type="password" v-model="user.password" placeholder="รหัสผ่าน" required autocomplete="off">
        </div>
        <div>
            <label for="comfirm_password">ยืนยันรหัสผ่าน</label>
            <input type="password" v-model="confirm_password" placeholder="ยืนยันรหัสผ่าน" required autocomplete="off">
        </div>
        <hr>
        <div>
            <label for="name_prefix">คำนำหน้าชื่อ</label>
            <select v-model="user.name_prefix">
                <option disabled selected value="">คำนำหน้าชื่อ</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
            </select>

            <label for="first_name">ชื่อ</label>
            <input type="text" v-model="user.first_name" placeholder="ชื่อ" autocomplete="off" required>

            <label for="last_name">นามสกุล</label>
            <input type="text" v-model="user.last_name" placeholder="นามสกุล" autocomplete="off" required>
        </div>

        <div>
            <label for="id_card_number">เลขบัตรประชาชน</label>
            <input type="text" v-model="user.id_card_number" placeholder="เลขบัตรประชาชน" autocomplete="off" required>
        </div>

        <div>
            <label for="address">ที่อยู่</label>
        </div>

        <div>
            <textarea v-model="user.address" placeholder="ที่อยู่" id="address" name="address" rows="4" cols="50" required></textarea>
        </div>
        <div v-if="error_message">
            {{ error_message }}
        </div>

        <button type="submit"
                :disabled="disabledButton"
                class="p-2 bg-green-400 border rounded-lg"
          >
          สร้างบัญชีใหม่
        </button>
    </form>
    
</template>

<script>
import { useUserStore } from '@/stores/user.js'

export default {
    setup() {
      const user_store = useUserStore()
      return { user_store }
    },
    data() {
      return {
        user: {
            email: null,
            phone : null,
            password: null,
            name_prefix: null,
            first_name: null,
            last_name: null,
            id_card_number: null,
            address: null
        },
        confirm_password: null,
        error_message: null,
        error: null,
        disabledButton: false
      }
    },
    async mounted() {
        await this.user_store.fetch()
        this.users = this.user_store.getUsers
    },
    methods: {
        async onFormSubmit() {
            this.error = null
            this.error_message = null
            if ( this.user_store.findByPhone(this.user.phone) != null) {
                this.error_message = "เบอร์โทรนี้มีในระบบแล้ว"
                return;
            }
            if (this.user.password != this.confirm_password) {
                this.error_message = "ยืนยันรหัสผ่านไม่ถูกต้อง"
                return;
            }
            this.disabledButton = true
            var user_obj = {
                email: this.user.email,
                password: this.user.password,
                phone : this.user.phone,
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