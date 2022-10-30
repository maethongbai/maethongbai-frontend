<template>
    <div v-if='user.role == "manager"'>
        <div v-if=" onsiteSale!= null" class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            รายละเอียด
            </h5>

            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                เลขบิล: {{onsiteSale.id}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                ช่องทางการขาย: หน้าร้าน
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                ชื่อลูกค้า: {{onsiteSale.user.username}}

                <input v-model="edit_user" id="edit_user" type="checkbox" value="edit_user">
                <label class="mx-3">แก้ไขลูกค้า</label>
                <div v-if="edit_user == true" >
                    <label class="mx-3">ค้นหาเบอร์ลูกค้า</label>
                    <input class="mx-3" type="text" v-model="new_onsiteSale.user.phone" autocomplete="off">
                    <button @click="findUser" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                        ค้นหา
                    </button>
                 </div>
            </p>
            <!-- <p class="mx-1 mb-3 font-normal text-gray-700">
                 ชื่อลูกค้า: {{onsiteSale.user.username}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                รหัสสินค้า: {{onsiteSale.gold.id}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                ชื่อสินค้า: {{onsiteSale.gold.name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                ประเภทสินค้า: {{onsiteSale.gold.gold_type.name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                นำ้หนัก: {{onsiteSale.gold.weight}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                ลาย: {{onsiteSale.gold.gold_pattern.name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                วันที่ขาย: {{onsiteSale.sale_date}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">

            </p> -->
        </div>
    </div>

</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useOnsiteSaleStore
} from '@/stores/onsiteSale.js'
import {
    useUserStore
} from '@/stores/user.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const onsiteSale_store = useOnsiteSaleStore()
        const user_store = useUserStore()
        return {
            auth_store,
            onsiteSale_store,
            user_store
        }

    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            onsiteSale: {
                user: {
                    id: null,
                    username: null,
                    phone: null,
                }
            },
            onsiteSale_id: null,
            onsiteSale_check_status: null,
            check_status_check: true,
            edit_user: false,
            new_onsiteSale: {
                user: {
                    id: null,
                    username: null,
                    phone: null
                }
            },
            checks: {
                phone_user: true
            },
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
        // api
        const url = `/onsite_sales/${id}`

        try {
            const response = await this.$axios.get(url)
            if (response.status === 200) {
                this.onsiteSale = response.data.data
                console.log(this.onsiteSale)
                this.onsiteSale_id = this.onsiteSale.id
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
                console.log("authorized "+document.URL);
            } else {
                this.$router.push("/sale/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.user_store.fetch()
        await this.onsiteSale_store.fetch()
    },
    methods: {
        findUser(e) {
            var user = this.user_store.findByPhone(this.new_onsiteSale.user.phone)
            console.log(user)
            if (user == undefined ||
                user == null) {
                    this.new_onsiteSale.user.id = null
                    this.new_onsiteSale.user.username = null
                    this.checks.phone_user = false
                    e.preventDefault();
                    return
            }
            this.new_onsiteSale.user.id = user.id
            this.new_onsiteSale.user.username = user.username
            this.onsiteSale.user.username = this.new_onsiteSale.user.username
            e.preventDefault();
        },
    }
}
</script>