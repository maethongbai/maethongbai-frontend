<template>
    <div class="block my-5">
        <router-link to="/employee/view" class="px-5 py-2 ml-4 my-4 bg-gray-200 rounded-xl">ย้อนกลับ</router-link>
        | แก้ไขข้อมูลพนักงาน
    </div>

    <div v-if="error">
        {{ error }}
    </div>

    <div class="mx-5 mb-10">
        <form @submit.prevent="onFormSubmit()">
            <div class="grid grid-cols-2">
                <div>
                    <div>
                        <label>รหัสพนักงาน</label>
                        <input type="text" class="bg-gray-200" v-model="employee.employee.id" required autocomplete="off" disabled>
                    </div>

                    <div>
                        <label for="name_prefix">คำนำหน้าชื่อ</label>
                        <select v-model="employee.name_prefix">
                            <option disabled selected value="">คำนำหน้าชื่อ</option>
                            <option value="นาย">นาย</option>
                            <option value="นาง">นาง</option>
                            <option value="นางสาว">นางสาว</option>
                        </select>
                        <br>
                        <label for="first_name">ชื่อ</label>
                        <input type="text" v-model="employee.first_name" placeholder="ชื่อ" autocomplete="off" required>
                        <br>
                        <label for="last_name">นามสกุล</label>
                        <input type="text" v-model="employee.last_name" placeholder="นามสกุล" autocomplete="off" required>
                        <br>
                        <label for="last_name">ชื่อเล่น</label>
                        <input type="text" v-model="employee.employee.nickname" placeholder="ชื่อเล่น" autocomplete="off" required>
                    </div>

                    <div>
                        <label>เลขบัตรประชาชน</label>
                        <input type="text" v-model="employee.id_card_number" required autocomplete="off">
                    </div>
                </div>

                <div>
                    <div>
                        <label>อีเมล</label>
                        <input type="text" v-model="employee.email" required autocomplete="off">
                    </div>
                    <div>
                        <label for="role">ตำแหน่ง</label>
                        <select v-model="employee.role">
                            <option disabled selected value="">ตำแหน่ง</option>
                            <option value="employee">พนักงานประจำร้าน (Employee)</option>
                            <option value="account">บัญชี (accounter)</option>
                            <option value="manager">ผู้จัดการร้าน (manager)</option>
                        </select>
                    </div>
                    <div>
                        <label>เบอร์โทรศัพท์</label>
                        <input type="text" v-model="employee.phone" required autocomplete="off">
                    </div>
                    <div>
                        <label>วันเกิด</label>
                        <Datepicker v-model="employee.employee.birth_date" :format="date_format"></Datepicker>
                    </div>
                    <div>
                        <label>เงินเดือน</label>
                        <input type="text" v-model="employee.employee.salary" required autocomplete="off">
                    </div>
                    <div>
                        <label>วันที่เริ่มทำงาน</label>
                        <Datepicker v-model="employee.employee.work_start_date" :format="date_format"></Datepicker>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <label for="address">ที่อยู่</label><br>
                    <textarea v-model="employee.address" placeholder="ที่อยู่" id="address" name="address" rows="4" cols="40" required></textarea>
                </div>
            </div>

            <div v-if="error_message">
                {{ error_message }}
            </div>

            <button type="submit"
                :disabled="disabledButton"
                class="p-2 bg-green-400 border rounded-lg"
            >
                บันทึกข้อมูล
            </button>
        </form>
    </div>
</template>

<script>
    import { useUserStore } from '@/stores/user.js'
    import { useAuthStore } from '@/stores/auth.js'
    import { useEmployeeStore } from '@/stores/employee.js'
    import moment from 'moment'
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import { DOMDirectiveTransforms } from '@vue/compiler-dom';
    
    export default {
      setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        const employee_store = useEmployeeStore()
        const date_format = (date) => {
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        }
        return { user_store, auth_store, employee_store, date_format }
      },
      data() {
        return {
            error: null,
            disabledButton: false,
            error_message: null,
            user: null,
            employee: null,
        }
      },
      async created() {
        const id = this.$route.params.id
        const url = `/users/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.employee = response.data.data
                // console.table(this.employee)

            }
        } catch (error) {
            console.error(error)
            this.error = error.message

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

      },
      components: {
        Datepicker
      },
      methods: {
        async onFormSubmit() {
            this.error = null
            this.error_message = null
            if ( this.user_store.findByPhone(this.employee.phone) != null) {
                this.error_message = "เบอร์โทรนี้มีในระบบแล้ว"
                return;
            }
            //this.employee.employee.work_start_date = this.employee.employee.work_start_date.getFullYear() + '-' + this.employee.employee.work_start_date.getMonth() + '-'  +this.employee.employee.work_start_date.getDate()
            //this.employee.employee.birth_date = this.employee.employee.birth_date.getFullYear() + '-' + this.employee.employee.birth_date.getMonth() + '-'  +this.employee.employee.birth_dategetDate()
            this.disabledButton = true
            console.table(this.employee)
            this.disabledButton = false
            try {
                await this.user_store.edit(this.employee.id, this.employee)
                this.$router.push('/employee/view')
            } catch (error) {
                console.error(error.response.data)
                this.disabledButton = false
            }

         }
      }
    }
</script>