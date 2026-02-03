<template>
  <nav class="tabbar">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      class="tab"
      :class="{ active: route.path.startsWith(tab.path) }"
    >
      <span class="icon" aria-hidden="true">{{ tab.icon }}</span>
      <span class="label">{{ tab.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const tabs = [
  { label: 'Home', path: '/home', icon: '⌂' },
  { label: 'Quest', path: '/quest', icon: '✓' },
  { label: 'Chatbot', path: '/chatbot', icon: '💬' },
  { label: 'My', path: '/my', icon: '👤' },
];
</script>

<style scoped>
.tabbar {
  position: sticky;
  bottom: 0;
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 8px 12px 12px;
  gap: 8px;
}

.tab {
  text-align: center;
  padding: 6px 0;
  border-radius: 12px;
  border: 1px solid transparent;
  color: var(--muted);
  text-decoration: none;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}

.icon {
  font-size: 16px;
}

.tab.active {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-soft);
}
</style>
