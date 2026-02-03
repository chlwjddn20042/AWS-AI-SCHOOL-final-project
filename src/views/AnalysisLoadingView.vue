<template>
  <AppLayout :showTabs="false">
    <div class="loading">
      <div class="spinner" aria-hidden="true"></div>
      <p class="muted">분석 중입니다...</p>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import { useAnalysisStore } from '../stores/analysisStore';

const router = useRouter();
const analysisStore = useAnalysisStore();

let timer: number | undefined;

onMounted(() => {
  const result = analysisStore.finalizeResult();
  timer = window.setTimeout(() => {
    router.push(`/analysis/result/${result.id}`);
  }, 1200);
});

onBeforeUnmount(() => {
  if (timer) {
    window.clearTimeout(timer);
  }
});
</script>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 60vh;
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid var(--border);
  border-top-color: var(--text);
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
