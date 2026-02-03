<template>
  <div class="layout">
    <header v-if="showHeader" class="header">
      <div class="header-inner">
        <h1 class="title">{{ title }}</h1>
        <div class="header-action">
          <slot name="header-action" />
        </div>
      </div>
    </header>
    <main class="content">
      <div class="content-inner" :class="contentWidth">
        <slot />
      </div>
    </main>
    <BottomTabBar v-if="showTabs" />
  </div>
</template>

<script setup lang="ts">
import BottomTabBar from '../components/BottomTabBar.vue';

withDefaults(
  defineProps<{
    title?: string;
    showTabs?: boolean;
    showHeader?: boolean;
    contentWidth?: 'wide' | 'narrow';
  }>(),
  {
    title: '',
    showTabs: false,
    showHeader: true,
    contentWidth: 'wide',
  },
);
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px 20px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 18px;
  margin: 0;
}

.header-action {
  display: flex;
  align-items: center;
  gap: 8px;
}

.content {
  flex: 1;
  padding: 20px 0 24px;
}

.content-inner {
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content-inner.wide {
  max-width: 960px;
}

.content-inner.narrow {
  max-width: 480px;
}
</style>
