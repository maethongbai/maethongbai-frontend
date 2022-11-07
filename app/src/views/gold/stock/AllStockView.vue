<template>
    <div v-if='user.role == "employee" ||
    user.role == "account" ||
    user.role == "manager"'>
        <div class="pt-2 pb-2 flex items-center justify-center">
            <div class="card-white w-[1200px] text-s1">
                <div class="m-2"><b>หน้าหลักระบบหลังร้าน > สต็อกสินค้าทั้งหมด</b></div>
                <div class="card-gray w-[1044px] mb-4">
                    <div class="grid grid-cols-2">
                        <div class="flex flex-col">
                            <p class="pt-2 pb-2 text-xl"><b>สต็อกสินค้าทั้งหมด</b></p>
                            <div class="flex flex-col gap-2">
                                <div class="flex flex-row pl-2">
                                    <label class="p-2">ประเภท</label>
                                    <select class="select-box w-[300px] ml-auto mr-6" v-model="search_inputs.gold_type">
                                        <option v-for="type in select.gold_types" :value="type.name">{{ type.name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="flex flex-row pl-2">
                                    <label class="p-2">น้ำหนัก</label>
                                    <select class="select-box w-[300px] ml-auto mr-6" v-model="search_inputs.weight">
                                        <option v-for="weight in select.weights" :value="weight">{{ weight }}
                                        </option>
                                    </select>
                                </div>

                                <div class="flex flex-row pl-2">
                                    <div class="p-2" v-if="search_inputs.weight == 'ตามชั่ง'">
                                        <label class="p-2">น้ำหนักตามชั่ง</label>
                                        <input class="text-field w-[300px] ml-auto mr-6" type="text"
                                            v-model="search_inputs.custom_weight" autocomplete="off">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-2 pt-11">
                            <div class="flex flex-row pl-2">
                                <label class="p-2">ลาย</label>
                                <select class="select-box w-[300px] ml-auto mr-6" v-model="search_inputs.gold_pattern">
                                    <option v-for="type in select.gold_patterns" :value="type.name">{{ type.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="flex flex-row pl-2">
                                <label class="p-2">ประเภทลายทอง</label>
                                <div class="mx-8 mt-2">
                                    <input type="radio" id="-" value="-" v-model="search_inputs.gold_pattern_type">
                                    <label class="p-2">-</label>
                                    <input type="radio" id="ทองตัน" value="ทองตัน"
                                        v-model="search_inputs.gold_pattern_type">
                                    <label class="p-2">ตัน</label>
                                    <input type="radio" id="ทองโป่ง" value="ทองโป่ง"
                                        v-model="search_inputs.gold_pattern_type">
                                    <label class="p-2">โป่ง</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row">
                    <div class="px-64">
                        <button @click="search()" type="submit"
                            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Search
                        </button>
                    </div>
                    <button @click="resetSearch()" type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Reset
                    </button>

                </div>
                <div class="card-gray w-full mt-4 center">
                    <table class="w-full text-base">
                        <thead class="table-head text-left text-base">
                            <tr>
                                <th scope="col" class="p-2 w-[200px] text-center">
                                    ลำดับ
                                </th>
                                <th scope="col" class="px-10 py-3">
                                    ชื่อสินค้า
                                </th>
                                <th scope="col" class="px-6 py-3 ml-auto w-[200px]">
                                    จำนวนคงเหลือ
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
                                <td class="px-6 py-4 pl-10">
                                    {{ item.count }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            this.auth = this.auth_store.getAuth
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