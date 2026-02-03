<template>
  <div class="layout">
    <slot name="header" />
    <main class="content">
      <div class="content-inner" :class="contentWidth">
        <slot />
      </div>
    </main>
    <TabBar v-if="showTabs" />
  </div>
</template>

<script setup lang="ts">
import TabBar from '../components/TabBar.vue';

withDefaults(
  defineProps<{
    showTabs?: boolean;
    contentWidth?: 'wide' | 'narrow';
  }>(),
  {
    showTabs: false,
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
