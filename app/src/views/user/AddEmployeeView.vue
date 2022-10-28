<template>
    <div class="block my-5">
        <router-link to="/employee/view" class="px-5 py-2 ml-4 my-4 bg-gray-200 rounded-xl">ย้อนกลับ</router-link>
        | เพิ่มพนักงานใหม่
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
                        <input type="text" v-model="employee.id" required autocomplete="off">
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
                        <input type="text" v-model="employee.birth_date" required autocomplete="off">
                    </div>
                    <div>
                        <label>เงินเดือน</label>
                        <input type="text" v-model="employee.salary" required autocomplete="off">
                    </div>
                    <div>
                        <label>วันที่เริ่มทำงาน</label>
                        <input type="text" v-model="employee.work_start_date" required autocomplete="off">
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <label for="address">ที่อยู่</label><br>
                    <textarea v-model="employee.address" placeholder="ที่อยู่" id="address" name="address" rows="4" cols="40" required></textarea>
                </div>
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
    export default {
      setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        return { user_store, auth_store }
      },
      data() {
        return {
            error: null,
            disabledButton: false,
            employee: {
                id: null,
                name_prefix: null,
                first_name: null,
                last_name: null,
                nickname: null,
                id_card_number: null,
                address: null,
                work_start_date: null,
                role: null,
                phone: null,
                birth_date: null,
                salary: null,
            }
        }
      },
      methods: {
        async onFormSubmit() {
            this.error = null
            this.disabledButton = true

        }
      }
    }
</script>