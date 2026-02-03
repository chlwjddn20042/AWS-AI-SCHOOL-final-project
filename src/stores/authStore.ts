import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { authService } from '../services/authService';

export type UserProfile = {
  name: string;
  email: string;
};

type AuthState = {
  isLoggedIn: boolean;
  user: UserProfile;
};

const defaultUser: UserProfile = {
  name: '',
  email: '',
};

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoggedIn: loadFromStorage('auth.isLoggedIn', false),
    user: loadFromStorage('auth.user', defaultUser),
  }),
  actions: {
    register(user: UserProfile & { password: string }) {
      authService.register(user);
    },
    login(email: string, password: string) {
      const user = authService.login(email, password);
      this.user = user;
      this.isLoggedIn = true;
      saveToStorage('auth.isLoggedIn', true);
      saveToStorage('auth.user', user);
    },
    logout() {
      this.isLoggedIn = false;
      this.user = { ...defaultUser };
      saveToStorage('auth.isLoggedIn', false);
      saveToStorage('auth.user', this.user);
    },
    hydrate() {
      this.isLoggedIn = loadFromStorage('auth.isLoggedIn', false);
      this.user = loadFromStorage('auth.user', defaultUser);
    },
  },
});
