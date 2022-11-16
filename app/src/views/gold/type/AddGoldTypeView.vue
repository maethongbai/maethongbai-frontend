<template>
    <div v-if='user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-4 mb-0">
                    <!-- breadcrumb -->
                    <b>หน้าหลักระบบหลังร้าน > ประเภททองทั้งหมด > เพิ่มประเภททองใหม่</b>
                </div>

                <div class="card-gray w-[554px] mt-4 mx-auto flex flex-col text-base">
                    <form @submit.prevent="createGoldType()">
                        <div class="flex flex-row">
                            <label for="nextID" class="p-2">รหัสประเภททอง: {{ gold_type.id }}</label>
                        </div>
                        <div class="flex flex-row">
                            <label for="gold_pattern.name" class="p-2">ชื่อประเภททอง: </label>
                            <input required class="text-field w-[300px] ml-auto mr-12" type="text" v-model="gold_type.name">
                        </div>
                        <div class="w-[250px] mx-auto">
                            <button type="submit" :disabled="disabledButton" class="red-btn w-[282px] m-2 mt-6 mx-auto">
                                เพิ่มประเภททองใหม่
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
            error: null,
            gold_type: {
                id: -1,
                name: null
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
                this.$router.push("/gold_type/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }

        await this.gold_type_store.fetch()
        this.gold_type.id = this.gold_type_store.getNextID()
    },
    methods: {
        async createGoldType() {
            try {
                console.log(this.gold_type)
                var gold_type = {
                    name: this.gold_type.name
                }
                await this.gold_type_store.add(gold_type)
                console.table(this.gold_type_store.getGoldTypes)
                this.$router.push("/gold_type/view")
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }
}
</script>
