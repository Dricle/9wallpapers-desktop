<template>
    <div class="space-y-6">
        <UFormGroup label="Allow Random Wallpaper">
            <UToggle v-model="formData.allow_unliked" />
        </UFormGroup>

        <UFormGroup label="Interval (in minutes)">
            <UInput
                v-model="formData.interval"
                type="number"
                min="0"
            />
        </UFormGroup>

        <div class="text-right">
            <UButton @click="saveSettings">
                Save
            </UButton>
        </div>
    </div>
</template>

<script>
export default defineComponent({
    data () {
        return {
            formData: {
                allow_unliked: false,
                interval: 30
            }
        }
    },

    created () {
        window.electronAPI.on('get-settings', (settings) => {
            const parsedSettings = settings && settings !== 'undefined' ? JSON.parse(settings) : {}
            this.formData = {
                allow_unliked: parsedSettings.allow_unliked || this.formData.allow_unliked,
                interval: parsedSettings.interval || this.formData.interval
            }
        })

        window.electronAPI.getSettings()
    },

    methods: {
        saveSettings () {
            const toast = useToast()

            window.electronAPI.setSettings(JSON.stringify(this.formData))

            toast.add({ title: 'Settings saved!' })
        }
    }
})
</script>
