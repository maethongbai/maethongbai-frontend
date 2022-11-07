<template>
    <div class="pt-8 pb-8 flex items-center justify-center flex flex-col">
        <div class="card-white w-[1200px] p-0 h-[250px] text-center">
            <img class="mx-auto w-[1200px]" src="@/assets/actuallybanner1.GIF" />
        </div>

        <div class="flex flex-row gap-6 mt-6">
            <div class="card-white w-[588px] p-0 h-[250px] text-center">
                <img class="mx-auto" src="@/assets/bannerh2.png" />
            </div>
            <div class="card-white w-[588px] p-0 h-[250px] text-center">
                <img class="mx-auto" src="@/assets/bannerh3.png" />
            </div>
        </div>

        <div class="mt-6">
            <div class="card-white w-[1200px] p-0">
                <div class="w-[1200px] h-[64px] bg-[#9B0000] rounded-t-lg">
                    <p class="text-white text-xl ml-10 mt-5"><b>สินค้าใหม่</b></p>
                </div>
                <div class="p-8 pb-3">
                    <div hidden>
                        {{sortt()}}
                    </div>
                    <vue-horizontal>
                        <div v-for="gold in sortt_array" class="border w-[200px] ml-5 p-2">
                            <img :src="`${gold.gold.gold.image}`" width="150" height="150" class="mx-auto">
                            <div class="flex flex-col gap-1">
                                <p class="text-center mt-2">{{gold.gold.gold.name}}</p>
                                <p class="text-center text-[#9B0000]">฿{{gold.total_price}}</p>
                                <a v-bind:href="'/product/detail/'+ gold.gold.gold.id" class="red-btn w-[110px] mx-auto text-sm">
                                        ดูรายละเอียด
                                </a>
                            </div>
                        </div>
                    </vue-horizontal> 
                </div>
                <a v-bind:href="'/shopping/all'" class="red-btn w-[200px] mt-5 mb-5 text-base hover:underline ml-auto mr-10">
                    ดูสินค้าทั้งหมด >
                </a>
            </div>
        </div>
    </div>
        
    <div class="w-full h-[800px] bg-white mt-6">
        <div class="flex flex-col">
            <h1 class="text-4xl text-center p-5 pt-10 text-s1 font-extrabold">เกี่ยวกับเรา</h1>
            <div class="grid grid-cols-3 gap-10 mx-auto">
                <img alt="Home1" class="drop-shadow-2xl" src="@/assets/home1.png" />
                <img alt="Home2" class="drop-shadow-2xl" src="@/assets/home2.png"  />
                <img alt="Home3" class="drop-shadow-2xl" src="@/assets/home3.png"  />
            </div>
            <br>
            <div class="text-s1 text-center p-5">
                <p>"ห้างทองแม่ทองใบ คลาสสิก มีจุดเริ่มต้นมาจากห้างทอง “เตียเล่งเฮง” ซึ่งตั้งอยู่ที่ถนนสุขุมวิท แขวงพระโขนง ในปี 2527</p>
                <p>โดยทางร้านในขณะนั้นเป็นที่ยอมรับเรื่องงานฝีมือ ที่มีความประณีตงดงามและมีความละเอียดอ่อนของช่างทองที่มีความชำนาญ</p>
                <p>ทำให้ร้านประสบความสำเร็จในระดับนึง ต่อมาทางร้านต้องการที่จะจับกลุ่มลูกค้าให้ได้เพิ่มมากขึ้น</p>
                <p>ในตอนแรกที่จะพัฒนากิจการนี้นั้นทางร้านได้เลือกหาทำเล จนมาตัดสินใจที่จะเปิดที่ห้างสรรพสินค้าเดอะมอลล์บางแค ชั้น G ตั้งแต่ปี 2540</p>
                <p>เนื่องจากกลุ่มลูกค้าที่เดินภายในห้างสรรพสินค้าเดอะมอลล์บางแค ตรงตามที่ทางร้านต้องการที่จะขยายกลุ่มลูกค้า</p>
                <p>โดยถ้านับเวลาถึงปัจจุบันจะเป็นเวลากว่า 25 ปี ร้านห้างทองแม่ทองใบ คลาสสิก เป็นร้านที่สามารถตอบโจทย์ลูกค้าได้อย่างหลากหลาย</p> 
                <p>เนื่องจากทางร้านมีบริการด้านทองที่ครบวงจร ทั้ง ซื้อ ขาย เปลี่ยน ขาย-ฝาก ทั้งทองแท่งและทองรูปพรรณ รับทำงานสั่ง"</p>   
            </div>
        </div>
    </div>
    <div class="w-full h-[150px] bg-[#9B0000]">
        <p class="text-4xl text-center pt-14 text-white font-extrabold">เสียงตอบรับจากลูกค้า</p>
    </div>
    <div class="w-full h-[600px] bg-white">
        <div class="pt-10 flex flex-row gap-5 text-center  justify-center">
            <div class="p-4 w-[320px]">
                <img alt="Home1" class="mx-auto drop-shadow-2xl" src="@/assets/members/review-1bamboo.png" />
                <p class="p-3 mt-3">"ซื้อขายทองร้านนี้มั่นใจได้ ราคาเป็นกันเอง มาตรฐานทองเยาวราช เจ้าของร้านใจดี พนักงานบริการดี ให้เต็ม 5 ดาวเลย"</p>
                <p class="m-2 mb-0"><b>ณัฐพงศ์</b></p>
                <p class="">- อดีตนิสิตมหาวิทยาลัยย่านบางเขน -</p>
            </div>
            <div class="p-4 w-[320px]">
                <img alt="Home1" class="mx-auto drop-shadow-2xl" src="@/assets/members/review-2opal.png" />
                <p class="p-3 mt-3">"ร้านนี้บริการดีมากค่ะ แถมจัดส่งฟรีอีก ดูแลใส่ใจลูกค้าดีมากๆคะ แพ็คของดีสุดๆ🥰🥰 ไว้จะอุดหนุนอีกนะคะ"</p>
                <p class="m-2 mb-0"><b>รินลดา</b></p>
                <p class="">- ว่าที่เจ้าของร้านทอง -</p>
            </div>
            <div class="p-4 w-[320px]">
                <img alt="Home1" class="mx-auto drop-shadow-2xl" src="@/assets/members/review-3pound.png" />
                <p class="p-3 mt-3">"ร้านนี้มีลายให้เลือกเยอะมากครับ ใครสนใจซื้อขายทองต้องร้านนี้เลยครับ"</p>
                <p class="m-2 mb-0"><b>รัชต์ธร</b></p>
                <p class="">- ว่าที่อาจารย์มหาวิทยาลัยย่านบางเขน -</p>
            </div>
            <div class="p-4 w-[320px]">
                <img alt="Home1" class="mx-auto drop-shadow-2xl" src="@/assets/members/review-4pin.png" />
                <p class="p-3 mt-3">ทองสวย​และมีโปรโมชันที่น่ารักอีกด้วย ฟรีค่ากำเหน็ด​ ❤️❤️ ชอบค่ะถูกใจมาก พนักงานบริการดีค่ะ</p>
                <p class="m-2 mb-0"><b>จิรัชญา</b></p>
                <p class="">- เจ้าของร้านกาแฟชื่อดังแห่งหนึ่ง -</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { useUserStore } from '@/stores/user.js'
    import { useAuthStore } from '@/stores/auth.js'
    import { useGoldStore } from '@/stores/gold.js'
    import { useGoldPriceStore } from '@/stores/gold_price.js'
    import VueHorizontal from "vue-horizontal";
    export default {
      setup() {
        const auth_store = useAuthStore()
        const user_store = useUserStore()
        const gold_store = useGoldStore()
        const gold_price_store = useGoldPriceStore()
        return { user_store, auth_store, gold_store, gold_price_store}
      },
      data() {
        return {
            auth: null,
            user: null,
            error: null,
            user: null,
            golds: [],
            sort_array: [],
            gold_sell_price: {
                id: -1,
                buy_price: -1,
                sell_price: -1
            },
            count: 0,
            sortt_array: []
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
            if (this.user.role == "manager" || this.user.role == "account" || this.user.role == "employee" || this.user.role == "user") {
                console.log("authorized " + document.URL);
            } else {
                this.$router.push("/");
            }
        }
        else{
            this.$router.push("/");
        }
        await this.gold_store.fetch()
        this.golds = this.gold_store.countLeftover()
        this.gold_sell_price = await this.gold_price_store.getLast()
        this.addPrice()
      },
      components: {
        VueHorizontal
    },
    methods: {
        sortNew() {
            function compare(a, b) {
                if (a.gold.gold.import_date < b.gold.gold.import_date) {
                    return 1;
                } else if (a.gold.gold.import_date > b.gold.gold.import_date) {
                    return -1;
                } else {
                    return 0;
                }

            }
            console.log(this.sort_array.sort(compare))
            return this.sort_array.sort(compare)
        },
        addPrice() {
            var filtered = this.golds
            var total_price = 0
            var sort_array = []
            filtered.forEach(e => {
                total_price = this.price(e)
                var obj = {
                    gold: e,
                    total_price: total_price
                }
                if (this.l_price != null && this.h_price != null) {
                    if (total_price >= this.l_price && total_price <= this.h_price) {
                        sort_array.push(obj)
                    }
                } else {
                    sort_array.push(obj)
                }
            })
            return this.sort_array = sort_array
        },
        price(gold) {
            console.log(gold)
            var total
            var price = this.gold_sell_price.sell_price + ((gold.gold.pension_per_piece * 5) + 500)
            if (gold.gold.weight == "ครึ่งสลึง" ||
                gold.gold.weight == "1 สลึง" ||
                gold.gold.weight == "2 สลึง" ||
                gold.gold.weight == "3 สลึง" ||
                gold.gold.weight == "6 สลึง" ) {
                    var fprice = this.gold_sell_price.sell_price/4
                    if(gold.gold.weight == "ครึ่งสลึง"){
                        total =  (fprice/2) + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "1 สลึง") {
                        total =  fprice + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "2 สลึง") {
                        total =  (fprice*2) + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "3 สลึง") {
                        total =  (fprice*3) + ((gold.gold.pension_per_piece * 5) + 500)
                    } else if (gold.gold.weight == "6 สลึง") {
                        total =  (fprice*6) + ((gold.gold.pension_per_piece * 5) + 500)
                    }
            } else if (gold.gold.custom_weight != null) {
                var pricee = this.gold_sell_price.sell_price/15.16
                total = pricee + ((gold.gold.pension_per_piece * 5) + 500)

            }
            else {
                if (gold.gold.weight == "1 บาท") {
                    total = price * 1
                } else if (gold.gold.weight == "2 บาท") {
                    total = price * 2
                } else if (gold.gold.weight == "3 บาท") {
                    total = price * 3
                } else if (gold.gold.weight == "4 บาท") {
                    total = price * 4
                } else if (gold.gold.weight == "5 บาท") {
                    total = price * 5
                } else if (gold.gold.weight == "6 บาท") {
                    total = price * 6
                } else if (gold.gold.weight == "7 บาท") {
                    total = price * 7
                } else if (gold.gold.weight == "8 บาท") {
                    total = price * 8
                } else if (gold.gold.weight == "9 บาท") {
                    total = price * 9
                } else if (gold.gold.weight == "10 บาท") {
                    total = price * 10
                } else if (gold.gold.weight == "15 บาท") {
                    total = price * 15
                } else if (gold.gold.weight == "20 บาท") {
                    total = price * 20
                }
            }
            return total
        },
        sortt() {
            this.sort_array.forEach(element => {
                if (this.count <10){
                    this.sortt_array.push(element)
                }
                this.count += 1
            });            
        }

    }
  }
</script>

<style>

</style>

