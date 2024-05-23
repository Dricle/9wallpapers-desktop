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
                interval: 5
            }
        }
    },

    created () {
        let settings = localStorage.getItem('9wpp-settings')
        if (settings) {
            settings = JSON.parse(settings)
        } else {
            settings = this.formData
        }
        console.log(settings)
        this.formData = settings
    },

    methods: {
        saveSettings () {
            const toast = useToast()

            localStorage.setItem('9wpp-settings', JSON.stringify(this.formData))

            toast.add({ title: 'Settings saved!' })
        }
    }
})
</script>
