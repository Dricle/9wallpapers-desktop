<template>
    <div>
        <div class="grid grid-cols-4 gap-6">
            <div
                v-for="wallpaper in wallpapers"
                :key="wallpaper.id"
            >
                <WallpaperPreview :wallpaper="wallpaper" />
            </div>
        </div>

        <UPagination
            v-if="wallpapers.length > 0"
            :model-value="pagination.current_page"
            :page-count="pagination.per_page"
            :total="pagination.total"
            @update:model-value="getWallpapers"
        />
    </div>
</template>

<script>
import WallpapersRepository from '~/repositories/WallpapersRepository.js'

export default {
    data () {
        return {
            wallpapers: [],
            pagination: {}
        }
    },

    created () {
        this.getWallpapers()
    },

    methods: {
        getWallpapers (page = 1) {
            WallpapersRepository.index({ page })
                .then((response) => {
                    this.wallpapers = response.data
                    this.pagination = response.meta
                })
        }
    }
}
</script>
