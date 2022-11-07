<template>
    <div v-if='user.role == "manager"'>
        <div class="pt-8 pb-8 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-4 mb-0">
                    <!-- breadcrumb -->
                    <b>หน้าหลักระบบหลังร้าน > ประเภททองทั้งหมด > แก้ไขประเภททอง > {{ gold_type.id }}</b>
                </div>

                <div class="card-gray w-[554px] mt-4 mx-auto flex flex-col text-base">
                    <div class="flex flex-row">
                        <label for="nextID" class="p-2">รหัสประเภททอง: {{ gold_type.id }}</label>
                    </div>
                    <div class="flex flex-row">
                        <label for="gold_pattern.name" class="p-2">ชื่อประเภททอง: </label>
                        <input class="text-field w-[300px] ml-auto mr-12" type="text" v-model="gold_type.name">
                    </div>
                    <div class="w-[250px] mx-auto">
                        <button @click="saveGoldType()" type="submit" :disabled="disabledButton" class="red-btn w-[282px] m-2 mt-6 mx-auto">
                            บันทึกการแปลี่ยนแปลง
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
    useGoldTypeStore
} from '@/stores/gold_type.js';

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
            if (response.status === 200) {
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
    },
    methods: {
        async saveGoldType() {
            var gold_type = {
                id: this.gold_type.id,
                name: this.gold_type.name
            }
            try {
                await this.gold_type_store.editGoldType(gold_type.id, gold_type)
                this.$router.push("/gold_type/view");
            } catch (error) {
                this.error = error.message
                console.error(error.response.data)
            }
        }
    }

}
</script>
