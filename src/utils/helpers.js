const SALT = 'eventora-sha256-salt-v1-secure';

export const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

export const verifyPassword = async (password, storedHash) => {
  const hash = await hashPassword(password);
  return hash === storedHash;
};

export const generateId = () => {
  return 'evt_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 11);
};

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '', width: '0%' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score: 1, label: 'Weak', color: 'bg-red-500', width: '20%' };
  if (score <= 3) return { score: 2, label: 'Fair', color: 'bg-orange-500', width: '40%' };
  if (score <= 4) return { score: 3, label: 'Good', color: 'bg-yellow-500', width: '60%' };
  if (score <= 5) return { score: 4, label: 'Strong', color: 'bg-green-500', width: '80%' };
  return { score: 5, label: 'Very Strong', color: 'bg-emerald-500', width: '100%' };
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
