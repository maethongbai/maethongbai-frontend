<template>
        <div v-if='user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-4 mb-0">
                    <!-- breadcrumb -->
                    <b>หน้าหลักระบบหลังร้าน > ประเภททองทั้งหมด > แก้ไขลายทอง > {{ gold_pattern.id }} </b>
                </div>

                <div class="card-gray w-[554px] mt-4 mx-auto flex flex-col text-base">
                    <div class="flex flex-row">
                        <label for="nextID" class="p-2">รหัสลายทอง: {{ gold_pattern.id }}</label>
                    </div>
                    <div class="flex flex-row">
                        <label for="gold_pattern.name" class="p-2">ชื่อลายทอง</label>
                        <input required class="text-field w-[350px] ml-auto mr-12" type="text" v-model="gold_pattern.name">
                    </div>
                    <div class="w-[250px] mx-auto">
                        <button @click="saveGoldPattern()" type="submit" :disabled="disabledButton" class="red-btn w-[282px] m-2 mt-6 mx-auto">
                            บันทึกรายการ
                        </button>
                    </div>
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
} from '@/stores/gold_pattern.js';

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
            error: null,
            gold_pattern: {
                name: null
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
        const url = `/gold_patterns/${id}`
        try {
            const response = await this.$axios.get(url)
            console.log(response)
            if (response.status === 200) {
                this.gold_pattern = response.data

            }

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
                this.$router.push("/gold_pattern/view");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.gold_pattern_store.fetch()
    },
    methods: {
        async saveGoldPattern() {
            var gold_pattern = {
                id: this.gold_pattern.id,
                name: this.gold_pattern.name
            }
            try {
                await this.gold_pattern_store.editGoldPattern(gold_pattern.id, gold_pattern)
                console.table(this.gold_pattern_store.getGoldPatterns)
                this.$router.push("/gold_pattern/view")
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }

}
</script>
