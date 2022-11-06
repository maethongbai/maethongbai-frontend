<template>
    <div>
        
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { useGoldStore } from '@/stores/gold.js'
import { useUserStore } from '@/stores/user.js'
import { useGoldPriceStore } from '@/stores/gold_price.js'
import { useOnlineSaleStore } from '@/stores/onlineSale.js'

export default {
    setup() {
        const auth_store = useAuthStore()
        const gold_store = useGoldStore()
        const user_store = useUserStore()
        const gold_price_store = useGoldPriceStore()
        const online_sale_store = useOnlineSaleStore()
        return {
            auth_store,
            gold_store,
            user_store,
            gold_price_store,
            online_sale_store
        }
    },
    data() {
        return {
            auth: null,
            user: null,
            error: null,
            onlineSale: {
                id: -1,
                gold: {
                    id: null,
                    name: null,
                    gold_type: null,
                    weight: null,
                    pension_per_piece: null,
                    pattern_type: null,
                    size: null
                },
                gold_price: 0,
                sale_date: "",
                sale_payment_method: {
                    slip_image: null,
                    transfer_status: null,
                },
                amount: null,
                gold_sell_price: {
                    id: -1,
                    buy_price: -1,
                    sell_price: -1
                }
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
        },
    },
    async mounted() {
        if (this.auth_store.isAuthen) {
            this.auth = this.auth_store.getAuth
            this.user = JSON.parse(this.auth_store.getUser)
            if (this.user.role == "employee" ||
                this.user.role == "account" ||
                this.user.role == "manager") {
                console.log("authorized " + document.URL);

            } else {
                this.$router.push("/");
            }
        } else {
            this.auth = null
            this.user = null
            this.$router.push("/login")
        }


        await this.online_sale_store.fetch()
        this.onlineSale.id = this.online_sale_store.getNextID()
        await this.user_store.fetch()
        await this.gold_store.fetch()

    }
}

</script>