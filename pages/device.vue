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
            wallpaper: null
        }
    },

    created () {
        window.electronAPI.onMainLog((value) => {
            console.log(value)
        })
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

                    window.electronAPI.setWallpaper({
                        downloadUrl: this.wallpaper.download_url,
                        fileName: this.wallpaper.file_name
                    })
                })
        }
    }
}
</script>
