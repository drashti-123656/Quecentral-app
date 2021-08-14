import http from './httpServices'

export const home = (data) => {
    return http.post('home', data)
}
