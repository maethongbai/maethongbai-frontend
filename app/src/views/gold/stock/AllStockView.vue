<template>
    <div v-if='user.role == "employee" ||
user.role == "account" ||
user.role == "manager"'>
    <div class="inline">
        <form @submit.prevent="searchID()">
            <div class="inline">
                <label>ID</label>
                <input class="mx-3" type="text" v-model="stockSearchID" autocomplete="off">
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
                <th scope="col" class="py-3 px-6">
                    ลำดับ
                </th>
                <th scope="col" class="py-3 px-6">
                    ชื่อสินค้า
                </th>
                <th scope="col" class="py-3 px-6">
                    จำนวนคงเหลือ
                </th>
                <th scope="col" class="py-3 px-6">
                    พนักงานเจ้าของ
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="gold in golds" class="bg-yellow-700 border-b border-blue-400 hover:bg-yellow-500"
             @click="setSearched(gold.id)">
                <th scope="row" class="py-4 px-6 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    {{ gold.id }}
                </th>
                <td class="py-4 px-6">
                    {{ gold.name }}
                </td>
                <td class="py-4 px-6">
                    คงเหลือ
                </td>
                <td class="py-4 px-6" v-if="gold.employee_add_stock != null">{{gold.employee_add_stock.nickname}}</td>
                <td class="py-4 px-6" v-else>-</td>
            </tr>
        </tbody>
    </table>
    <div v-if="stock_searched != null" class="py-5">
        <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>
            <p class="mx-1 mb-3 font-normal text-gray-700 ">
                ลำดับ: {{stock_searched.id}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                ชื่อสินค้า: {{stock_searched.name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                จำนวนคงเหลือ: คงเหลือ
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700" v-if="stock_searched.employee_add_stock != null">
                พนักงานเจ้าของ: {{stock_searched.employee_add_stock.nickname}}
            </p>
        </div>

    </div>

</div>
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
            stock_searched: null,
            stock_id: null,
            stockSearchID: null,
            error: null
        }
    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                console.log(newValue.getAuth)
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
    },
    methods: {
        async searchID() {
            console.log("pin")
            this.error = null
            if (this.stockSearchID == null || this.stockSearchID == "")  {
                console.log("pin1")
                this.stock_searched = null
                this.$router.go(0)
            }
            try {
                this.stock_searched = await this.gold_store.getID(this.stockSearchID)
                this.golds = this.gold_store.getGolds
                this.golds = this.gold_store.filterStockByID(this.golds,this.stockSearchID)
                console.log(this.stock_searched)
            } catch (error) {
                this.error = error.message
            }
    },
    async setSearched(stock_id) {
            this.error = null
            try {
                this.stock_searched = await this.gold_store.getID(stock_id)
                console.log(this.stock_searched)
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
            }
        }
   
}

}

</script>