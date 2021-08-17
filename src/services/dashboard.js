import http from './httpServices'

export const home = (data) => {
    return http.post('home', data)
}

export const profileDetails = () => {
    return http.get('user_profile')
}

export const updateUser = (data) => {
    return http.post('update_user', data)
}


