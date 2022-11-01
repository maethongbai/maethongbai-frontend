<template>
    <div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    <div v-if=" worker != null" class="mx-3 my-3">
        <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            รายละเอียดช่างงานสั่ง
        </h5>
        <label  class="mx-3">รหัสช่างงานสั่ง: {{ worker.id }}</label>
    </div>
    <div class="my-3">
        <label for="worker.name" class="mx-3">ชื่อช่างงานสั่ง</label>
        <input class="mx-3" type="text" v-model="worker.name">
    </div>
    <div class="my-3">
        <label for="worker.phone" class="mx-3">เบอร์โทรศัพท์ติดต่อ</label>
        <input class="mx-3" type="text" v-model="worker.phone">
    </div>
    <button @click="saveCustomOrderWorker()" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
    ยืนยันการเปลี่ยนแปลงข้อมูล
    </button>
        
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useCustomOrderWorkerStore  } from '@/stores/custom_order_worker.js'

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
                name: null,
                phone: null
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
        const url = `/custom_order_workers/${id}`

        try {
            const response = await this.$axios.get(url)
            console.log(response)
            if (response.status === 200 ) {
                console.log("response 200")
                this.worker = response.data
                
            }
            console.log("created")
        } catch (error) {
            console.error(error)
            this.error = error.message
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
                this.$router.push("/customer_order_worker/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.custom_order_worker_store.fetch()

    },
    methods: {
        async saveCustomOrderWorker() {
            var worker = {
                id: this.worker.id,
                name: this.worker.name,
                phone: this.worker.phone
        }
        try {
            await this.custom_order_worker_store.editWorker(worker.id, worker)
        } catch (error) {
            this.error = error.message
            console.error(error.response.data)
        }
        }
    }

}

</script>