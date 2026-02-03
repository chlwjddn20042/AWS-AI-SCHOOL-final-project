<template>
  <AppLayout :showTabs="true" contentWidth="narrow">
    <template #header>
      <AppHeader title="다마코치" :showLogout="true" />
    </template>

    <section class="character-card">
      <div class="avatar" aria-hidden="true"></div>
      <div class="pill-row">
        <span class="pill name-pill">만찢뚜방</span>
        <span class="pill status-pill">상태: 평온함</span>
      </div>
    </section>

    <section class="quest-list">
      <button
        v-for="item in questItems"
        :key="item.title"
        class="quest-row"
        :class="{ highlight: item.highlight }"
        type="button"
        @click="toggleQuest(item)"
      >
        <span class="status-dot" :class="{ done: item.checked }"></span>
        <span class="quest-title">{{ item.title }}</span>
        <span class="chevron">›</span>
      </button>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import { useQuestStore } from '../stores/questStore';

type HomeQuest = {
  title: string;
  checked: boolean;
  highlight?: boolean;
};

const questStore = useQuestStore();

const questItems = reactive<HomeQuest[]>([
  { title: '물 1L 이상 마시기', checked: false },
  { title: '10회 이상 자리에서 일어나 스트레칭', checked: false },
  { title: '일일 퀘스트', checked: false },
  { title: '주간 퀘스트', checked: false, highlight: true },
]);

const toggleQuest = (item: HomeQuest) => {
  item.checked = !item.checked;
  if (item.checked) {
    questStore.addEvent(item.title, 'completed');
  }
};
</script>

<style scoped>
.character-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
}

.avatar {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface-muted);
}

.pill-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.name-pill {
  color: var(--text);
}

.status-pill {
  background: var(--surface-muted);
}

.quest-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quest-row {
  display: grid;
  grid-template-columns: 16px 1fr 16px;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
}

.quest-row.highlight {
  border-color: rgba(16, 24, 40, 0.2);
  background: #f8fafc;
  font-weight: 600;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.status-dot.done {
  background: var(--text);
}

.quest-title {
  font-size: 14px;
}

.chevron {
  color: var(--muted);
}
</style>
