<template>
    <h1 class="title text-center">
        Déconnexion...
    </h1>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { definePageMeta } from '#imports'

definePageMeta({
    layout: 'auth'
})

export default defineComponent({
    created () {
        this.logout()
    },

    methods: {
        ...mapActions(useAuthStore, ['logout'])
    }
})
</script>
