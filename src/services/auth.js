import http from './httpServices';

export const login = data => {
  return http.post('user_signin', data);
};

export const generateOTP = data => {
  return http.post('generate_otp_user', data);
};

export const signup = data => {
  return http.post('generate_otp_user', data);
};

export const checkLogintype = () => {
  return http.get('login_type');
};

export const googleLoginAPI = data => {
  return http.post('google_login', data);
};

export const facebookLoginAPI = data => {
  return http.post('facebook_login', data);
};

export const sendOtpAPI = data => {
  return http.post('send_otp', data);
};

export const verifyOtpAPI = data => {
  return http.post('verify_otp', data);
};


