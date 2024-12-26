import axios from "axios";
import { API_ROUTES } from "../config/apiConfig";
import { toast } from "react-toastify";
import { ApiError } from "../model/api";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(API_ROUTES.USER_LOGIN, { email, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = '/';
  } catch (error: unknown) {
    const apiError = error as ApiError;
    if (apiError.response?.data?.details) {
      toast.error(apiError.response?.data?.details || 'Signup failed');
    } else {
      toast.error('오류가 발생했습니다. 다시 시도하세요.');
    }
    console.error('Signup failed:', error);
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const response = await axios.post(API_ROUTES.USER_CREATE, { email, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = '/auth/login';
  } catch (error: unknown) {
    const apiError = error as ApiError;
    toast.error(apiError.response?.data?.details || 'Signup failed');
    console.error('Signup failed:', error);
  }
};