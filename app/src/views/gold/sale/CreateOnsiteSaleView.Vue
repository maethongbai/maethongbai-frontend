<template>
<div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'> 
   <div class="mx-3 my-3">
    <label> เบอร์โทรwww </label>
    <!-- <input type="text"  v-model="onsiteSale.user.phone" autocomplete="off" >
    <button @click="findUser" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
                ค้นหา
    </button>  -->
</div>
</div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useUserStore
} from '@/stores/user.js'
import {
    useGoldStore
} from '@/stores/gold.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        const gold_store = useGoldStore()
        return {
            auth_store,
            user_store,
            gold_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            onsiteSale: {
                id: -1,
                gold: {
                    id: null,
                    name: null,
                    gold_type: null,
                    weight: null,
                    pattern_type: null,
                    size: null,
                },
                gold_price: -1,
                sale_date: "",
                payment_method: {
                    payment_method: [],
                    credit_card_type: "",
                    bank_name: "",
                    paid_amount: "",
                    paid_change: "",
                    slip_image: "",
                },
                user: {
                    id: null,
                    username: null,
                    phone: null
                },
                gold_sell_price: null,
                transfer_status: -1,
                transfer_note: "",
                is_switch_gold: true,
                redemption: ""
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
            if (this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager") {
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
    methods: {
        findUser(tel) {
            var user = this.user_store.findByPhone(this.user.phone)
            console.log(user)
            if (user == undefined ||
                user == null) {
                    this.onsiteSale.user.id = null
                    this.onsiteSale.user.username = null
                    tel.preventDefault();
                    return
            }
            this.onsiteSale.user.id = user.id
            this.onlineSale.user.username = user.username
            tel.preventDefault();
        },
        async createSaleView() {

            //validation (input and checkbox)
            //user
            if (this.onsiteSale.user.id == null) {
                this.chechs.error_message = "กรุณาค้นหาลูกค้าด้วยเบอร์โทร"
            }
        }

    }
}
</script>

<style>
</style>