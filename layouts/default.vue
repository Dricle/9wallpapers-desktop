<template>
    <div class="h-screen">
        <UContainer class="space-y-6 pb-10">
            <AppNavigation />
            <slot />
        </UContainer>

        <UNotifications />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    window.electronAPI.on('log', (value) => {
        console.log(value)
    })
})
</script>
