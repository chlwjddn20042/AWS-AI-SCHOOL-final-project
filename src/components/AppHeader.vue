<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="side left">
        <button v-if="showBack" class="text-button" type="button" @click="goBack">
          ← 뒤로가기
        </button>
        <button v-else-if="showLogout" class="text-button logout" type="button" @click="handleLogout">
          로그아웃
        </button>
        <slot name="left" />
      </div>
      <h1 class="title">{{ title }}</h1>
      <div class="side right">
        <slot name="right" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const props = withDefaults(
  defineProps<{
    title: string;
    showBack?: boolean;
    showLogout?: boolean;
  }>(),
  { showBack: false, showLogout: false },
);

const router = useRouter();
const authStore = useAuthStore();

const goBack = () => {
  router.back();
};

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style scoped>
.app-header {
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-inner {
  max-width: 480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 14px 20px;
  gap: 8px;
}

.side {
  display: flex;
  align-items: center;
  min-height: 24px;
}

.side.left {
  justify-content: flex-start;
}

.side.right {
  justify-content: flex-end;
}

.title {
  margin: 0;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
}

.text-button {
  border: none;
  background: none;
  font-size: 12px;
  color: var(--muted);
  padding: 4px 0;
}

.text-button.logout {
  color: var(--danger);
}
</style>
