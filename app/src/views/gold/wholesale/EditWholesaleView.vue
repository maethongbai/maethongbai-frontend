<template>
        <div v-if='user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-4 mb-0">
                    <!-- breadcrumb -->
                    <b>หน้าหลักระบบหลังร้าน > ร้านขายส่งทั้งหมด > แก้ไขร้านขายส่ง > {{ wholesale.id }}</b>
                </div>

                <div class="card-gray w-[554px] mt-4 mx-auto flex flex-col text-base">
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
                        <button @click="saveWholesale()" type="submit" :disabled="disabledButton" class="red-btn w-[282px] m-2 mt-6 mx-auto">
                            บันทึกการเปลี่ยนแปลง
                        </button>
                    </div>
                </div>
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
} from '@/stores/wholesale.js'

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
                name: null,
                phone: null,
                address: null
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
    async created() {
        const id = this.$route.params.id
        const url = `/wholesales/${id}`

        try {
            const response = await this.$axios.get(url)

            if (response.status === 200) {
                this.wholesale = response.data

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
                this.$router.push("/wholesale/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.wholesale_store.fetch()

    },
    methods: {
        async saveWholesale() {
            var wholesale = {
                id: this.wholesale.id,
                name: this.wholesale.name,
                phone: this.wholesale.phone,
                address: this.wholesale.address
            }
            try {
                await this.wholesale_store.editWholesale(wholesale.id, wholesale)
                this.$router.push("/wholesale/view")
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }

}
</script>
