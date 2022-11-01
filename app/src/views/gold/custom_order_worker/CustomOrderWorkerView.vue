<template>
    <div v-if='user.role == "employee" ||
               user.role == "account" ||
               user.role == "manager"'>
    <div class="inline">
        <div class="text-3xl">ช่างงานสั่งทั้งหมด</div>
        <form @submit.prevent="searchID()">
            <div class="inline">
                <label>ID</label>
                <input class="mx-3" type="text" v-model="workerSearchID" autocomplete="off">
            </div>

            <button type="submit" class="inline p-2 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
    </div>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-blue-100 dark:text-blue-100">
        <thead class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
            <tr>
                <th scope="col" class="px-6 py-3">
                    รหัสช่าง
                </th>
                <th scope="col" class="px-6 py-3">
                    ชื่อช่างงานสั่ง
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="worker in workers" class="bg-yellow-700 border-b border-blue-400 hover:bg-yellow-500"
            @click="setSearched(worker)">
                <th scope="row" class="py-4 px-6 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    {{ worker.id }}
                </th>
                <td class="px-6 py-4">
                    {{ worker.name }}
                </td>
            </tr>
        </tbody>
    </table>
    <div v-if="worker_searched != null" class="py-5">
        <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                รหัสช่าง: {{worker_searched.id}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                ชื่อช่าง: {{worker_searched.name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                เบอร์โทรศัพท์: {{ worker_searched.phone }}
            </p>
        </div>

    </div>
</div>
</div>

</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useCustomOrderWorkerStore } from '@/stores/custom_order_worker.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const custom_order_worker_store = useCustomOrderWorkerStore()
        return {
            auth_store, custom_order_worker_store
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
            this.auth  = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "employee" 
               || this.user.role == "account" 
               || this.user.role == "manager") {
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
        console.log(this.workers)
    },
    methods: {
        async searchID() {
            this.error = null
            if (this.workerSearchID == null || this.workerSearchID == "" ) {
                this.worker_searched = null
                this.$router.go(0)
            }
            try {
                this.worker_searched = await this.custom_order_worker_store.getWorkerID(this.workerSearchID)
                this.temp_workers = this.custom_order_worker_store.getCustomOrderWorkers
                this.workers = this.custom_order_worker_store.filterWorkerByID(this.temp_workers,this.workerSearchID)
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