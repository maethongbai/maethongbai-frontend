<template>
<div v-if='user.role == "manager"'>
    <div class="pt-8 pb-8 flex items-center justify-center">
        <div class="card-white w-[1200px] text-s1">
            <div class="m-4 mb-0">
                <!-- breadcrumb -->
                <b>หน้าหลักระบบหลังร้าน > ช่างงานสั่งทั้งหมด</b>
                <div class="flex flex-row mt-5">
                    <div class="flex flex-row mr-auto">
                        <form @submit.prevent="searchID()">
                            <div class="flex flex-row">
                                <p class="p-2">รหัสช่างงานสั่ง</p>
                                <input class="mx-3 mt-0 text-field w-[200px]" type="text" v-model="workerSearchID" autocomplete="off">
                                <button type="submit" class="red-btn w-[70px] h-[40px]">
                                    ค้นหา
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="ml-auto red-btn w-[150px]">
                        <a v-bind:href="'/custom_order_worker/create'">
                            เพิ่มช่างงานสั่ง +
                        </a>
                    </div>
                </div>

            </div>

            <div class="card-gray w-[1044px] mt-4">
            <table class="w-full text-sm w-[1014px]">
                <thead class="table-head text-left text-base">
                    <tr>
                        <th scope="col" class="p-2 w-[200px] text-center">
                            รหัสช่างงานสั่ง
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ชื่อช่าง
                        </th>
                        <th scope="col" class="text-left">
                            เบอร์โทรศัพท์
                        </th>
                        <th scope="col" class="px-6 py-3 ml-auto w-[200px]">
                            แก้ไข
                        </th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="worker in workers" class="table-card" @click="setSearched(worker)">
                    <th scope="row" class="text-center">
                        {{ worker.id }}
                    </th>
                    <td class="pl-5 w-[220px]">
                        {{ worker.name }}
                    </td>
                    <td>
                        {{ worker.phone }}
                    </td>
                    <td class="px-6 py-4">
                        <a v-bind:href="'/custom_order_worker/edit/'+worker.id" >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </a>
                    </td>
                </tr>
            </tbody>
            </table>
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
            workers: null,
            temp_workers: null,
            workerSearchID: null,
            worker_searched: null,
            error: null
        }
    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                // console.log(newValue.getAuth)
                this.auth = newValue.getAuth
                this.user = JSON.parse(newValue.getUser)
            }
        }
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "manager") {
                console.log("authorized");
            } else {
                this.$router.push("/")
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }

        await this.custom_order_worker_store.fetch()
        this.workers = this.custom_order_worker_store.getCustomOrderWorkers
        // console.table(this.custom_order_worker_store.getCustomOrderWorkers)
    },
    methods: {
        async searchID() {
            this.error = null
            if (this.workerSearchID == null || this.workerSearchID == "") {
                this.worker_searched = null
                this.$router.go(0)
            }
            try {
                this.worker_searched = await this.custom_order_worker_store.getWorkerID(this.workerSearchID)
                this.temp_workers = this.custom_order_worker_store.getCustomOrderWorkers
                this.workers = this.custom_order_worker_store.filterWorkerByID(this.temp_workers, this.workerSearchID)
            } catch (error) {
                this.error = error.message
            }
        },
        setSearched(worker) {
            this.worker_searched = worker
        }

    }
}
</script>
