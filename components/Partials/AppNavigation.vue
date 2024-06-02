<template>
    <UHorizontalNavigation
        :links="links"
        class="border-b border-gray-200 dark:border-gray-800"
    />
</template>

<script setup>
const authStore = useAuthStore()

const links = [
    [
        {
            label: 'My Wallpapers',
            icon: 'i-heroicons-photo',
            to: '/'
        },
        {
            label: 'Current Wallpaper',
            icon: 'i-heroicons-computer-desktop',
            to: '/device'
        },
        {
            label: 'Settings',
            icon: 'i-heroicons-cog',
            to: '/settings'
        }
    ],

    [
        {
            label: 'Profile',
            avatar: {
                src: authStore.user.avatar
            }
        },
        {
            label: 'Logout',
            icon: 'i-heroicons-logout',
            to: '/auth/logout'
        }
    ]
]
</script>
