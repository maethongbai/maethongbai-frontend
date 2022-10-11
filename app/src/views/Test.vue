<template>
<div v-for="gold in golds">
    {{ gold }}
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            title: "gold list",
            golds: null
        }
    },
    async mounted() {
        const url = "http://localhost/api/golds"

        try {
            const response = await axios.get(url)
            if (response.status == 200) {
                this.golds = response.data
            }
            console.log(response.data)
        } catch (error) {
            console.error(error.message)
        }

    }
}
</script>
