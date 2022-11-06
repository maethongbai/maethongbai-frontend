<template>
<div class="m-8">
    <h1 class="text-3xl">แก้ไขที่อยู่ {{user.name_prefix}}{{user.first_name}}</h1>
</div>
<hr>
<form @submit.prevent="onFormSubmit()">

    <!-- {{gold}} -->
    <div>
        <label for="address">ที่อยู่</label>
    </div>

    <div>
        <textarea v-model="user.address" placeholder="ที่อยู่" id="address" name="address" rows="4" cols="50"></textarea>
    </div>

    <button type="submit" :disabled="disabledButton" class="p-2 bg-green-400 border rounded-lg">
        แก้ไข
    </button>
</form>
</template>

<script>
import {
    useUserStore
} from '@/stores/user.js'
import {
    useAuthStore
} from '@/stores/auth.js'
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
            user: {
                id: null,
                address: null
            },
            gold: {

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
    async created() {
        const user_id = this.$route.params.user_id
        const user_url = `/users/${user_id}`

        const gold_id = this.$route.params.gold_id
        const gold_url = `/golds/${gold_id}`

        try {
            const user_response = await this.$axios.get(user_url)
            if (user_response.status === 200) {
                this.user = user_response.data.data
                // console.table(this.employee)

            }

            const gold_response = await this.$axios.get(gold_url)
            if (gold_response.status === 200) {
                this.gold = gold_response.data.data
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

            var user_obj = {
                id: this.user.id,
                address: this.user.address
            }
            try {
                console.log(user_obj)
                await this.user_store.edit(this.user.id, user_obj)
                this.$router.push('/product/order_summary/' + this.gold.id)
            } catch (error) {
                console.error(error.response.data)
                this.disabledButton = false
            }

        }

    }
}
</script>
