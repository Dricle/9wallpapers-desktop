<template>
    <div class="space-y-6">
        <div class="text-center">
            <UButton @click="getRandomWallaper">
                Change now
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
        })

        window.electronAPI.getWallpaper()
        window.electronAPI.getScreens()
    },

    methods: {
        getRandomWallaper () {
            let settings = localStorage.getItem('9wpp-settings')

            if (settings) {
                settings = JSON.parse(settings)
            }

            return WallpapersRepository.random(settings)
                .then((response) => {
                    this.wallpaper = response.data
                })
        },

        getWallpaper (id) {
            return WallpapersRepository.show(id)
                .then((response) => {
                    this.wallpaper = response.data
                })
        }
    }
}
</script>
