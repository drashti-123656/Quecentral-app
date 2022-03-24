import http from './httpServices'

export const home = (data) => {
    return http.post('demo-home', data)
}

export const profileDetails = () => {
    return http.get('user_profile')
}

export const updateUser = (data) => {
    return http.post('update_user', data)
}

export const searchServiceAPI = (data) => {
    return http.post('search_services', data)
}

export const getReviews = () => {
    return http.get('get_reviews')
}

export const bookingListAPI = () => {
    return http.get('bookinglist_users?status=1')
}

export const categoryList = () => {
    return http.get('category')
}

export const notificationList = () => {
    return http.get('get-notification-list')
}

export const walletDetails = () => {
    return http.post('get-wallet')
}

export const serviceDetailsAPI = (id) => {
    return http.get(`service-details?id=${id}`)
}

export const stateList = (id) => {
    return http.get(`state_details?id=${id}`)
}

export const cityList = (id) => {
    return http.get(`city_details?id=${id}`)
}

export const categoryWiseServices = (data) => {
    return http.post('category_select', data)
}

export const walletHistory = () => {
    return http.post('wallet-history')
}

export const bookServiceAPI = (data) => {
    return http.post('book_service', data)
}

export const availability = () => {
    return http.get('availability')
}

export const serviceAvailability = (data) => {
    return http.post('service_availability', data)
}

export const validateCoupon = (data) => {
    return http.post('valid-coupan', data)
}

export const walletTransaction = (data) => {
    return http.post('wallet-transaction-user', data)
}





