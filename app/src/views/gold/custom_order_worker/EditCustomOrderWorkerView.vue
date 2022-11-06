<template>
        <div v-if='user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-4 mb-0">
                    <!-- breadcrumb -->
                    <b>หน้าหลักระบบหลังร้าน > ช่างงานสั่งทั้งหมด > แก้ไขช่างงานสั่ง > {{ worker.id }}</b>
                </div>

                <div class="card-gray w-[554px] mt-4 mx-auto flex flex-col text-base">
                    <form @submit.prevent="saveCustomOrderWorker()" >
                        <div class="flex flex-row">
                            <p class="p-2">รหัสช่างงานสั่ง: {{ worker.id }}</p>
                        </div>
                        <div class="flex flex-row">
                            <label for="worker.name" class="p-2">ชื่อช่างงานสั่ง: </label>
                            <input required class="text-field w-[300px] ml-auto mr-12" type="text" v-model="worker.name">
                        </div>
                        <div class="flex flex-row">
                            <label for="worker.phone" class="p-2">เบอร์โทรศัพท์ติดต่อ</label>
                            <input required class="text-field w-[300px] ml-auto mr-12" type="text" v-model="worker.phone">
                        </div>
                        <div class="w-[250px] mx-auto">
                            <button type="submit" :disabled="disabledButton" class="red-btn w-[282px] m-2 mt-6 mx-auto">
                                บันทึกการเปลี่ยนแปลง
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
<div v-if='user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/custom_order_worker/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <div v-if=" worker != null" class="mx-3 my-3">
        <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            รายละเอียดช่างงานสั่ง
        </h5>
        <label class="mx-3">รหัสช่างงานสั่ง: {{ worker.id }}</label>
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
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useCustomOrderWorkerStore
} from '@/stores/custom_order_worker.js'

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
            if (response.status === 200) {
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
            if (this.user.role == "manager") {
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
                this.$router.push("/custom_order_worker/view")
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }

}
</script>
