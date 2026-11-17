import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { hashPassword, verifyPassword, generateId, sleep } from '../utils/helpers';
import {
  getUsers, saveUsers, findUserByEmail, updateUserInStorage,
  getCurrentUser, saveCurrentUser, clearCurrentUser, getRememberMe,
  setResetEmail as setResetEmailStorage, getResetEmail, clearResetEmail,
} from '../utils/localStorage';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

const DEMO_USER = {
  id: 'admin-pavan-001',
  name: 'Pavan Kumar',
  email: 'pavan@eventora.com',
  phone: '+91 9876543210',
  role: 'Admin',
  avatar: null,
  createdAt: '2024-01-01T00:00:00.000Z',
};
const DEMO_PASSWORD = 'Pavan@123';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const users = getUsers();
        const demoExists = users.find((u) => u.email === DEMO_USER.email);
        if (!demoExists) {
          const hashed = await hashPassword(DEMO_PASSWORD);
          users.push({ ...DEMO_USER, password: hashed });
          saveUsers(users);
        }
        const saved = getCurrentUser();
        if (saved) {
          setCurrentUser(saved);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback(async (email, password, rememberMe = false) => {
    await sleep(800);
    const user = findUserByEmail(email);
    if (!user) {
      throw new Error('No account found with this email address.');
    }
    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      throw new Error('Invalid password. Please try again.');
    }
    const { password: _, ...safeUser } = user;
    setCurrentUser(safeUser);
    setIsAuthenticated(true);
    saveCurrentUser(user, rememberMe);
    return safeUser;
  }, []);

  const register = useCallback(async (userData) => {
    await sleep(1000);
    const existing = findUserByEmail(userData.email);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }
    const hashed = await hashPassword(userData.password);
    const newUser = {
      id: generateId(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      role: 'User',
      avatar: null,
      password: hashed,
      createdAt: new Date().toISOString(),
    };
    const users = getUsers();
    users.push(newUser);
    saveUsers(users);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    clearCurrentUser();
    toast.info('You have been logged out successfully.');
  }, []);

  const updateUser = useCallback((updates) => {
    if (!currentUser) return;
    const updated = updateUserInStorage(currentUser.id, updates);
    if (updated) {
      const { password: _, ...safeUser } = updated;
      setCurrentUser(safeUser);
      saveCurrentUser(updated, getRememberMe());
    }
  }, [currentUser]);

  const forgotPassword = useCallback(async (email) => {
    await sleep(1200);
    const user = findUserByEmail(email);
    if (!user) {
      throw new Error('No account found with this email address.');
    }
    setResetEmailStorage(email);
    return true;
  }, []);

  const resetPassword = useCallback(async (email, newPassword) => {
    await sleep(1000);
    const user = findUserByEmail(email);
    if (!user) {
      throw new Error('No account found with this email address.');
    }
    const hashed = await hashPassword(newPassword);
    updateUserInStorage(user.id, { password: hashed });
    clearResetEmail();
    return true;
  }, []);

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export default AuthContext;
