const KEYS = {
  USERS: 'eventora_users',
  CURRENT_USER: 'eventora_current_user',
  REMEMBER_ME: 'eventora_remember_me',
  RESET_EMAIL: 'eventora_reset_email',
};

export const getUsers = () => {
  try {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveUsers = (users) => {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const updateUserInStorage = (userId, updates) => {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
    return users[idx];
  }
  return null;
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(KEYS.CURRENT_USER);
    if (user) return JSON.parse(user);
    const session = sessionStorage.getItem(KEYS.CURRENT_USER);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
};

export const saveCurrentUser = (user, rememberMe = true) => {
  const safeUser = { ...user };
  delete safeUser.password;
  if (rememberMe) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(safeUser));
    localStorage.setItem(KEYS.REMEMBER_ME, 'true');
  } else {
    sessionStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(safeUser));
    localStorage.removeItem(KEYS.REMEMBER_ME);
  }
};

export const clearCurrentUser = () => {
  localStorage.removeItem(KEYS.CURRENT_USER);
  localStorage.removeItem(KEYS.REMEMBER_ME);
  sessionStorage.removeItem(KEYS.CURRENT_USER);
};

export const getRememberMe = () => {
  return localStorage.getItem(KEYS.REMEMBER_ME) === 'true';
};

export const setResetEmail = (email) => {
  sessionStorage.setItem(KEYS.RESET_EMAIL, email);
};

export const getResetEmail = () => {
  return sessionStorage.getItem(KEYS.RESET_EMAIL);
};

export const clearResetEmail = () => {
  sessionStorage.removeItem(KEYS.RESET_EMAIL);
};
