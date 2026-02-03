<template>
  <AppLayout title="취향 가져오기" :showTabs="false" contentWidth="narrow">
    <div class="section">
      <button class="secondary" type="button" @click="loadTaste">가져오기</button>
      <div class="info-card">
        <h3>채널</h3>
        <p v-if="!taste.channels.length" class="muted">아직 가져온 데이터가 없습니다.</p>
        <div v-else class="tag-list">
          <span v-for="item in taste.channels" :key="item" class="tag">{{ item }}</span>
        </div>
      </div>
      <div class="info-card">
        <h3>키워드</h3>
        <p v-if="!taste.keywords.length" class="muted">아직 가져온 데이터가 없습니다.</p>
        <div v-else class="tag-list">
          <span v-for="item in taste.keywords" :key="item" class="tag">{{ item }}</span>
        </div>
      </div>
      <PrimaryButton type="button" @click="goSurvey">다음</PrimaryButton>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { useAnalysisStore } from '../stores/analysisStore';
import { analysisService } from '../services/analysisService';

const router = useRouter();
const analysisStore = useAnalysisStore();

const taste = computed(() => analysisStore.youtubeTaste);

const loadTaste = () => {
  analysisStore.setYoutubeTaste(analysisService.mockYoutubeTaste());
};

const goSurvey = () => {
  router.push('/analysis/survey');
};
</script>

<style scoped>
.secondary {
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-weight: 600;
}

.info-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  background: var(--surface);
}

.info-card h3 {
  margin: 0 0 8px;
  font-size: 14px;
}
</style>
