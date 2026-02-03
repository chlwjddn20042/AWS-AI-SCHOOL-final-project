<template>
  <AppLayout title="마이" :showTabs="true">
    <section class="section">
      <h3>성향분석 히스토리</h3>
      <BaseCard v-for="result in results" :key="result.id">
        <p class="summary">{{ result.summary }}</p>
        <span class="muted">{{ formatDate(result.createdAt) }}</span>
      </BaseCard>
      <p v-if="results.length === 0" class="muted">기록 없음</p>
    </section>
    <PrimaryButton @click="goAnalysis">새 성향 분석</PrimaryButton>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseCard from '../components/BaseCard.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { useAnalysisStore } from '../stores/analysisStore';

const router = useRouter();
const analysisStore = useAnalysisStore();

const results = computed(() => analysisStore.results);

const formatDate = (value: string) => new Date(value).toLocaleDateString('ko-KR');

const goAnalysis = () => {
  router.push('/analysis');
};
</script>

<style scoped>
.summary {
  margin: 0 0 6px;
  font-weight: 600;
}
</style>
