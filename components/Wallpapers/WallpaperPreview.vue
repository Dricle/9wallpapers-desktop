<template>
    <div>
        <img
            :src="wallpaper.url"
            :alt="wallpaper.title"
        >
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
    }
})
</script>
