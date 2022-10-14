<template>
<div v-for="gold in golds">
    {{ gold }}
</div>
</template>

<script>
    import { useUserStore } from '@/stores/user.js'
    export default {
      setup() {
        const gold_store = useUserStore()
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
        this.golds = this.gold_store.getUsers
        
      }
    }
    </script>
