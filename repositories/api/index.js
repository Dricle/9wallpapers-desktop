import { useAuthStore } from '~/stores/auth'

export const api = () => {
    const auth = useAuthStore()

    const fetch = (url, options = {}) => {
        const api = auth.makeApiWrapper()
        return api(url, options)
    }

    const raw = (url, options = {}) => {
        const api = auth.makeApiWrapper()
        return api.raw(url, options)
    }

    return {
        $get (url, query = {}, options = {}) {
            return (options.download || options.responseType === 'blob')
                ? raw(url, { query, ...options, method: 'GET' })
                : fetch(url, { query, ...options, method: 'GET' })
        },

        $post (url, body = {}, options = {}) {
            return (options.download || options.responseType === 'blob')
                ? raw(url, { body, ...options, method: 'POST' })
                : fetch(url, { body, ...options, method: 'POST' })
        },

        $patch (url, body = {}, options = {}) {
            return fetch(url, { body, ...options, method: 'PATCH' })
        },

        $put (url, body = {}, options = {}) {
            return fetch(url, { body, ...options, method: 'PUT' })
        },

        $delete (url, query = {}, options = {}) {
            return fetch(url, { query, ...options, method: 'DELETE' })
        }
    }
}
