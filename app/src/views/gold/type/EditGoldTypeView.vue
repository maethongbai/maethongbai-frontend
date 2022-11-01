<template>
    <div v-if='user.role == "employee" ||
        user.role == "account" ||
        user.role == "manager"'>
    <div v-if=" gold_type != null" class="mx-3 my-3">
        <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            รายละเอียดประเภททอง
        </h5>
        <label  class="mx-3">รหัสประเภททอง: {{ gold_type.id }}</label>
    </div>
    <div class="my-3">
        <label for="gold_pattern.name" class="mx-3">ชื่อประเภททอง</label>
        <input class="mx-3" type="text" v-model="gold_type.name">
    </div>
    <button @click="saveGoldType()" class="p-2 mx-3 my-3 bg-green-400 border rounded-lg">
    ยืนยันการเปลี่ยนแปลงข้อมูล
    </button>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useGoldTypeStore  } from '@/stores/gold_type.js';

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
            error: null,
            gold_type: {
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
        const url = `/gold_types/${id}`
        try {
            const response = await this.$axios.get(url)
            console.log(response)
            if (response.status === 200 ) {
                this.gold_type = response.data
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
        await this.gold_type_store.fetch()
    },
    methods: {
        async saveGoldType() {
            var gold_type = {
                id: this.gold_type.id,
                name: this.gold_type.name
            }
            try {
                await this.gold_type_store.editGoldType(gold_type.id, gold_type )
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }

}
</script>