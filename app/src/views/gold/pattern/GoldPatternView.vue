<template>
    <div v-if='user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-4 mb-0">
                    <!-- breadcrumb -->
                    <b>หน้าหลักระบบหลังร้าน > ลายทองทั้งหมด</b>
                    <div class="flex flex-row mt-5">
                        <div class="flex flex-row mr-auto">
                            <form @submit.prevent="searchID()">
                                <div class="flex flex-row">
                                    <p class="p-2">รหัสลาย</p>
                                    <input class="mx-3 mt-0 text-field w-[200px]" type="text" v-model="goldPatternSearchID" autocomplete="off">
                                    <button type="submit" class="red-btn w-[70px] h-[40px]">
                                        ค้นหา
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div class="ml-auto red-btn w-[150px]">
                            <a v-bind:href="'/gold_pattern/create'">
                                เพิ่มลายใหม่ +
                            </a>
                        </div>
                    </div>

                </div>

                <div class="card-gray w-[1044px] mt-4">
                    <table class="w-full text-sm w-[1014px]">
                        <thead class="table-head text-left text-base">
                            <tr>
                                <th scope="col" class="p-2 w-[200px] text-center">
                                    รหัสลายทอง
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    ชื่อลายทอง
                                </th>
                                <th scope="col" class="px-6 py-3 ml-auto w-[200px]">
                                    แก้ไข
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="gold_pattern in gold_patterns" class="table-card" @click="setSearched(gold_pattern)">
                            <th scope="row" class="text-center">
                                {{ gold_pattern.id }}
                            </th>
                            <td class="px-6 py-4 pl-10">
                                {{ gold_pattern.name }}
                            </td>
                            <td class="px-6 py-4">
                                <a v-bind:href="'/gold_pattern/edit/'+ gold_pattern.id" >
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
    useGoldPatternStore
} from '@/stores/gold_pattern.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_pattern_store = useGoldPatternStore()
        return {
            auth_store,
            gold_pattern_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            gold_patterns: null,
            goldPatternSearchID: null,
            gold_pattern_searched: null,
            temp_gold_patterns: null,
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
        await this.gold_pattern_store.fetch()
        this.gold_patterns = this.gold_pattern_store.getGoldPatterns
    },
    methods: {
        async searchID() {
            this.error = null
            if (this.goldPatternSearchID == null || this.goldPatternSearchID == "") {
                this.gold_pattern_searched = null
                this.$router.go(0)
            }
            try {
                this.gold_pattern_searched = await this.gold_pattern_store.getGoldPatternID(this.goldPatternSearchID)
                this.temp_gold_patterns = this.gold_pattern_store.getGoldPatterns
                this.gold_patterns = this.gold_pattern_store.filterGoldPatternByID(this.temp_gold_patterns, this.goldPatternSearchID)
            } catch (error) {
                this.error = error.message
            }
        },
        setSearched(gold_pattern) {
            this.gold_pattern_searched = gold_pattern
        }
    }
}
</script>
