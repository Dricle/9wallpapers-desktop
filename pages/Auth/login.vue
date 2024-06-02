<template>
    <div class="h-screen flex flex-col justify-center">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                class="mx-auto h-20 w-auto"
                src="https://9wallpapers.com/logo.png"
                alt="9Wallpapers"
            >
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                Sign in
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
                class="space-y-6"
                @submit.prevent="submit"
            >
                <UFormGroup
                    label="Email"
                    required
                >
                    <UInput
                        v-model="formData.email"
                        placeholder="you@example.com"
                        icon="i-heroicons-envelope"
                        type="email"
                        autofocus
                    />
                </UFormGroup>
                <UFormGroup
                    label="Password"
                    required
                >
                    <UInput
                        v-model="formData.password"
                        icon="i-heroicons-lock-closed"
                        type="password"
                        autofocus
                    />
                </UFormGroup>

                <div class="text-center">
                    <UButton
                        type="submit"
                        label="Sign in"
                        :loading="loading"
                    />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { definePageMeta } from '#imports'

definePageMeta({
    middleware: 'guest',
    layout: 'auth'
})

export default {
    data () {
        return {
            loading: false,
            formData: {
                email: '',
                password: ''
            }
        }
    },

    computed: {
        ...mapState(useAuthStore, ['token'])
    },

    created () {
        window.electronAPI.on('get-token', ({ token }) => {
            if (token) {
                this.setToken(token)
            }
        })

        window.electronAPI.getToken()
    },

    methods: {
        ...mapActions(useAuthStore, ['fetchToken', 'login', 'fetchUser', 'storeTwoFaCode', 'setToken']),

        submit () {
            this.loading = true
            this.login(this.formData)
                .then(() => this.fetchUser())
                .then(() => {
                    console.log(this.token)
                    window.electronAPI.setToken(this.token)
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 200)
                })
                .catch((error) => {
                    if (error?.response?.data?.error) {
                        this.errors = {
                            email: [error.response.data.error]
                        }
                    }
                    this.loading = false
                })
        }
    }
}
</script>
