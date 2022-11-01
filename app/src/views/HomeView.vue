<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
<div class="block my-5">
    <router-link to="/redemption/create" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
        Create Redemption
    </router-link>
    <router-link to="/custom_order/create" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
        Create Custom Order
    </router-link>
    <router-link to="/onsitesale/create" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
        Create Onsite Sale
    </router-link>
    <router-link to="/employee/view" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
        View All Employee
    </router-link>
    <router-link to="/total" class="px-5 py-2 mx-4 my-4 bg-gray-200 rounded-xl">
        หน้าสรุปรายรับ-รายจ่าย
    </router-link>
</div>

<main>
    <TheWelcome />
</main>
</template>
