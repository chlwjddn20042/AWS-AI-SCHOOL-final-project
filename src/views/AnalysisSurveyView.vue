<template>
  <AppLayout title="성향 분석 입력" :showTabs="false" contentWidth="wide">
    <div class="survey">
      <div class="survey-header">
        <div class="survey-title">
          <h2>성향 분석 입력</h2>
          <span class="muted">{{ currentStep }}/{{ totalSteps }}</span>
        </div>
        <div class="progress">
          <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <div class="survey-body">
        <div v-for="item in pageQuestions" :key="item.index" class="question">
          <span class="question-text">{{ item.text }}</span>
          <div class="radio-row">
            <label v-for="score in scores" :key="score" class="choice">
              <input
                type="radio"
                :name="`q-${item.index}`"
                :value="score"
                :checked="answers[item.index] === score"
                @change="updateAnswer(item.index, score)"
              />
              {{ score }}
            </label>
          </div>
        </div>
      </div>

      <div class="survey-actions">
        <button class="secondary" type="button" :disabled="currentStep === 1" @click="prevStep">
          이전
        </button>
        <button class="primary" type="button" @click="nextStep">
          {{ currentStep === totalSteps ? '완료' : '다음' }}
        </button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import { useAnalysisStore } from '../stores/analysisStore';

const router = useRouter();
const analysisStore = useAnalysisStore();

const totalSteps = 5;
const questionsPerPage = 10;
const currentStep = ref(1);
const scores = [1, 2, 3, 4, 5];

const questions = Array.from({ length: 50 }, (_, index) => ({
  index,
  text: `문항 ${index + 1}: 임시 질문 텍스트`,
}));

const answers = computed(() => analysisStore.surveyAnswers);

const pageQuestions = computed(() => {
  const start = (currentStep.value - 1) * questionsPerPage;
  return questions.slice(start, start + questionsPerPage);
});

const progressPercent = computed(() => (currentStep.value / totalSteps) * 100);

const updateAnswer = (index: number, score: number) => {
  analysisStore.updateSurvey(index, score);
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value += 1;
    return;
  }
  router.push('/analysis/loading');
};
</script>

<style scoped>
.survey {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.survey-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.survey-title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.survey-title h2 {
  margin: 0;
  font-size: 18px;
}

.progress {
  height: 6px;
  border-radius: 999px;
  background: var(--surface-muted);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--primary);
}

.survey-body {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 6px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-text {
  font-size: 14px;
}

.choice {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-right: 10px;
}

.survey-actions {
  display: flex;
  gap: 10px;
}

.secondary,
.primary {
  flex: 1;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
}

.primary {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
