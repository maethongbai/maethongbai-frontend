<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
    <div class="block my-5">
        <router-link to="/redemption/create" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
        Create Redemption
    </router-link>
    </div>
    
<main>
    <TheWelcome />
</main>
</template>