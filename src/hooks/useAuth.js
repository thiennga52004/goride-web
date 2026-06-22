import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { authService } from '../services/authService';
import { ROUTES } from '../constants/routes';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, accessToken, login: storeLogin, logout: storeLogout } = useAuthStore();

  const login = useCallback(async (phone, password) => {
    try {
      const response = await authService.login(phone, password);
      const { user: userData, accessToken, refreshToken } = response;

      if (userData.role !== 'ADMIN') {
        throw new Error('Tài khoản không có quyền admin');
      }

      storeLogin({ user: userData, accessToken, refreshToken });
      toast.success('Đăng nhập thành công');
      navigate(ROUTES.DASHBOARD);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Đăng nhập thất bại';
      toast.error(message);
      throw error;
    }
  }, [navigate, storeLogin]);

  const logout = useCallback(() => {
    storeLogout();
    navigate(ROUTES.LOGIN);
    toast.success('Đã đăng xuất');
  }, [navigate, storeLogout]);

  return {
    user,
    isAuthenticated: !!accessToken,
    isAdmin: user?.role === 'ADMIN',
    login,
    logout,
  };
};
