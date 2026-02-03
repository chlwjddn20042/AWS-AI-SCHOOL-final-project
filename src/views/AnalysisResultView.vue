<template>
  <AppLayout contentWidth="narrow">
    <template #header>
      <AppHeader title="분석 결과" :showBack="true" />
    </template>

    <div class="section">
      <div class="summary-card">
        <h2>{{ result?.summary || '분석 결과' }}</h2>
        <p class="muted">{{ formattedDate }}</p>
      </div>

      <div class="result-card">
        <h3>성향</h3>
        <p>{{ result?.traits || '데이터가 없습니다.' }}</p>
      </div>
      <div class="result-card">
        <h3>취향</h3>
        <p>{{ result?.taste || '데이터가 없습니다.' }}</p>
      </div>
      <div class="result-card">
        <h3>행동코칭</h3>
        <p>{{ result?.coaching || '데이터가 없습니다.' }}</p>
      </div>

      <PrimaryButton type="button" @click="goMy">마이페이지로 이동</PrimaryButton>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { useAnalysisStore } from '../stores/analysisStore';

const route = useRoute();
const router = useRouter();
const analysisStore = useAnalysisStore();

const resultId = computed(() => String(route.params.id ?? ''));

const result = computed(() =>
  analysisStore.results.find((item) => item.id === resultId.value),
);

const formattedDate = computed(() => {
  if (!result.value) return '';
  return new Date(result.value.createdAt).toLocaleDateString();
});

const goMy = () => {
  router.push('/my');
};
</script>

<style scoped>
.summary-card {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
}

.summary-card h2 {
  margin: 0 0 6px;
  font-size: 20px;
}

.result-card {
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
}

.result-card h3 {
  margin: 0 0 8px;
  font-size: 14px;
}

.result-card p {
  margin: 0;
  color: var(--text);
}
</style>
