<template>
    <div class="group relative">
        <img
            :src="wallpaper.url"
            :alt="wallpaper.title"
        >
        <div class="absolute bottom-0 left-0 flex items-center justify-between right-0 p-4 bg-black/50 opacity-0 text-white group-hover:opacity-100">
            <UButton
                size="2xs"
                @click="setWallpaper"
            >
                Set as wallpaper
            </UButton>
            <UButton
                size="2xs"
                variant="link"
                icon="i-heroicons-arrow-top-right-on-square"
            >
                Open
            </UButton>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'WallpaperPreview',

    props: {
        wallpaper: {
            type: Object,
            required: true
        }
    },

    methods: {
        setWallpaper () {
            window.electronAPI.setWallpaper({
                downloadUrl: this.wallpaper.download_url,
                fileName: this.wallpaper.file_name,
                wallpaperId: this.wallpaper.id
            })
        }
    }
})
</script>
