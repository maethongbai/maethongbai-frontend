<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-blue-100 dark:text-blue-100">
        <thead class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ลำดับ
                </th>
                <th scope="col" class="px-6 py-3">
                    ชื่อสินค้า
                </th>
                <th scope="col" class="px-6 py-3">
                    จำนวนคงเหลือ
                </th>
                <th scope="col" class="px-6 py-3">
                    พนักงานเจ้าของ
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="gold in golds" class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    {{ gold.id }}
                </th>
                <td class="px-6 py-4">
                    {{ gold.name }}
                </td>
                <td class="px-6 py-4">
                    คงเหลือ
                </td>
                <td class="px-6 py-4">
                    {{ gold.employee_add_stock }}
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useGoldStore } from '@/stores/gold.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_store = useGoldStore()
        return { auth_store, gold_store}
    },
    data() {
        return {
            auth: null,
            user: null,
            golds: null,
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
        
        await this.gold_store.fetch()
        this.golds = this.gold_store.getGolds
        var i = 1;
        while (1 < 30) {
            console.log(this.golds[i].employee_add_stock.nickname)
            i = i+1;           
        }

        // var ind = 0;
        // for (var gold in this.golds) {
        //     console.log(this.golds[ind].employee_add_stock.nickname)
        //     ind += 1
        // }

    }
}

</script>