<template>
    <div v-if="auth_user != null">
        <div class="block my-5">
            <router-link to="/" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">Back</router-link>
        </div>
    
        <div class="block mx-3 my-5">
            <h1 class="text-xl font-semibold">รายการสินค้าที่สั่งซื้อ</h1>
        </div>
    
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            รายการ
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ชื่อสินค้าที่สั่งซื้อ
                        </th>
                        <th scope="col" class="px-6 py-3">
                            สถานะสั่งซื้อ
                        </th>
                        <th scope="col" class="px-6 py-3">
                            สถานะจัดส่ง
                        </th>
                        <th scope="col" class="px-6 py-3">
                            หมายเหตุ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="val in online_sales" class="bg-white border-b hover:bg-gray-50"
                    @click="selectSale(val)">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{val.id}}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{val.gold.name}}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{val.transfer_status}}
                        </th>
                        <th v-if="val.transfer_status == 'ยืนยัน'" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{val.delivery_status}}
                        </th>
                        <th v-else scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            -
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{val.note}}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    
        <div v-if="selected_sale != null" class="py-5">
            <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
                <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    รายละเอียด
                </h5>
                <p class="mx-1 mb-3 font-normal text-xl text-gray-700 ">
                    {{selected_sale.gold.name}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    ประเภท: {{selected_sale.gold.gold_type.name}}
                </p>
                <p v-if="selected_sale.gold.weight != null" class="mx-1 mb-3 font-normal text-gray-700 ">
                    น้ำหนัก: {{selected_sale.gold.weight}}
                </p>
                <p v-else class="mx-1 mb-3 font-normal text-gray-700 ">
                    น้ำหนัก: {{selected_sale.gold.custom_weight.toLocaleString()}} กรัม
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    ลาย: {{selected_sale.gold.gold_pattern.name}}
                </p>
                <p class="mx-1 mb-3 font-normal text-gray-700 ">
                    สถานะสั่งซื้อ: {{selected_sale.transfer_status}}
                </p>
                <p v-if="selected_sale.delivery_status != null" class="mx-1 mb-3 font-normal text-gray-700 ">
                    สถานะจัดส่ง: {{selected_sale.delivery_status}}
                </p>
                <p v-else class="mx-1 mb-3 font-normal text-gray-700 ">
                    สถานะจัดส่ง: -
                </p>
                <p v-if="selected_sale.tracking_number != null" class="mx-1 mb-3 font-normal text-gray-700 ">
                    Tracking number: {{selected_sale.tracking_number}}
                </p>
                <p v-else class="mx-1 mb-3 font-normal text-gray-700 ">
                    Tracking number: -
                </p>
                <p v-if="selected_sale.note != null" class="mx-1 mb-3 font-normal text-gray-700 ">
                    หมายเหตุ: {{selected_sale.note}}
                </p>
                <div>
                    <p class="mx-1 mb-3 font-normal text-gray-700">
                        <img :src="`${selected_sale.gold.image}`" alt="รูปสินค้า" width="200">
                    </p>
                </div>
                <p v-if="selected_sale.gold_sell_price != null" class="mx-1 mb-3 font-normal text-gray-700 ">
                    ราคา: {{selected_sale.gold_sell_price.sell_price.toLocaleString()}} บาท
                </p>
                <p v-else class="mx-1 mb-3 font-normal text-gray-700 ">
                    ราคา: - บาท
                </p>
                <p v-if="selected_sale.sale_date != null" class="mx-1 mb-3 font-normal text-gray-700 ">
                    วันที่ชำระ: {{selected_sale.sale_date}}
                </p>
                <p v-else class="mx-1 mb-3 font-normal text-gray-700 ">
                    วันที่ชำระ: -
                </p>
                <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
                    *โปรดถ่ายคลิปขณะเปิดกล้อง*
                </h5>
                <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
                    *หากสินค้ามีปัญหาติดต่อร้าน*
                </h5>
                <h5 class="mx-6 mb-2 text-lg font-bold tracking-tight text-gray-900">
                    Contacts
                </h5>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import {
        useAuthStore
    } from "@/stores/auth.js";
    import {
        useOnlineSaleStore
    } from "@/stores/onlineSale.js";
    export default {
        setup() {
            const auth_store = useAuthStore();
            const online_sale_store = useOnlineSaleStore();
            return {
                auth_store,
                online_sale_store,
            };
        },
        data() {
            return {
                auth: null,
                auth_user: null,
                online_sales: [],
                selected_sale: null
            };
        },
        watch: {
            auth_store: {
                immediate: true,
                deep: true,
                handler(newValue, oldValue) {
                    this.auth = this.auth_store.getAuth;
                    this.auth_user = JSON.parse(this.auth_store.getUser);
                },
            },
        },
        async mounted() {
            if (this.auth_store.isAuthen) {
                this.auth = this.auth_store.getAuth;
                this.auth_user = JSON.parse(this.auth_store.getUser);
                console.log("authorized " + document.URL);
            } else {
                this.auth = null;
                this.user = null;
                this.$router.push("/login");
            }
    
            await this.online_sale_store.fetch();
            // this.online_sales = this.online_sale_store.getOnlineSales
            this.online_sales = this.online_sale_store.filterByUser(this.auth_user)
        },
        methods: {
            selectSale(sale) {
                this.selected_sale = sale
                console.log(sale)
            }
        }
    };
    </script>
    