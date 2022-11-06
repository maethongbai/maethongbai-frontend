<template>
<div v-if='user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/custom_order_worker/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <form @submit.prevent="createGoldType()">
        <div class="mx-3 my-3">
            <label for="nextID" class="mx-3">รหัสประเภททอง: {{ gold_type.id }}</label>
        </div>
        <div class="mx-3 my-3">
            <label for="gold_pattern.name" class="mx-3">ชื่อประเภททอง</label>
            <input class="mx-3" type="text" v-model="gold_type.name">
        </div>

        <button type="submit" :disabled="disabledButton" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
            บันทึกรายการ
        </button>
    </form>
</div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useGoldTypeStore
} from '@/stores/gold_type.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_type_store = useGoldTypeStore()

        return {
            auth_store,
            gold_type_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            gold_type: {
                id: -1,
                name: null
            },
            disabledButton: false
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
            if (this.user.role == "manager") {
                console.log("authorized " + document.URL);

            } else {
                this.$router.push("/gold_type/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }

        await this.gold_type_store.fetch()
        this.gold_type.id = this.gold_type_store.getNextID()
    },
    methods: {
        async createGoldType() {
            try {
                console.log(this.gold_type)
                var gold_type = {
                    name: this.gold_type.name
                }
                await this.gold_type_store.add(gold_type)
                this.$router.push("/gold_type/view")
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }
}
</script>
