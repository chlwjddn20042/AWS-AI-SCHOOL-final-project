<template>
  <AppLayout title="마이" :showTabs="true" contentWidth="narrow">
    <div class="section">
      <div class="header-row">
        <h2>성향 분석 히스토리</h2>
        <button class="ghost" type="button" @click="goStart">새 성향 분석 시작</button>
      </div>

      <div v-if="!results.length" class="empty">아직 결과가 없습니다.</div>
      <div v-else class="list">
        <RouterLink
          v-for="item in results"
          :key="item.id"
          :to="`/analysis/result/${item.id}`"
          class="history-item"
        >
          <div>
            <strong>{{ item.summary }}</strong>
            <p class="muted">{{ formatDate(item.createdAt) }}</p>
          </div>
          <span class="chevron">›</span>
        </RouterLink>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import { useAnalysisStore } from '../stores/analysisStore';

const router = useRouter();
const analysisStore = useAnalysisStore();

const results = computed(() => analysisStore.results);

const formatDate = (value: string) => new Date(value).toLocaleDateString();

const goStart = () => {
  router.push('/analysis/start');
};
</script>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.header-row h2 {
  margin: 0;
  font-size: 16px;
}

.ghost {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 12px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  text-decoration: none;
  color: var(--text);
}

.history-item p {
  margin: 4px 0 0;
}

.chevron {
  color: var(--muted);
}

.empty {
  padding: 16px;
  border-radius: 12px;
  border: 1px dashed var(--border);
  color: var(--muted);
}
</style>
