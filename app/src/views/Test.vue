<template>
<div v-for="gold in golds">
    {{ gold }}
</div>
</template>

<script>
    import { useGoldStore } from '@/stores/gold.js'
    export default {
      setup() {
        const gold_store = useGoldStore()
        return { gold_store }
      },
      data() {
        return {
          title: "Golds",
          golds: null,
          error: null
        }
      },
      async mounted() {
        await this.gold_store.fetch()
        this.golds = this.gold_store.getGolds
        
      }
    }
    </script>
