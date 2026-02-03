<template>
  <nav class="tabbar">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      class="tab"
      :class="{ active: route.path.startsWith(tab.path) }"
    >
      {{ tab.label }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const tabs = [
  { label: '홈', path: '/home' },
  { label: '퀘스트', path: '/quest' },
  { label: '챗봇', path: '/chatbot' },
  { label: '마이', path: '/my' },
];
</script>

<style scoped>
.tabbar {
  position: sticky;
  bottom: 0;
  background: #fff;
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 8px 12px 12px;
  gap: 8px;
}

.tab {
  text-align: center;
  padding: 8px 0;
  border-radius: 999px;
  border: 1px solid transparent;
  color: var(--line);
  text-decoration: none;
  font-size: 13px;
}

.tab.active {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
