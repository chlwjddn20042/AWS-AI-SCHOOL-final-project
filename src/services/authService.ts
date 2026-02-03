import { loadFromStorage, saveToStorage } from '../utils/storage';
import type { UserProfile } from '../stores/authStore';

type StoredUser = UserProfile & { password: string };

const STORAGE_KEY = 'auth.registeredUsers';

function loadUsers(): StoredUser[] {
  return loadFromStorage<StoredUser[]>(STORAGE_KEY, []);
}

function saveUsers(users: StoredUser[]) {
  saveToStorage(STORAGE_KEY, users);
}

export const authService = {
  register(user: StoredUser) {
    const users = loadUsers();
    const exists = users.some((item) => item.email === user.email);
    if (!exists) {
      saveUsers([...users, user]);
    }
  },
  login(email: string, password: string): UserProfile {
    const users = loadUsers();
    const found = users.find((item) => item.email === email && item.password === password);
    if (!found) {
      return {
        name: '사용자',
        email,
        gender: '',
        birthDate: '',
      };
    }
    return {
      name: found.name,
      email: found.email,
      gender: found.gender,
      birthDate: found.birthDate,
    };
  },
};
