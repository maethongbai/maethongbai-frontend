<template>
    <div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    <div v-if=" gold_pattern != null" class="mx-3 my-3">
        <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            รายละเอียดลายทอง
        </h5>
        <label  class="mx-3">รหัสลายทอง: {{ gold_pattern.id }}</label>
    </div>
    <div class="my-3">
        <label for="gold_pattern.name" class="mx-3">ชื่อลายทอง</label>
        <input class="mx-3" type="text" v-model="gold_pattern.name">
    </div>
    <button @click="saveGoldPattern()" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
    ยืนยันการเปลี่ยนแปลงข้อมูล
    </button>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useGoldPatternStore  } from '@/stores/gold_pattern.js';

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_pattern_store = useGoldPatternStore()
        return {
            auth_store, gold_pattern_store
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
            if (response.status === 200 ) {
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
            if (this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager") {
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
                await this.gold_pattern_store.editGoldPattern(gold_pattern.id, gold_pattern )
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }

}
</script>