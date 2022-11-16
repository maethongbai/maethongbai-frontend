<template>
<div>
    <h1 class="text-3xl">สรุปทองที่ขาย</h1>
    <div class="">
        <Datepicker v-model="chosen_date"></Datepicker>
    </div>
</div>

<div class="grid grid-cols-2">
    <div>
        <h2>รายการขายหน้าร้าน</h2>
        <table class="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead>
                <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th scope="col" class="px-6 py-3"> ลำดับ </th>
                    <th scope="col" class="px-6 py-3"> ชื่อลูกค้า </th>
                    <th scope="col" class="px-6 py-3"> ชื่อสินค้า </th>
                    <th scope="col" class="px-6 py-3"> สถานะโอน </th>
                    <th scope="col" class="px-6 py-3"> พนักงาน </th>
                    <th scope="col" class="px-6 py-3"> หมายเหตุ </th>
                </tr>
            </thead>

            <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" v-for="onsiteSale in onsiteSales_confirm" @click="setSearched(onsiteSale.id,'onsite')">
                <tr>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{onsiteSale.id}}</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{onsiteSale.user.first_name}}</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{onsiteSale.gold.name}}</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {{onsiteSale.transfer_status}}</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{onsiteSale.employee.nickname}}</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{onsiteSale.transfer_note}}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div>
        <h3>รายการสั่งซื้อออนไลน์</h3>
        <table class="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead>
                <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th scope="col" class="px-6 py-3"> ลำดับ </th>
                    <th scope="col" class="px-6 py-3"> ชื่อลูกค้า </th>
                    <th scope="col" class="px-6 py-3"> ชื่อสินค้า </th>
                    <th scope="col" class="px-6 py-3"> สถานะโอน </th>
                    <th scope="col" class="px-6 py-3"> พนักงาน </th>
                    <th scope="col" class="px-6 py-3"> หมายเหตุ </th>
                </tr>
            </thead>

            <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" v-for="onlineSale in onlineSales_not_delivery" @click="setSearched(onlineSale.id,'online')">
                <tr>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{onlineSale.id}}</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{onlineSale.user.first_name}}</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{onlineSale.gold.name}}</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {{onlineSale.transfer_status}}</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" v-if="onlineSale.tracking_id_employee != null">{{onlineSale.tracking_id_employee.nickname}}</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" v-else>-</td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{onlineSale.transfer_note}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="mt-5 grid grid-cols-2">
    <div v-if="sale_search != null" class="border">
        <p class="pl-3 text-lg font-semibold text-left text-gray-900 bg-white ">รายละเอียดรายการที่เลือก</p>
        <div class="pl-5">
            <div v-if="onsite_SearchID != null || onsiteSale_search != null">
                การขายหน้าร้าน
                <p> เลขที่บิลขายหน้าร้าน : {{sale_search.id}}</p>
                <p> รหัสสินค้า : {{sale_search.gold.id}}</p>
                <p> ชื่อสินค้า : {{sale_search.gold.name}}</p>
                <p> วันที่ขาย : {{sale_search.sale_date}}</p>
                <p> ราคาทอง ณ เวลาที่ขาย : {{sale_search.gold_sell_price.sell_price.toLocaleString()}} บาท</p>
                <p> ราคาที่ขายสืนค้า(ราคาสุทธิ) : {{sale_search.gold_price.toLocaleString()}} บาท</p>
                <p> ช่องทางการชำระเงิน : {{sale_search.payment_method}} </p>

                <div v-if="sale_search.payment_method == 'credit_card'">
                    <p> ประเภทบัตรเครดิต : {{sale_search.credit_card_type}}</p>
                    <p> ธนาคาร : {{sale_search.bank_name}}</p>
                </div>

                <div v-if="sale_search.payment_method == 'transfer'">
                    <p> รูปสลิป :</p>
                    <img :src="`${sale_search.slip_image}`" width="200">
                    <p> สถานะการโอน : {{sale_search.transfer_status}}</p>
                    <p> หมายเหตุการโอน : {{sale_search.transfer_note}}</p>
                </div>

                <div v-if="sale_search.payment_method == 'cash'">
                    <p> ยอดเงินที่ลูกค้าชำระ : {{sale_search.paid_amount.toLocaleString()}} บาท</p>
                    <p> ยอดเงินทอน : {{sale_search.paid_change.toLocaleString()}} บาท</p>
                </div>

                <p v-if="is_switch_gold == false"> ไม่เป็นทองเปลี่ยน </p>
                <div v-if="is_switch_gold == true">
                    <p> เป็นทองที่เปลี่ยน </p>
                    <p> เลขที่บิลรับซื้อ : {{sale_search.redemption.id}} </p>
                </div>
                <p> พนักงานที่ทำรายการ : {{sale_search.employee.nickname}}</p>
                <p> ลูกค้า : {{sale_search.user.username}}</p>
            </div>

            <div v-else>
                การขายออนไลน์
                <p> เลขที่บิลขายออนไลน์ : {{sale_search.id}}</p>
                <p> รหัสสินค้า : {{sale_search.gold.id}}</p>
                <p> ชื่อสินค้า : {{sale_search.gold.name}}</p>
                <p> จำนวนสินค้าที่ซื้อ : {{sale_search.amount}} ชิ้น</p>
                <p> วันที่ขาย : {{sale_search.sale_date}}</p>
                <p> รูปสลิป :</p>
                <img :src="`${sale_search.slip_image}`" width="200">
                <p> ราคาทอง ณ เวลาที่ขาย : {{sale_search.gold_sell_price.sell_price.toLocaleString()}} บาท</p>
                <p> ราคาที่ขายสืนค้า(ราคาสุทธิ) : {{sale_search.gold_price.toLocaleString()}} บาท</p>
                <p> สถานะการโอน : {{sale_search.transfer_status}}</p>
                <p> หมายเหตุการโอน : {{sale_search.transfer_note}}</p>
                <p v-if="sale_search.delivery_status != null"> สถานะส่งของ : {{sale_search.delivery_status}}</p>
                <p v-else> สถานะส่งของ : - </p>
                <p v-if="sale_search.tracking_number != null"> เลข tracking : {{sale_search.tracking_number}}</p>
                <p v-else> เลข tracking : - </p>
                <p v-if="sale_search.tracking_id_employee != null"> พนักงานส่งของ : {{sale_search.tracking_id_employee.nickname}}</p>
                <p v-else> พนักงานส่งของ : - </p>
                <p v-if="sale_search.delivery_status_employee != null"> พนักงานเปลี่ยนสถานะจัดส่ง : {{sale_search.delivery_status_employee.nickname}}</p>
                <p v-else> พนักงานเปลี่ยนสถานะจัดส่ง : - </p>
                <p v-if="sale_search.note != null"> note(ภายในร้าน) : {{sale_search.note}}</p>
                <p v-else> note(ภายในร้าน) : - </p>
                <p> ลูกค้าที่ทำรายการ : {{sale_search.user.username}}</p>
            </div>
        </div>
    </div>
    <div v-else class="border">
        <p class="pl-3 text-lg font-semibold text-left text-gray-900 bg-white ">รายละเอียดรายการที่เลือก</p>
        <p class="pl-5">(ยังไม่ได้เลือก)</p>
    </div>

    <!-- <div class="border">
        <p class="pl-3 text-lg font-semibold text-left text-gray-900 bg-white ">สรุปสินค้าที่ขาย</p>
        <div class="pl-5">
            <table class="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead>
                    <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></tr>
                    <th scope="col" class="px-6 py-3"> ลำดับ </th>
                    <th scope="col" class="px-6 py-3"> ชื่อรายการ </th>
                    <th scope="col" class="px-6 py-3"> จำนวน </th>
                    <th scope="col" class="px-6 py-3"> ราคาที่ขาย </th>
                </thead>
                <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" v-for="item in selled_gold">
                    <tr>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{item.id}}</td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{item.gold.name}}</td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{item.count}}</td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{item.sale_amount}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="pl-3 text-lg font-semibold text-left text-gray-900 bg-white ">
            สรุปรายได้จากทองในวัน: {{total_sale_amount}} บาท
        </p> 
    </div> -->
</div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/auth.js'
import {
    useOnsiteSaleStore
} from '@/stores/onsiteSale.js'
import {
    useOnlineSaleStore
} from '@/stores/onlineSale.js'
import {
    useGoldStore
} from '@/stores/gold.js'
import {
    useAllSaleStore
} from '@/stores/all_sale.js'
import moment from 'moment'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    setup() {
        const auth_store = useAuthStore();
        const onsiteSale_store = useOnsiteSaleStore();
        const onlineSale_store = useOnlineSaleStore();
        const gold_store = useGoldStore();
        const allSale_store = useAllSaleStore();
        return {
            auth_store,
            onsiteSale_store,
            onlineSale_store,
            gold_store,
            allSale_store
        };
    },
    components: {
        Datepicker
    },
    data() {
        return {
            auth: null,
            user: null,
            onsiteSales: null,
            onlineSales: null,
            onsiteSale_search: null,
            onsiteSales_confirm: null,

            onlineSale_search: null,
            onlineSales_delivery: null,
            onlineSales_not_delivery: null,

            tracking_employee: null,
            error: null,
            disabledSearchButton: false,
            onsite_SearchID: null,
            online_SearchID: null,
            sale_search: null,

            selled_gold: null,
            chosen_date: moment(),
            total_sale_amount: 0
        };
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth;
            this.user = JSON.parse(this.auth_store.getUser);
            if (this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager") {
                console.log("authorized " + document.URL);
            } else {
                this.$router.push("/");
            }
        } else {
            this.auth = null;
            this.user = null;
            this.$router.push("/login");
        }

        await this.onsiteSale_store.fetch()
        await this.onlineSale_store.fetch()
        await this.gold_store.fetch()
        await this.allSale_store.fetch()

        this.filterDate(moment())

    },
    watch: {
        auth_store: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                this.auth = this.auth_store.getAuth
                this.user = JSON.parse(this.auth_store.getUser)
            }
        },
        chosen_date: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                this.filterDate(newValue)
            }
        }
    },
    methods: {
        async onsiteSearchID() {
            this.error = null
            this.disabledSearchButton = true
            if (this.onsite_SearchID == null ||
                this.onsite_SearchID == "") {
                this.onsiteSale_search = null
                this.$router.go(0)
            }
            try {
                this.onsiteSale_search = await this.onsiteSale_store.getID(this.onsite_SearchID)
                this.onsiteSales_checking = this.onsiteSale_store.filterChecking
                this.onsiteSales_problem = this.onsiteSale_store.filterProblem
                this.onsiteSales_confirm = this.onsiteSale_store.filterConfirm
                this.onsiteSales_checking = this.onsiteSale_store.filterOnsiteByID(this.onsiteSales_checking, this.onsite_SearchID)
                this.onsiteSales_problem = this.onsiteSale_store.filterOnsiteByID(this.onsiteSales_problem, this.onsite_SearchID)
                this.onsiteSales_confirm = this.onsiteSale_store.filterOnsiteByID(this.onsiteSales_confirm, this.onsite_SearchID)
                this.sale_search = this.onsiteSale_search
                this.online_SearchID = null
                this.onlineSale_search = null

            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false

            }
        },
        async onlineSearchID() {
            this.error = null
            this.disabledSearchButton = true
            if (this.online_SearchID == null ||
                this.online_SearchID == "") {
                this.onlineSale_search = null
                this.$router.go(0)
            }
            try {
                this.onlineSale_search = await this.onlineSale_store.getID(this.online_SearchID)
                this.onlineSales_delivery = this.onlineSale_store.filterDelivery
                this.onlineSales_not_delivery = this.onlineSale_store.filterNotDelivery
                this.onlineSales_delivery = this.onlineSale_store.filterOnlineByID(this.onlineSales_delivery, this.online_SearchID)
                this.onlineSales_not_delivery = this.onlineSale_store.filterOnlineByID(this.onlineSales_not_delivery, this.online_SearchID)
                this.sale_search = this.onlineSale_search
                this.onsite_SearchID = null
                this.onsiteSale_search = null
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false

            }
        },
        async setSearched(sale_id, check) {
            this.error = null
            try {
                console.log(this.onsiteSale_store.getID(sale_id))

                if (check == 'online') {
                    console.log('online')
                    this.onlineSale_search = await this.onlineSale_store.getID(sale_id)
                    this.sale_search = this.onlineSale_search
                    this.onsiteSale_search = null
                } else {
                    console.log('onsite')
                    this.onsiteSale_search = await this.onsiteSale_store.getID(sale_id)
                    this.sale_search = this.onsiteSale_search
                    this.onlineSale_search = null
                }
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
            }
        },
        filterDate(date_) {
            var date = new Date(date_).toLocaleDateString().split("/")
            var year = String(date[2]).padStart(4, '0')
            var day = String(date[1]).padStart(2, '0')
            var month = String(date[0]).padStart(2, '0')
            var formatted_date = year + "-" + month + "-" + day
            console.log(formatted_date)
            this.onsiteSales = this.onsiteSale_store.getOnsiteSales
            this.onsiteSales_confirm = this.onsiteSale_store.filterConfirm
            this.onlineSales_not_delivery = this.onlineSale_store.getAcceptFromDate(new Date(formatted_date))
            this.onsiteSales_confirm = this.onsiteSale_store.getAcceptFromDate(new Date(formatted_date))

            this.allSale_store.getGoldFromSales(new Date(formatted_date))
            this.selled_gold = this.allSale_store.countSoldGold()

            var total_sale_amount = 0
            this.selled_gold.forEach(element => {
                total_sale_amount += element.sale_amount
            });
            console.log(total_sale_amount)
            this.total_sale_amount = total_sale_amount
        }

    }
}
</script>
