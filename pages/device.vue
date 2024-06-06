<template>
    <div class="space-y-6">
        <div class="text-center">
            <UButton @click="getRandomWallaper">
                Change now
            </UButton>

            <UButton @click="startSchedule">
                Start schedule
            </UButton>
        </div>

        <WallpaperPreview
            v-if="wallpaper"
            :wallpaper="wallpaper"
        />
    </div>
</template>

<script>
import WallpapersRepository from '~/repositories/WallpapersRepository.js'
import { useSettingsStore } from '~/stores/settings'

export default {
    data () {
        return {
            currentWppPath: null,
            wallpaper: null,
            screens: []
        }
    },

    created () {
        window.electronAPI.on('get-wallpaper', (currentWppPath) => {
            this.currentWppPath = currentWppPath
        })

        window.electronAPI.on('get-wallpaper-id', ({ wallpaperId }) => {
            this.getWallpaper(wallpaperId)
        })

        window.electronAPI.on('get-screens', (screens) => {
            this.screens = screens
            console.log(this.screens)
        })

        window.electronAPI.getWallpaper()
        window.electronAPI.getScreens()
    },

    methods: {
        getRandomWallaper () {
            const settingsStore = useSettingsStore()

            return WallpapersRepository.random(settingsStore.apiSettings)
                .then((response) => {
                    this.wallpaper = response.data
                })
        },

        getWallpaper (id) {
            return WallpapersRepository.show(id)
                .then((response) => {
                    this.wallpaper = response.data
                })
        },

        startSchedule () {
            window.electronAPI.startSchedule({ interval: 5 })
        }
    }
}
</script>
