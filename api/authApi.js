import axios from 'axios';
import Constants from 'expo-constants';
const BASE_URL = Constants.expoConfig.extra.BASE_URL;

export const sendVerificationEmail = (email) => {
  return axios.post(`${BASE_URL}/email-auth`, { email });
};

export const verifyEmailCode = (email, authNum) => {
  return axios.post(`${BASE_URL}/email-check`, {
    email,
    authNum: parseInt(authNum),
  });
};

export const signup = ({ name, email, password }) => {
  return axios.post(`${BASE_URL}/join`, {
    name,
    email,
    password,
  });
};

export const resetPassword = ({ email, authNum, password }) => {
  return axios.post(`${BASE_URL}/password-reset`, {
    email,
    authNum: parseInt(authNum),
    password,
  });
};

export const login = ({ email, password }) => {
  return axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });
};
