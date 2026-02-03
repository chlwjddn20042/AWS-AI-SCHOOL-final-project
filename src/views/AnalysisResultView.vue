<template>
  <AppLayout title="결과" :showTabs="true">
    <BaseCard>
      <div class="result">
        <div class="avatar">★</div>
        <div>
          <p class="summary">{{ result?.summary }}</p>
          <span class="muted">{{ result?.character }}</span>
        </div>
      </div>
    </BaseCard>

    <div class="grid">
      <ListItem>성향 분석</ListItem>
      <ListItem>취향 분석</ListItem>
      <ListItem @click="goCoaching" class="clickable">행동 코칭</ListItem>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseCard from '../components/BaseCard.vue';
import ListItem from '../components/ListItem.vue';
import { useAnalysisStore } from '../stores/analysisStore';

const router = useRouter();
const analysisStore = useAnalysisStore();

onMounted(() => {
  if (!analysisStore.currentResult) {
    analysisStore.finalizeResult();
  }
});

const result = computed(() => analysisStore.currentResult);

const goCoaching = () => {
  router.push('/coaching');
};
</script>

<style scoped>
.result {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.summary {
  margin: 0 0 6px;
  font-weight: 600;
}

.clickable {
  cursor: pointer;
}
</style>
