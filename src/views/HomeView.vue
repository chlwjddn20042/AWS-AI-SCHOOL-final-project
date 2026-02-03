<template>
  <AppLayout :showTabs="true" :showHeader="false" contentWidth="narrow">
    <header class="home-header">
      <span class="spacer" aria-hidden="true"></span>
      <h1 class="home-title">다마코치</h1>
      <button class="menu" type="button" aria-label="메뉴">☰</button>
    </header>

    <section class="character-card">
      <div class="avatar" aria-hidden="true"></div>
      <div class="pill-row">
        <span class="pill name-pill">만찢뚜방</span>
        <span class="pill status-pill">상태: 평온함</span>
      </div>
    </section>

    <section class="quest-list">
      <button
        v-for="item in quickQuests"
        :key="item.title"
        class="quest-row"
        type="button"
        @click="toggleQuick(item)"
      >
        <span class="status-dot" :class="{ done: item.done }"></span>
        <span class="quest-title">{{ item.title }}</span>
        <span class="chevron">›</span>
      </button>

      <RouterLink class="quest-row" to="/quest?tab=daily">
        <span class="status-dot"></span>
        <span class="quest-title">일일 퀘스트</span>
        <span class="chevron">›</span>
      </RouterLink>

      <RouterLink class="quest-row highlight" to="/quest?tab=weekly">
        <span class="status-dot"></span>
        <span class="quest-title">주간 퀘스트</span>
        <span class="chevron">›</span>
      </RouterLink>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';

type QuickQuest = { title: string; done: boolean };

const quickQuests = reactive<QuickQuest[]>([
  { title: '물 1L 이상 마시기', done: false },
  { title: '10회 이상 자리에서 일어나 스트레칭', done: false },
]);

const toggleQuick = (item: QuickQuest) => {
  item.done = !item.done;
};
</script>

<style scoped>
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 4px 0;
}

.home-title {
  font-size: 20px;
  margin: 0;
  text-align: center;
  flex: 1;
}

.menu {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 10px;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
}

.spacer {
  width: 36px;
  height: 36px;
}

.character-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
}

.avatar {
  width: 96px;
  height: 96px;
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
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  text-decoration: none;
}

.quest-row.highlight {
  background: var(--primary-soft);
  border-color: rgba(37, 99, 235, 0.3);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.status-dot.done {
  background: var(--primary);
}

.quest-title {
  font-size: 14px;
}

.chevron {
  color: var(--muted);
}
</style>
