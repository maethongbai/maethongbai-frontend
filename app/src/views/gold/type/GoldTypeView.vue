<template>
    <div v-if='user.role == "employee" ||
               user.role == "account" ||
               user.role == "manager"'>
    <div class="inline">
        <div class="text-3xl">ประเภททองทั้งหมด</div>
        <form @submit.prevent="searchID()">
            <div class="inline">
                <label>ID</label>
                <input class="mx-3" type="text" v-model="goldTypeSearchID" autocomplete="off">
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
                    รหัสประเภททอง
                </th>
                <th scope="col" class="px-6 py-3">
                    ชื่อประเภททอง
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="gold_type in gold_types" class="bg-yellow-700 border-b border-blue-400 hover:bg-yellow-500"
            @click="setSearched(gold_type)">
                <th scope="row" class="py-4 px-6 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    {{ gold_type.id }}
                </th>
                <td class="px-6 py-4">
                    {{ gold_type.name }}
                </td>
            </tr>
        </tbody>
    </table>
    <div v-if="gold_type_searched != null" class="py-5">
        <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                รหัสประเภททอง: {{gold_type_searched.id}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                ชื่อประเภททอง: {{gold_type_searched.name}}
            </p>
        </div>

    </div>
</div>
</div>

    
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useGoldTypeStore } from '@/stores/gold_type.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_type_store = useGoldTypeStore()
        return {
            auth_store, gold_type_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            gold_types: null,
            goldTypeSearchID: null,
            gold_type_searched: null,
            temp_gold_types: null,
            error: null

        }
    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                
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
        await this.gold_type_store.fetch()
        this.gold_types = this.gold_type_store.getGoldTypes
    },
    methods: {
        async searchID() {
            this.error = null
            if (this.goldTypeSearchID == null || this.goldTypeSearchID == "" ) {
                this.gold_type_searched = null
                this.$router.go(0)
            }
            try {
                this.gold_type_searched = await this.gold_type_store.getGoldTypeID(this.goldTypeSearchID)
                this.temp_gold_types = this.gold_type_store.getGoldTypes
                this.gold_types = this.gold_type_store.filterGoldTypeByID(this.temp_gold_types,this.goldTypeSearchID)
            } catch (error) {
                this.error = error.message
            }
        },
        setSearched(gold_type) {
            this.gold_type_searched = gold_type
        }  
    }
}

</script>