import { api } from './api'

const WallpapersRepository = {
    index (query = {}) {
        return api().$get('/user/wallpapers', query)
    },

    random (query = {}) {
        return api().$get('/user/wallpapers/random', query)
    }
}

export default WallpapersRepository
