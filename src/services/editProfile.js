import http from './httpServices';

export const fetchCountriesAPI = () => {
  return httpServices.get('category');
};

export const fetchStateAPI = id => {
  return http.get(`state_details?id=${id}`);
};

export const cityListAPI = id => {
  return http.get(`city_details?id=${id}`);
};

export const updateProfileAPI = data => {
    return http.post('update_user', data);
};
