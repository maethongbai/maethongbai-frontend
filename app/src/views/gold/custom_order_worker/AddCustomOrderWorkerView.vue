<template>
<div v-if='user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/custom_order_worker/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <form @submit.prevent="createCustomOrderWorker()">
        <div class="mx-3 my-3">
            <label for="nextID" class="mx-3">รหัสช่างงานสั่ง: {{ worker.id }}</label>
        </div>
        <div class="my-3">
            <label for="worker.name" class="mx-3">ชื่อช่างงานสั่ง</label>
            <input class="mx-3" type="text" v-model="worker.name">
        </div>
        <div class="my-3">
            <label for="worker.phone" class="mx-3">เบอร์โทรศัพท์ติดต่อ</label>
            <input class="mx-3" type="text" v-model="worker.phone">
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
    useCustomOrderWorkerStore
} from '@/stores/custom_order_worker.js';

export default {
    setup() {
        const auth_store = useAuthStore()
        const custom_order_worker_store = useCustomOrderWorkerStore()

        return {
            auth_store,
            custom_order_worker_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            worker: {
                id: -1,
                name: null,
                phone: null
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
                this.$router.push("/");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }

        await this.custom_order_worker_store.fetch()
        this.worker.id = this.custom_order_worker_store.getNextID()
    },
    methods: {
        async createCustomOrderWorker() {
            try {
                var worker = {
                    name: this.worker.name,
                    phone: this.worker.phone
                }
                await this.custom_order_worker_store.add(worker)
                this.$router.push("/custom_order_worker/view")
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }
}
</script>
