<template>
  <nav class="tabbar">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      class="tab"
      :class="{ active: route.path.startsWith(tab.path) }"
    >
      <span class="label">{{ tab.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const tabs = [
  { label: 'Home', path: '/home' },
  { label: 'Quest', path: '/quest' },
  { label: 'Chatbot', path: '/chatbot' },
  { label: 'My', path: '/my' },
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
  padding: 10px 12px 14px;
}

.tab {
  text-align: center;
  padding: 8px 0;
  border-radius: 10px;
  color: var(--muted);
  text-decoration: none;
  font-size: 12px;
}

.tab.active {
  color: var(--text);
  font-weight: 600;
  background: var(--surface-muted);
}
</style>
