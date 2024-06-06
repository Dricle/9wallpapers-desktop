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
import { useSettingsStore } from '~/stores/settings'

onMounted(() => {
    /**
     * Logs
     */
    window.electronAPI.on('log', (value) => {
        console.log(value)
    })

    /**
     * Handle wallpaper changer job
     */
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

    /**
     * Init Settings
     */
    window.electronAPI.getSettings()
    window.electronAPI.on('get-settings', (settings) => {
        const parsedSettings = settings && settings !== 'undefined' ? JSON.parse(settings) : {}
        const settingsStore = useSettingsStore()
        const defaultAppSettings = settingsStore.appSettings
        const defaultApiSettings = settingsStore.apiSettings
        settingsStore.setSettings({
            allow_unliked: parsedSettings.allow_unliked || defaultApiSettings.allow_unliked,
            layout: parsedSettings.layout || defaultApiSettings.layout,
            interval: parsedSettings.interval || defaultAppSettings.interval
        })
    })
})
</script>
