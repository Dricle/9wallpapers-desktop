import Components from 'unplugin-vue-components/vite'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    components: false,
    devtools: { enabled: true },

    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxt/ui',
        'nuxt-electron'
    ],

    electron: {
        build: [
            {
                // Main-Process entry file of the Electron App.
                entry: 'electron/main.js'
            },
            {
                entry: 'electron/preload.js',
                onstart (args) {
                    // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
                    // instead of restarting the entire Electron App.
                    args.reload()
                }
            }
        ],
        renderer: {}
    },

    ssr: false,

    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL
        }
    },

    vite: {
        resolve: {
            dedupe: [
                'vue'
            ]
        },
        plugins: [
            Components({
                dirs: ['components']
            })
        ]
    }
})
