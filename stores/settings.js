import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            appSettings: {
                interval: 30
            },
            apiSettings: {
                allow_unliked: false,
                layout: 'desktop'
            }
        }
    },

    actions: {
        setSettings (settings) {
            this.appSettings = {
                interval: settings.interval
            }
            this.apiSettings = {
                allow_unliked: settings.allow_unliked,
                layout: settings.layout
            }
            window.electronAPI.setSettings(JSON.stringify(settings))
        }
    }
})
