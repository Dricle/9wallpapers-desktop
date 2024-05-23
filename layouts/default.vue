<template>
    <div class="h-screen">
        <UContainer class="space-y-6 pb-10">
            <AppNavigation />
            <slot />
        </UContainer>

        <UNotifications />
    </div>
</template>

<script setup lang="ts">
</script>
