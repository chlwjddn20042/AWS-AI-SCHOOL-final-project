<template>
  <AppLayout :showTabs="true" contentWidth="narrow">
    <template #header>
      <AppHeader title="다마코치" :showLogout="true" contentWidth="narrow" />
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
        :class="{ highlight: item.type === 'weekly', done: isCompleted(item.title) }"
        type="button"
        :disabled="isCompleted(item.title)"
        @click="openConfirm(item.title)"
      >
        <span class="status-dot" :class="{ done: isCompleted(item.title) }"></span>
        <span class="quest-title">{{ item.title }}</span>
        <span class="chevron" aria-hidden="true">✓</span>
      </button>
    </section>

    <div v-if="confirmTarget" class="dialog-backdrop" role="presentation">
      <div class="dialog" role="dialog" aria-modal="true">
        <p class="dialog-title">퀘스트를 완료 하셨습니까?</p>
        <div class="dialog-actions">
          <button class="ghost" type="button" @click="closeConfirm">아니오</button>
          <button class="primary" type="button" @click="confirmComplete">예</button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import { useQuestStore } from '../stores/questStore';
import { questService } from '../services/questService';

const questStore = useQuestStore();

const questItems = questService.getHomeQuestItems();
const confirmTarget = ref<string | null>(null);

const todayKey = computed(() => new Date().toISOString().slice(0, 10));
const completedMap = computed(() => questStore.homeChecklistState[todayKey.value] || {});

const isCompleted = (title: string) => Boolean(completedMap.value[title]);

const openConfirm = (title: string) => {
  if (isCompleted(title)) {
    return;
  }
  confirmTarget.value = title;
};

const closeConfirm = () => {
  confirmTarget.value = null;
};

const confirmComplete = () => {
  if (!confirmTarget.value) {
    return;
  }
  questStore.completeHomeQuest(confirmTarget.value);
  confirmTarget.value = null;
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

.quest-row.done {
  opacity: 0.6;
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

.dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 20;
}

.dialog {
  width: min(320px, 90vw);
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid var(--border);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
}

.dialog-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.dialog-actions {
  display: flex;
  gap: 8px;
}

.dialog-actions button {
  flex: 1;
  border-radius: 12px;
  padding: 10px 0;
  font-size: 13px;
}

.ghost {
  border: 1px solid var(--border);
  background: var(--surface);
}

.primary {
  border: 1px solid var(--text);
  background: var(--text);
  color: #fff;
}
</style>
