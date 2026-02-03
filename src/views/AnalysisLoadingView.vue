<template>
  <AppLayout title="분석 중" :showTabs="false" contentWidth="narrow">
    <div class="loading">
      <div class="spinner" aria-hidden="true"></div>
      <p class="muted">분석을 진행 중입니다.</p>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import { useAnalysisStore } from '../stores/analysisStore';

const router = useRouter();
const analysisStore = useAnalysisStore();

onMounted(() => {
  const result = analysisStore.finalizeResult();
  setTimeout(() => {
    router.push(`/analysis/result/${result.id}`);
  }, 1200);
});
</script>

<style scoped>
.loading {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid var(--border);
  border-top-color: var(--primary);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
