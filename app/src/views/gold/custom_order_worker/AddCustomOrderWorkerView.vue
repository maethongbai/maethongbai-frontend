<template>
    <div v-if='user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-4 mb-0">
                    <!-- breadcrumb -->
                    <b>หน้าหลักระบบหลังร้าน > ช่างงานสั่งทั้งหมด > เพิ่มช่างงานสั่ง</b>
                </div>

                <div class="card-gray w-[554px] mt-4 mx-auto flex flex-col text-base">
                    <form @submit.prevent="createCustomOrderWorker()" >
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
                                เพิ่มช่างงานสั่ง
                            </button>
                        </div>
                    </form>
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
                console.table(this.custom_order_worker_store.getCustomOrderWorkers)
                this.$router.push("/custom_order_worker/view")
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }
}
</script>
