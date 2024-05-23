import { useAuthStore } from '~/stores/auth'
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(() => {
    const auth = useAuthStore()

    if (auth.authenticated && auth.user) {
        return navigateTo('/')
    }
})
