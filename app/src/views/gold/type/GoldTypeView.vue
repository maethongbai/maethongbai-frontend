<template>
    <div v-if='user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
        <div class="card-white w-[1200px] text-s1">
            <div class="m-4 mb-0">
                <!-- breadcrumb -->
                <b>หน้าหลักระบบหลังร้าน > ประเภททองทั้งหมด</b>
                <div class="flex flex-row mt-5">
                    <div class="flex flex-row mr-auto">
                        <form @submit.prevent="searchID()">
                            <div class="flex flex-row">
                                <p class="p-2">รหัสประเภท</p>
                                <input class="mx-3 mt-0 text-field w-[200px]" type="text" v-model="goldTypeSearchID" autocomplete="off">
                                <button type="submit" class="red-btn w-[70px] h-[40px]">
                                    ค้นหา
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="ml-auto red-btn w-[150px]">
                        <a v-bind:href="'/gold_type/create'">
                            เพิ่มประเภทใหม่ +
                        </a>
                    </div>
                </div>

            </div>

            <div class="card-gray w-[1044px] mt-4">
                <table class="w-full text-sm w-[1014px]">
                    <thead class="table-head text-left text-base">
                        <tr>
                            <th scope="col" class="p-2 w-[200px] text-center">
                                รหัสประเภททอง
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ชื่อประเภททอง
                            </th>
                            <th scope="col" class="px-6 py-3 ml-auto w-[200px]">
                                แก้ไข
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="gold_type in gold_types" class="table-card" @click="setSearched(gold_type)">
                            <th scope="row" class="text-center">
                                {{ gold_type.id }}
                            </th>
                            <td class="px-6 py-4 pl-10">
                                {{ gold_type.name }}
                            </td>
                            <td class="px-6 py-4">
                                <a v-bind:href="'/gold_type/edit/'+ gold_type.id" >
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
        await this.gold_type_store.fetch()
        this.gold_types = this.gold_type_store.getGoldTypes
    },
    methods: {
        async searchID() {
            this.error = null
            if (this.goldTypeSearchID == null || this.goldTypeSearchID == "") {
                this.gold_type_searched = null
                this.$router.go(0)
            }
            try {
                this.gold_type_searched = await this.gold_type_store.getGoldTypeID(this.goldTypeSearchID)
                this.temp_gold_types = this.gold_type_store.getGoldTypes
                this.gold_types = this.gold_type_store.filterGoldTypeByID(this.temp_gold_types, this.goldTypeSearchID)
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
