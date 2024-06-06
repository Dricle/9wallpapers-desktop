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

        <UFormGroup label="Layout">
            <USelect
                v-model="formData.layout"
                :options="[
                    'desktop',
                    'dual',
                    'mobile'
                ]"
                required
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
import { useSettingsStore } from '~/stores/settings'

export default defineComponent({
    data () {
        return {
            formData: {}
        }
    },

    created () {
        const settingsStore = useSettingsStore()
        this.formData = {
            ...JSON.parse(JSON.stringify(settingsStore.appSettings)),
            ...JSON.parse(JSON.stringify(settingsStore.apiSettings))
        }
    },

    methods: {
        saveSettings () {
            const toast = useToast()

            const settingsStore = useSettingsStore()
            settingsStore.setSettings(this.formData)

            toast.add({ title: 'Settings saved!' })
        }
    }
})
</script>
