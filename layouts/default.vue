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
import WallpapersRepository from '~/repositories/WallpapersRepository'

onMounted(() => {
    window.electronAPI.on('log', (value) => {
        console.log(value)
    })

    window.electronAPI.on('schedule:fetch-new-wpp', (settings) => {
        return WallpapersRepository.random(JSON.parse(settings))
            .then((response) => {
                const wallpaper = response.data
                window.electronAPI.setWallpaper({
                    downloadUrl: wallpaper.download_url,
                    fileName: wallpaper.file_name,
                    wallpaperId: wallpaper.id
                })
            })
    })
})
</script>
