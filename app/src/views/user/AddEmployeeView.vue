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
                        <Datepicker v-model="employee.birth_date"></Datepicker>
                    </div>
                    <div>
                        <label>เงินเดือน</label>
                        <input type="number" step=".01" v-model="employee.salary" required autocomplete="off">
                    </div>
                    <div>
                        <label>วันที่เริ่มทำงาน</label>
                        <Datepicker v-model="employee.work_start_date"></Datepicker>
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

            <button type="submit"
                :disabled="disabledButton"
                class="p-2 bg-green-400 border rounded-lg"
            >
                เพิ่มบัญชีพนักงานใหม่
            </button>
            <label v-if="input_check.is_valid == false" class="inline-block mx-1 mb-2 text-red-500 font-bold">
                ยืนยันรายการสั่งไม่สำเร็จ ตรวจสอบ error ข้างล่าง
            </label>
            <label v-if="input_check.is_valid == false" v-for="error in input_check.errors" class="block mx-3 font-medium text-red-500">
                - {{error}}
            </label>
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
    export default {
      setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        const employee_store = useEmployeeStore()
        return { user_store, auth_store, employee_store}
      },
      data() {
        return {
            error: null,
            disabledButton: false,
            error_message: null,
            employee_obj_id: null,
            employee: {
                id: null,
                name_prefix: "นาย",
                first_name: null,
                last_name: null,
                nickname: null,
                id_card_number: null,
                address: null,
                email: null,
                work_start_date: null,
                role: "employee",
                phone: null,
                birth_date: null,
                salary: null,
                password: null,
            },
            input_check: {
                errors: [],
                is_valid: true
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
            this.disableButton = true
            // validation
            this.input_check.errors = []
            this.input_check.is_valid = true

            var user_list = this.user_store.getUsers
            var email_available = true
            var phone_available = true

            user_list.every((user) => { 
                if (user.email == this.employee.email) {
                    email_available = false
                    return false // break
                }
                if (user.phone == this.employee.phone) {
                    phone_available = false
                    return false
                }
                return true
            })

            if (email_available == false) {
                this.input_check.errors.push("อีเมลนี้ถูกใช้ไปแล้ว")
                this.input_check.is_valid = false
            }
            if (phone_available == false) {
                this.input_check.errors.push("เบอร์โทรศัพท์นี้ถูกใช้ไปแล้ว")
                this.input_check.is_valid = false
            }
            if (this.employee.phone.length != 10) {
                this.input_check.errors.push("เบอร์โทรศัพท์ไม่ถูกต้อง")
                this.input_check.is_valid = false
            }
            if (this.employee.id_card_number.length != 13) {
                this.input_check.errors.push("เลขบัตรประชาชนไม่ถูกต้อง")
                this.input_check.is_valid = false
            }

            if (this.employee.birth_date == null) {
                this.input_check.errors.push("กรุณากรอกข้อมูลวันเกิด")
                this.input_check.is_valid = false
            } 

            if (this.employee.salary < 0) {
                this.input_check.errors.push("เงินเดือนต้องเป็นจำนวนบวก")
                this.input_check.is_valid = false
            }

            if (this.employee.work_start_date == null) {
                this.input_check.errors.push("กรุณากรอกข้อมูลวันที่เริ่มทำงาน")
                this.input_check.is_valid = false
            } else {
                if ((new Date(this.employee.work_start_date)) < moment()) {
                    this.input_check.errors.push("วันที่เริ่มทำงานต้องไม่อยู่ในอดีต")
                    this.input_check.is_valid = false
                }
            }

            if (this.input_check.is_valid == false) {
                this.disableButton = false
                return
            }

            var date = new Date(this.employee.birth_date).toLocaleDateString().split("/")
            var year = String(date[2]).padStart(4, '0')
            var day = String(date[1]).padStart(2, '0')
            var month = String(date[0]).padStart(2, '0')
            var birth_date = year + "-" + month + "-" + day
            this.employee.birth_date = birth_date

            var date = new Date(this.employee.work_date).toLocaleDateString().split("/")
            var year = String(date[2]).padStart(4, '0')
            var day = String(date[1]).padStart(2, '0')
            var month = String(date[0]).padStart(2, '0')
            var work_date = year + "-" + month + "-" + day
            this.employee.work_start_date = work_date


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
                // console.table(employee_obj)
                this.employee_obj_id = await this.employee_store.add(employee_obj)
                console.table(this.employee_store.getEmployees)
                // console.log(this.employee_obj_id)
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