import { useAuthStore } from '~/stores/auth'
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
    const auth = useAuthStore()

    if (auth.authenticated && !auth.user) {
        await auth.fetchUser()
    }

    if ((!auth.authenticated || !auth.user) && !to.fullPath.includes('/auth')) {
        return navigateTo('/auth/login')
    }
})
