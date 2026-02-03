<template>
  <AppLayout title="퀘스트" :showTabs="true" contentWidth="narrow">
    <template #header-action>
      <button class="icon-button" type="button" @click="goHistory" aria-label="히스토리">📅</button>
    </template>

    <div class="section">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab"
          :class="{ active: currentTab === tab.key }"
          type="button"
          @click="setTab(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="list">
        <label v-for="item in tasks" :key="item.id" class="task">
          <input type="checkbox" :checked="item.checked" @change="toggle(item.id)" />
          <span>{{ item.title }}</span>
        </label>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import { useQuestStore } from '../stores/questStore';

const router = useRouter();
const route = useRoute();
const questStore = useQuestStore();

const tabs = [
  { key: 'daily', label: '일일' },
  { key: 'weekly', label: '주간' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

const currentTab = ref<TabKey>('daily');

watch(
  () => route.query.tab,
  (value) => {
    if (value === 'weekly' || value === 'daily') {
      currentTab.value = value;
    }
  },
  { immediate: true },
);

const tasks = computed(() => (currentTab.value === 'daily' ? questStore.daily : questStore.weekly));

const toggle = (id: string) => {
  questStore.toggleTask(currentTab.value, id);
};

const setTab = (tab: TabKey) => {
  currentTab.value = tab;
  router.replace({ query: { tab } });
};

const goHistory = () => {
  router.push('/quest/history');
};
</script>

<style scoped>
.icon-button {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 10px;
  width: 36px;
  height: 36px;
}

.tabs {
  display: flex;
  gap: 8px;
  background: var(--surface-muted);
  padding: 4px;
  border-radius: 12px;
}

.tab {
  flex: 1;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
}

.tab.active {
  background: var(--surface);
  color: var(--text);
  border-color: var(--border);
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
}
</style>
