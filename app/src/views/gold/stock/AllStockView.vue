<template>
    <div v-if='user.role == "employee" ||
               user.role == "account" ||
               user.role == "manager"'>
    <div class="mx-3 my-5">
        <div class="text-3xl">สต็อกสินค้าทั้งหมด</div>
        <form @submit.prevent="search()">
            <div class="my-3">
                <label>น้ำหนัก</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5"
                v-model="search_inputs.weight">
                    <option v-for="weight in select.weights" :value="weight">{{ weight }}</option>
                </select>
            </div>
            <div class="my-3" v-if="search_inputs.weight == 'ตามชั่ง'">
                <label>น้ำหนักตามชั่ง</label>
                <input class="mx-3" type="text" v-model="search_inputs.custom_weight" autocomplete="off">
            </div>

            <div class="my-3">
                <label>ประเภท</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5"
                v-model="search_inputs.gold_type">
                    <option v-for="type in select.gold_types" :value="type.name">{{ type.name }}</option>
                </select>
            </div>

            <div class="my-3">
                <label>ลาย</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5"
                v-model="search_inputs.gold_pattern">
                    <option v-for="type in select.gold_patterns" :value="type.name">{{ type.name }}</option>
                </select>
            </div>

            <div class="my-3">
                <label class="mr-3">ประเภทลายทอง</label>
                <input type="radio" id="-" value="-" v-model="search_inputs.gold_pattern_type">
                <label class="mr-3 ml-1">-</label>
                <input type="radio" id="ทองตัน" value="ทองตัน" v-model="search_inputs.gold_pattern_type">
                <label class="mr-3 ml-1">ตัน</label>
                <input type="radio" id="ทองโป่ง" value="ทองโป่ง" v-model="search_inputs.gold_pattern_type">
                <label class="mr-3 ml-1">โป่ง</label>
            </div>

            <button type="submit" class="inline p-2 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
        <form @submit.prevent="resetSearch()">
            <button type="submit" class="inline p-2 bg-green-400 border rounded-lg">
                Reset
            </button>
        </form>
    </div>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
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
                <!-- <th scope="col" class="px-6 py-3">
                    พนักงานเจ้าของ
                </th> -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in list" class="bg-yellow-700 border-b border-blue-400 hover:bg-yellow-500"
             @click="setSearched(item)">
                <th scope="row" class="py-4 px-6 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    {{ item.id }}
                </th>
                <td class="px-6 py-4">
                    {{ item.gold.name }}
                </td>
                <td class="px-6 py-4">
                    {{ item.count}}
                </td>
                <!-- <td class="py-4 px-6" v-if="item.gold.employee_add_stock != null">{{item.gold.employee_add_stock.nickname}}</td>
                <td class="py-4 px-6" v-else>-</td> -->
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
                ชื่อสินค้า: {{stock_searched.gold.name}}
            </p>
            <p class="mx-1 mb-3 font-normal text-gray-700">
                จำนวนคงเหลือ: {{ stock_searched.count }}
            </p>
            <!-- <p class="mx-1 mb-3 font-normal text-gray-700" v-if="stock_searched.employee_add_stock != null">
                พนักงานเจ้าของ: {{stock_searched.gold.employee_add_stock.nickname}}
            </p> -->
        </div>
    </div>
</div>
</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useGoldStore } from '@/stores/gold.js'
import {
    useGoldTypeStore
} from '@/stores/gold_type.js'
import {
    useGoldPatternStore
} from '@/stores/gold_pattern.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_store = useGoldStore()
        const gold_type_store = useGoldTypeStore()
        const gold_pattern_store = useGoldPatternStore()
        return { 
            auth_store,
            gold_store,
            gold_type_store,
            gold_pattern_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            golds: null,
            stock_searched: null,
            stockSearchID: null,
            error: null,
            list: null,
            temp_list: null,
            select: {
                weights: [
                    "-",
                    "ครึ่งสลึง",
                    "1 สลึง",
                    "2 สลึง",
                    "3 สลึง",
                    "6 สลึง",
                    "1 บาท",
                    "2 บาท",
                    "3 บาท",
                    "4 บาท",
                    "5 บาท",
                    "6 บาท",
                    "7 บาท",
                    "8 บาท",
                    "9 บาท",
                    "10 บาท",
                    "15 บาท",
                    "20 บาท",
                    "ตามชั่ง"
                ],
                gold_types: [
                    {
                        name: "-"
                    }
                ],
                gold_patterns: [
                    {
                        name: "-"
                    }
                ]
            },
            search_inputs: { // string and/or int
                weight: "-",
                custom_weight: null,
                gold_type: "-",
                gold_pattern: "-",
                gold_pattern_type: "-"
            },
            search_inputs_object: { // string and/or objects from api
                weight: null,
                custom_weight: null,
                gold_type: null,
                gold_pattern: null,
                gold_pattern_type: null
            },

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
        },
        // search_inputs: {
        //     immediate: true,
        //     deep: true,
        //     handler(newValue, oldValue) {
        //         console.log(newValue.gold_pattern)
        //     }
        // }
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
        await this.gold_type_store.fetch()
        await this.gold_pattern_store.fetch()

        var gold_types = this.gold_type_store.getGoldTypes
        gold_types.forEach(element => {
            this.select.gold_types.push(element)
        });

        var gold_patterns = this.gold_pattern_store.getGoldPatterns
        gold_patterns.forEach(element => {
            this.select.gold_patterns.push(element)
        });

        this.gold_store.fetchLeftover()
        this.list = this.gold_store.countLeftover()
        // console.log(this.list)
        
    },
    methods: {
        search() {
            this.error = null
            try {
                var temp_list = this.gold_store.filterSellable() // find sellable gold

                if (this.search_inputs.weight == "ตามชั่ง") {
                    this.search_inputs_object.weight = null
                    this.search_inputs_object.custom_weight = this.search_inputs.custom_weight
                } else if (this.search_inputs.weight == "-") {
                    this.search_inputs_object.weight = null
                    this.search_inputs_object.custom_weight = null
                } else {
                    this.search_inputs_object.weight = this.search_inputs.weight  
                    this.search_inputs_object.custom_weight = null
                }

                if (this.search_inputs.gold_type != "-") {
                    this.search_inputs_object.gold_type = this.gold_type_store.findByName(this.search_inputs.gold_type)
                } else {
                    this.search_inputs_object.gold_type = null
                }

                if (this.search_inputs.gold_pattern != "-") {
                    this.search_inputs_object.gold_pattern = this.gold_pattern_store.findByName(this.search_inputs.gold_pattern)
                } else {
                    this.search_inputs_object.gold_pattern = null
                }

                if (this.search_inputs.gold_pattern_type != "-") {
                    this.search_inputs_object.gold_pattern_type = this.search_inputs.gold_pattern_type
                } else {
                    this.search_inputs_object.gold_pattern_type = null
                }

                temp_list = this.gold_store.filterStock(temp_list, this.search_inputs_object)
                this.list = this.gold_store.countStock(temp_list)

            } catch (error) {
                this.error = error.message
            }
    },
    setSearched(item) {
            this.stock_searched = item
    },
    resetSearch() {
        this.search_inputs.weight = "-"
        this.search_inputs.custom_weight = null
        this.search_inputs.gold_type = "-"
        this.search_inputs.gold_pattern = "-"
        this.search_inputs.gold_pattern_type = "-"

        this.gold_store.fetchLeftover()
        this.list = this.gold_store.countLeftover()
    }
   
}

}

</script>