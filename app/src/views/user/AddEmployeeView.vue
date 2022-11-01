<template>
    <div class="block my-5">
        <router-link to="/employee/view" class="px-5 py-2 ml-4 my-4 bg-gray-200 rounded-xl">ย้อนกลับ</router-link>
        | เพิ่มบัญชีพนักงานใหม่
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
                        <input type="text" class="bg-gray-200" v-model="employee.id" required autocomplete="off" disabled>
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
                        <input type="text" v-model="employee.nickname" placeholder="นามสกุล" autocomplete="off" required>
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
                        <Datepicker v-model="employee.birth_date" :format="date_format"></Datepicker>
                    </div>
                    <div>
                        <label>เงินเดือน</label>
                        <input type="text" v-model="employee.salary" required autocomplete="off">
                    </div>
                    <div>
                        <label>วันที่เริ่มทำงาน</label>
                        <Datepicker v-model="employee.work_start_date" :format="date_format"></Datepicker>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <label for="address">ที่อยู่</label><br>
                    <textarea v-model="employee.address" placeholder="ที่อยู่" id="address" name="address" rows="4" cols="40" required></textarea>
                </div>
            </div>

            <div class="text-red-500">
                <p>***รหัสผ่านเริ่มต้นของบัญชีคือเบอร์โทรศัพท์***</p>
            </div>

            <div v-if="error_message">
                {{ error_message }}
            </div>

            <button type="submit"
                :disabled="disabledButton"
                class="p-2 bg-green-400 border rounded-lg"
            >
                เพิ่มบัญชีพนักงานใหม่
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
            employee_obj_id: null,
            employee: {
                id: null,
                name_prefix: null,
                first_name: null,
                last_name: null,
                nickname: null,
                id_card_number: null,
                address: null,
                email: null,
                work_start_date: null,
                role: null,
                phone: null,
                birth_date: null,
                salary: null,
                password: null,
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
                this.$router.push("/");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }

        try {
            await this.employee_store.fetch()
            this.employee.id = this.employee_store.getNextId()
        } catch (error) {
            console.log(error.message)
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

            this.disabledButton = true
            var employee_obj = {
                nickname: this.employee.nickname,
                work_start_date: this.employee.work_start_date.getFullYear() + '-' +
                                this.employee.work_start_date.getMonth() + '-'  +
                                this.employee.work_start_date.getDate(),
                birth_date: this.employee.birth_date.getFullYear() + '-' +
                            this.employee.birth_date.getMonth() + '-'  +
                            this.employee.birth_date.getDate(),
                salary: this.employee.salary,
                role: this.employee.role
            }

            try {
                console.table(employee_obj)
                this.employee_obj_id = await this.employee_store.add(employee_obj)
                console.log(this.employee_obj_id)
            } catch (error) {
                console.log(error.message)
                this.disabledButton = false
                return
            }

            var user_obj = {
                password: this.employee.phone,
                phone : this.employee.phone,
                name_prefix: this.employee.name_prefix,
                first_name: this.employee.first_name,
                last_name: this.employee.last_name,
                id_card_number: this.employee.id_card_number,
                address: this.employee.address,
                email: this.employee.email,
                role: this.employee.role,
                employee_id: this.employee_obj_id
            }
                console.table(user_obj)
            try {
                await this.user_store.add(user_obj)
                this.$router.push('/employee/view')
            } catch (error) {
                console.error(error.response.data)
                this.disabledButton = false
            }

         }
      }
    }
</script>