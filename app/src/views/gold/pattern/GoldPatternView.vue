<template>
<div v-if='user.role == "manager"'>
    <div class="block my-5">
        <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
    </div>
    <div class="inline">
        <div class="text-3xl">ลายทองทั้งหมด</div>
        <form @submit.prevent="searchID()">
            <div class="inline">
                <label>ID</label>
                <input class="mx-3" type="text" v-model="goldPatternSearchID" autocomplete="off">
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
                        รหัสลายทอง
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อลายทอง
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="gold_pattern in gold_patterns" class="bg-yellow-700 border-b border-blue-400 hover:bg-yellow-500" @click="setSearched(gold_pattern)">
                    <th scope="row" class="py-4 px-6 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                        {{ gold_pattern.id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ gold_pattern.name }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="gold_pattern_searched != null" class="py-5">
            <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
                <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    รายละเอียด
                </h5>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    รหัสลายทอง: {{gold_pattern_searched.id}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700">
                    ชื่อลายทอง: {{gold_pattern_searched.name}}
                </p>
                <div v-if="user.role == 'manager'" class="py-3">
                    <a v-bind:href="'/gold_pattern/edit/'+gold_pattern_searched.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        แก้ไข
                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </div>
            </div>

        </div>
        <div v-if="user.role == 'manager'" class="py-3">
            <a v-bind:href="'/gold_pattern/create'" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                เพิ่ม
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </a>
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
