// authService.ts
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  district: string;
  profileImage?: string;
  permissions: string[];
  lastLogin: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Auth API URL
const AUTH_API_URL = 'https://api.agrishieldpro.gov.in/v1/auth';

// Token management
const saveTokens = (token: string, refreshToken: string) => {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('refresh_token', refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_data');
};

const getToken = () => localStorage.getItem('auth_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

// User data management
const saveUserData = (user: User) => {
  localStorage.setItem('user_data', JSON.stringify(user));
};

const getUserData = (): User | null => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

// Authentication API calls
const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data: LoginResponse = await response.json();
    saveTokens(data.token, data.refreshToken);
    saveUserData(data.user);

    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const logout = async (): Promise<void> => {
  try {
    const token = getToken();
    if (token) {
      await fetch(`${AUTH_API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearTokens();
    window.location.href = '/login';
  }
};

const refreshAuthToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  try {
    const response = await fetch(`${AUTH_API_URL}/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    saveTokens(data.token, data.refreshToken);
    
    return data.token;
  } catch (error) {
    console.error('Token refresh error:', error);
    clearTokens();
    window.location.href = '/login';
    throw error;
  }
};

const isAuthenticated = (): boolean => {
  return !!getToken();
};

const resetPassword = async (email: string): Promise<void> => {
  try {
    const response = await fetch(`${AUTH_API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password reset request failed');
    }
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

const updatePassword = async (
  token: string, 
  newPassword: string
): Promise<void> => {
  try {
    const response = await fetch(`${AUTH_API_URL}/update-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password update failed');
    }
  } catch (error) {
    console.error('Password update error:', error);
    throw error;
  }
};

// Check if user has specific permission
const hasPermission = (permission: string): boolean => {
  const user = getUserData();
  return user?.permissions.includes(permission) || false;
};

export default {
  login,
  logout,
  refreshAuthToken,
  isAuthenticated,
  resetPassword,
  updatePassword,
  getUserData,
  hasPermission,
};