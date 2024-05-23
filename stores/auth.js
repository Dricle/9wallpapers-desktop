import { defineStore } from 'pinia'
import { ofetch } from 'ofetch'
import { useRuntimeConfig, useNuxtApp } from '#app'

export const useAuthStore = defineStore('auth', {
    state: () => {
        const defaultHeaders = {
            Accept: 'application/json'
        }

        return {
            authenticated: false,
            token: null,
            user: null,
            apiHeaders: defaultHeaders
        }
    },

    actions: {
        makeApiWrapper () {
            const runtimeConfig = useRuntimeConfig()

            const that = this

            return ofetch.create({
                baseURL: runtimeConfig.public.apiUrl,
                headers: this.apiHeaders,
                onRequest ({ options }) {
                    /**
                     * Fix Query Serialization
                     */
                    if (options.query) {
                        const query = options.query
                        Object.entries(query).forEach(([key, val]) => {
                            if (typeof val === 'object' && Array.isArray(val) && val !== null) {
                                query[key + '[]'] = val.map(v => typeof v === 'object' ? JSON.stringify(v) : v)
                                delete query[key]
                            }
                            if (val === null) {
                                delete query[key]
                            }
                        })
                    }
                },
                onResponseError ({ response }) {
                    if (response._data) {
                        response.data = response._data
                    }

                    if (response.status && response.status === 401) {
                        that.logout()
                        if (!window.location.pathname.includes('/logout')) {
                            window.location = '/auth/logout'
                        }
                    } else if (response.status && response.status === 503) {
                        window.location = '/maintenance'
                    }
                }
            })
        },

        setApiHeader (header, value) {
            this.apiHeaders[header] = value
        },

        login (payload) {
            const api = this.makeApiWrapper()

            payload.device_name = '9wpp_desktop'

            return api('/authenticate', {
                method: 'POST',
                body: payload
            })
                .then((response) => {
                    this.token = response.access_token
                    this.setApiHeader('Authorization', 'Bearer ' + this.token)
                    this.authenticated = true
                })
        },

        fetchUser () {
            const api = this.makeApiWrapper()

            return api('/me')
                .then((response) => {
                    this.user = response.data
                    localStorage.setItem('9wpp-user', JSON.stringify(response.data))
                })
        },

        logout () {
            this.$reset()

            const { $router } = useNuxtApp()

            setTimeout(() => {
                $router.push('/auth/login')
            }, 500)
        },

        setUser (user) {
            this.user = user
        }
    },

    persist: true
})
