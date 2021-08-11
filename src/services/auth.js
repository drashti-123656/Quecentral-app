import http from './httpServices'

export const login = (data) => {
    return http.post('user_signin', data)
}