import http from './httpServices'

export const login = (data) => {
    return http.post('user_signin', data)
}

export const generateOTP = (data) => {
    return http.post('generate_userotp', data)
}

export const signup = (data) => {
    return http.post('generate_otp_user', data)
}


