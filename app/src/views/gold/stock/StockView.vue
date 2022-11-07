<template>
<div v-if='user.role == "employee" ||
               user.role == "account" ||
               user.role == "manager"'>
    <div class="inline-flex text-2xl font-medium text-gray-900 dark:text-white mt-6 mx-72">สถานะทองที่ถูกเพิ่ม</div>
    <a v-bind:href="'/stock/create'" class="inline-flex items-center ml-96 px-3 py-2 text-sm font-semibold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            เพิ่มทองในระบบ
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </a>
    <div class="pt-2 pb-2 flex items-center justify-center">
        <div class="card-gray w-[1200px] center ">
            <table class="w-full text-base w-[1190px]">
                <thead class="table-head text-left text-base">
                    <tr>
                        <th scope="col" class="p-2 w-[200px] text-center">
                            ลำดับ
                        </th>
                        <th scope="col" class="px-10 py-3">
                            ชื่อสินค้า
                        </th>
                        <th scope="col" class="px-10 py-3">
                            พนักงานที่ทำรายการ
                        </th>
                        <th scope="col" class="px-10 py-3">
                            จำนวนคงเหลือ
                        </th>
                        <th scope="col" class="px-6 py-3 ml-auto w-[200px]">
                            แก้ไข
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" class="table-card" @click="setSearched(item)">
                        <th scope="row" class="text-center">
                            {{ item.id }}
                        </th>
                        <td class="px-6 py-4 pl-10">
                            {{ item.gold.name }}
                        </td>
                        <td class="px-6 py-4 pl-10" v-if="item.gold.employee_add_stock != null">
                            {{item.gold.employee_add_stock.nickname}}
                        </td>
                        <td class="py-4 px-6 pl-10" v-else>-</td>
                        <td class="px-6 py-4 pl-10 font-bold text-blue-600" v-if="item.gold.stock_approval_status == 'รออนุมัติ'">
                            {{ item.gold.stock_approval_status}}
                        </td>
                        <td class="px-6 py-4 pl-10 font-bold text-red-600" v-else>
                            {{ item.gold.stock_approval_status}}
                        </td>
                        <td class="px-6 py-4 pl-10">
                            <a v-bind:href="'/stock/edit/'+ item.gold.id" >
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
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useGoldStore
} from '@/stores/gold.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_store = useGoldStore()
        return {
            auth_store,
            gold_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            list: null,
            error: null,
            searched_item: null
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
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager") {
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
        this.list = this.gold_store.countUnsellable()
        console.log(this.list)

    },
    methods: {
        setSearched(item) {
            this.searched_item = item
        }
    }
}
</script>
