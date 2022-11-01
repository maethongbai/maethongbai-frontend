<template>
    <div v-if='user.role == "employee" ||
user.role == "account" ||
user.role == "manager"'>
    <br>
    <br>
    <h1 class="text-3xl">รายการขายหน้าร้าน</h1>
    <br>
    <div>
        <div>
            ประเภทในการชำระเงินของลูกค้า
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="onsiteSale_payment_method">
                        <option disabled value="">กรุณาเลือกประเภทการชำระเงินของลูกค้า</option>
                        <option value="โอน">โอน</option>
                        <option value="เงินสด">เงินสด</option>
                        <option value="บัตรเครดิต">บัตรเครดิต</option>
            </select>
        </div>
        <br>
        <div v-if="onsiteSale_payment_method == 'โอน'">
            <form  @submit.prevent="onsiteSearchID()">
           <div class="inline">
            <label>ID</label>
            <input id="onsite_SearchID" class="mx-3" type="text" v-model="onsite_SearchID" autocomplete="off">
           </div>

           <button type="submit" class="inline p-1 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
        <br>
            <p>รายการขายหน้าร้านที่รอตรวจสอบการโอน</p>
    <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> สถานะโอน </th>
                <th class="border border-green-700"> พนักงาน </th>
                <th class="border border-green-700"> หมายเหตุ </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700 hover:bg-green-100 dark:hover:bg-gray-600" v-for="onsiteSale in onsiteSales_checking" @click="setSearched(onsiteSale.id,'onsite')">
            <tr v-if="onsiteSale.payment_method == 'transfer'">
                <td class="border border-green-700">{{onsiteSale.id}}</td>
                <td class="border border-green-700">{{onsiteSale.user.first_name}}</td>
                <td class="border border-green-700">{{onsiteSale.gold.name}}</td>
                <td class="border border-green-700"> {{onsiteSale.transfer_status}}</td>
                <td class="border border-green-700">{{onsiteSale.employee.nickname}}</td>
                <td class="border border-green-700">{{onsiteSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>
    <p>รายการขายหน้าร้านที่ยืนยันการโอน</p>
    <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> สถานะโอน </th>
                <th class="border border-green-700"> พนักงาน </th>
                <th class="border border-green-700"> หมายเหตุ </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700  hover:bg-green-100 dark:hover:bg-gray-600" v-for="onsiteSale in onsiteSales_confirm" @click="setSearched(onsiteSale.id,'onsite')">
            <tr v-if="onsiteSale.payment_method == 'transfer'">
                <td class="border border-green-700">{{onsiteSale.id}}</td>
                <td class="border border-green-700">{{onsiteSale.user.first_name}}</td>
                <td class="border border-green-700">{{onsiteSale.gold.name}}</td>
                <td class="border border-green-700"> {{onsiteSale.transfer_status}}</td>
                <td class="border border-green-700">{{onsiteSale.employee.nickname}}</td>
                <td class="border border-green-700">{{onsiteSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>
    <p>รายการขายหน้าร้านที่การโอนมีปัญหา</p>
    <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> สถานะโอน </th>
                <th class="border border-green-700"> พนักงาน </th>
                <th class="border border-green-700"> หมายเหตุ </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700  hover:bg-green-100 dark:hover:bg-gray-600" v-for="onsiteSale in onsiteSales" @click="setSearched(onsiteSale.id,'onsite')">
            <tr v-if="onsiteSale.payment_method == 'transfer' && onsiteSale.transfer_status == 'มีปัญหา'">
                <td class="border border-green-700">{{onsiteSale.id}}</td>
                <td class="border border-green-700">{{onsiteSale.user.first_name}}</td>
                <td class="border border-green-700">{{onsiteSale.gold.name}}</td>
                <td class="border border-green-700"> {{onsiteSale.transfer_status}}</td>
                <td class="border border-green-700">{{onsiteSale.employee.nickname}}</td>
                <td class="border border-green-700">{{onsiteSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>

        </div>
    </div>

    <div v-if="onsiteSale_payment_method == 'เงินสด'">
        <form  @submit.prevent="onsiteSearchID()">
           <div class="inline">
            <label>ID</label>
            <input id="onsite_SearchID" class="mx-3" type="text" v-model="onsite_SearchID" autocomplete="off">
           </div>

           <button type="submit" class="inline p-1 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
        <br>
        <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> ราคาสินค้า </th>
                <th class="border border-green-700"> พนักงาน </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700  hover:bg-green-100 dark:hover:bg-gray-600" v-for="onsiteSale in onsiteSales" @click="setSearched(onsiteSale.id,'onsite')">
            <tr v-if="onsiteSale.payment_method == 'cash'">
                <td class="border border-green-700">{{onsiteSale.id}}</td>
                <td class="border border-green-700">{{onsiteSale.user.first_name}}</td>
                <td class="border border-green-700">{{onsiteSale.gold.name}}</td>
                <td class="border border-green-700">{{onsiteSale.gold_price}}</td>
                <td class="border border-green-700">{{onsiteSale.employee.nickname}}</td>
            </tr>
        </tbody>
    </table>
        
    </div>

    <div v-if="onsiteSale_payment_method == 'บัตรเครดิต'">
        <form  @submit.prevent="onsiteSearchID()">
           <div class="inline">
            <label>ID</label>
            <input id="onsite_SearchID" class="mx-3" type="text" v-model="onsite_SearchID" autocomplete="off">
           </div>

           <button type="submit" class="inline p-1 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
        <br>
        <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> ราคาสินค้า </th>
                <th class="border border-green-700"> พนักงาน </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700  hover:bg-green-100 dark:hover:bg-gray-600" v-for="onsiteSale in onsiteSales" @click="setSearched(onsiteSale.id,'onsite')">
            <tr v-if="onsiteSale.payment_method == 'credit_card'">
                <td class="border border-green-700">{{onsiteSale.id}}</td>
                <td class="border border-green-700">{{onsiteSale.user.first_name}}</td>
                <td class="border border-green-700">{{onsiteSale.gold.name}}</td>
                <td class="border border-green-700">{{onsiteSale.gold_price}}</td>
                <td class="border border-green-700">{{onsiteSale.employee.nickname}}</td>
            </tr>
        </tbody>
       </table>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h1 class="text-3xl">รายการขายออนไลน์</h1>
    <br>
    <div>
        <form @submit.prevent="onlineSearchID()">
           <div class="inline">
            <label>ID</label>
            <input id="online_SearchID" class="mx-3" type="text" v-model="online_SearchID" autocomplete="off">
           </div>

           <button type="submit" class="inline p-1 bg-green-400 border rounded-lg">
                Search
            </button>
        </form>
    </div>
    <br>
    <p>รายการขายออนไลน์ส่งมอบให้ลูกค้าไม่สำเร็จ</p>
    <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700 ">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> สถานะคำสั่งซื้อ </th>
                <th class="border border-green-700"> สถานะสินค้า </th>
                <th class="border border-green-700"> พนักงาน </th>
                <th class="border border-green-700"> หมายเหตุ </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700  hover:bg-green-100 dark:hover:bg-gray-600" v-for="onlineSale in onlineSales_not_delivery" @click="setSearched(onlineSale.id,'online')">
            <tr >
                <td class="border border-green-700">{{onlineSale.id}}</td>
                <td class="border border-green-700">{{onlineSale.user.first_name}}</td>
                <td class="border border-green-700">{{onlineSale.gold.name}}</td>
                <td class="border border-green-700">{{onlineSale.transfer_status}}</td>
                <td class="border border-green-700">{{onlineSale.delivery_status}}</td>
                <td class="border border-green-700" v-if="onlineSale.tracking_id_employee != null">{{onlineSale.tracking_id_employee.nickname}}</td>
                <td class="border border-green-700" v-else>-</td>
                <td class="border border-green-700">{{onlineSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>
    <p>รายการขายออนไลน์มอบให้ลูกค้าสำเร็จ</p>
    <table  class="border-collapse w-full text-sm text-left text-green-500 border border-green-700">
        <thead>
            <tr class="text-xs text-green-700 bg-green-50 border border-green-700">
                <th class="border border-green-700"> ลำดับ </th>
                <th class="border border-green-700"> ชื่อลูกค้า </th>
                <th class="border border-green-700"> ชื่อสินค้า </th>
                <th class="border border-green-700"> สถานะคำสั่งซื้อ </th>
                <th class="border border-green-700"> พนักงาน </th>
                <th class="border border-green-700"> หมายเหตุ </th>
            </tr>
        </thead>
        <tbody class="border border-green-700 dark:bg-gray-800 dark:border-gray-700  hover:bg-green-100 dark:hover:bg-gray-600" v-for="onlineSale in onlineSales_delivery" @click="setSearched(onlineSale.id,'online')">
            <tr >
                <td class="border border-green-700">{{onlineSale.id}}</td>
                <td class="border border-green-700">{{onlineSale.user.first_name}}</td>
                <td class="border border-green-700">{{onlineSale.gold.name}}</td>
                <td class="border border-green-700">{{onlineSale.transfer_status}}</td>
                <td class="border border-green-700" v-if="onlineSale.tracking_id_employee != null">{{onlineSale.tracking_id_employee.nickname}}</td>
                <td class="border border-green-700" v-else>-</td>
                <td class="border border-green-700">{{onlineSale.transfer_note}}</td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
    <br>
    <div v-if="sale_search != null" class="py-5" >
        <div class="mx-3 bg-white border border-gray-200 rounded-lg shadow-md">
            <h5 class="mx-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                รายละเอียด
            </h5>

            <div v-if="onsite_SearchID != null || onsiteSale_search != null">
                การขายหน้าร้าน
                <p> เลขที่บิลขายหน้าร้าน : {{sale_search.id}}</p>
                <p> รหัสสินค้า : {{sale_search.gold.id}}</p>
                <p> ชื่อสินค้า : {{sale_search.gold.name}}</p>
                <p> วันที่ขาย : {{sale_search.sale_date}}</p>
                <p> ราคาทอง ณ เวลาที่ขาย : {{sale_search.gold_sell_price.sell_price}}</p>
                <p> ราคาที่ขายสืนค้า(ราคาสุทธิ) : {{sale_search.gold_price}}</p>
                <p> ช่องทางการชำระเงิน : {{sale_search.payment_method}} </p>
                
                <div v-if="sale_search.payment_method == 'credit_card'">
                    <p> ประเภทบัตรเครดิต : {{sale_search.credit_card_type}}</p>
                    <p> ธนาคาร : {{sale_search.bank_name}}</p>
                </div>

                <div v-if="sale_search.payment_method == 'transfer'">
                    <p> รูปสลิป : {{sale_search.slip_image}}</p>
                    <p> สถานะการโอน : {{sale_search.transfer_status}}</p>
                    <p> หมายเหตุการโอน : {{sale_search.transfer_note}}</p>
                </div>

                <div v-if="sale_search.payment_method == 'cash'">
                    <p> ยอดเงินที่ลูกค้าชำระ : {{sale_search.paid_amount}}</p>
                    <p> ยอดเงินทอน : {{sale_search.paid_change}}</p>
                </div>

                <p v-if="sale_search.is_switch_gold == false"> ไม่เป็นทองเปลี่ยน </p>
                <div v-if="sale_search.is_switch_gold == true"> 
                    <p> เป็นทองที่เปลี่ยน </p>
                    <p> เลขที่บิลรับซื้อ : {{sale_search.redemption.id}} </p>
                </div>
                <p> พนักงานที่ทำรายการ : {{sale_search.employee.nickname}}</p>
                <p> ลูกค้า : {{sale_search.user.username}}</p>
                <div v-if="user.role == 'manager' ">
                <a v-bind:href="'/onsitesale/edit/'+ onsiteSale_search.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    แก้ไข
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
                </div>
            </div>

            <div v-else>
                การขายออนไลน์
                <p> เลขที่บิลขายออนไลน์ : {{sale_search.id}}</p>
                <p> รหัสสินค้า : {{sale_search.gold.id}}</p>
                <p> ชื่อสินค้า : {{sale_search.gold.name}}</p>
                <p> วันที่ขาย : {{sale_search.sale_date}}</p>
                <p> รูปสลิป : {{sale_search.slip_image}}</p>
                <p> ราคาทอง ณ เวลาที่ขาย : {{sale_search.gold_sell_price.sell_price}}</p>
                <p> ราคาที่ขายสืนค้า(ราคาสุทธิ) : {{sale_search.amount}}</p>
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
                <div v-if="user.role == 'manager'|| user.role == 'employee' || user.role == 'account'">
                <a v-bind:href="'/onlinesale/edit/'+ onlineSale_search.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    แก้ไข
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
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
    useOnsiteSaleStore
} from '@/stores/onsiteSale.js'
import {
    useOnlineSaleStore
} from '@/stores/onlineSale.js'
export default {
    setup() {
        const auth_store = useAuthStore()
        const onsiteSale_store = useOnsiteSaleStore()
        const onlineSale_store = useOnlineSaleStore()
        return {
            auth_store,
            onsiteSale_store,
            onlineSale_store
        }
    },
    data () {
        return {
            auth: null,
            user: null,
            onsiteSales: null,
            onlineSales: null,
            onsiteSale_payment_method: null,
            onsiteSale_search: null,
            onsiteSales_checking: null,
            onsiteSales_problem: null,
            onsiteSales_confirm: null,
            onlineSale_search: null,
            onlineSales_delivery: null,
            onlineSales_not_delivery: null,
            tracking_employee: null,
            error: null,
            disabledSearchButton: false,
            onsite_SearchID: null,
            online_SearchID: null,
            sale_search: null
           
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
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager") {
                console.log("authorized "+document.URL);
            } else {
                this.$router.push("/");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }
        await this.onsiteSale_store.fetch()
        this.onsiteSales = this.onsiteSale_store.getOnsiteSales
        this.onsiteSales_checking = this.onsiteSale_store.filterChecking
        this.onsiteSales_problem = this.onsiteSale_store.filterProbleum
        this.onsiteSales_confirm = this.onsiteSale_store.filterConfirm
        await this.onlineSale_store.fetch()
        this.onlineSales = this.onlineSale_store.getOnlineSales
        this.onlineSales_delivery = this.onlineSale_store.filterDelivery
        this.onlineSales_not_delivery = this.onlineSale_store.filterNotDelivery

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
                this.onsiteSales = this.onsiteSale_store.getOnsiteSales
                this.onsiteSales_checking = this.onsiteSale_store.filterChecking
                this.onsiteSales_problem = this.onsiteSale_store.filterProblem
                this.onsiteSales_confirm = this.onsiteSale_store.filterConfirm
                this.onsiteSales = this.onsiteSale_store.filterOnsiteByID(this.onsiteSales,this.onsite_SearchID)
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
        async setSearched(sale_id,check) {
            this.error = null
            try { 
                console.log(this.onsiteSale_store.getID(sale_id))

                if (check == 'online') {
                    console.log('online')
                    this.onlineSale_search = await this.onlineSale_store.getID(sale_id)
                    this.sale_search = this.onlineSale_search
                    this.onsiteSale_search = null
                }
                else {
                    console.log('onsite')
                    this.onsiteSale_search = await this.onsiteSale_store.getID(sale_id)
                    this.sale_search = this.onsiteSale_search
                    this.onlineSale_search = null
                }
            } catch (error) {
                this.error = error.message
                this.disabledSearchButton = false
            }
        }
        
    }
}
</script>

<style>
</style>
