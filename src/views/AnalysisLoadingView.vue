<template>
  <AppLayout title="로딩" :showTabs="true">
    <div class="loading">⏳</div>
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
  setTimeout(() => {
    analysisStore.finalizeResult();
    router.push('/analysis/result');
  }, 1200);
});
</script>

<style scoped>
.loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}
</style>
