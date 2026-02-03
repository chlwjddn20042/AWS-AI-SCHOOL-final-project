<template>
  <div class="layout">
    <header class="header">
      <h1 class="title">{{ title }}</h1>
      <button class="menu" type="button">메뉴</button>
    </header>
    <main class="content">
      <slot />
    </main>
    <BottomTabBar v-if="showTabs" />
  </div>
</template>

<script setup lang="ts">
import BottomTabBar from '../components/BottomTabBar.vue';

defineProps<{ title?: string; showTabs?: boolean }>();
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 8px;
  color: var(--line);
}

.title {
  font-size: 18px;
  margin: 0;
}

.menu {
  border: 1px solid var(--line);
  background: #fff;
  border-radius: 999px;
  padding: 6px 12px;
  color: var(--line);
}

.content {
  flex: 1;
  padding: 12px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
