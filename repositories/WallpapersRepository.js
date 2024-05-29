import { api } from './api'

const WallpapersRepository = {
    index (query = {}) {
        return api().$get('/user/wallpapers', query)
    },

    show (id) {
        return api().$get(`/wallpapers/${id}`)
    },

    random (query = {}) {
        return api().$get('/user/wallpapers/random', query)
    }
}

export default WallpapersRepository
