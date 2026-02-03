<template>
  <AppLayout>
    <template #header>
      <AppHeader title="성향 분석 입력" :showBack="true" :onBack="handleBack" />
    </template>

    <div class="survey">
      <div class="progress">
        <span>{{ step }} / 5</span>
        <div class="bar">
          <div class="fill" :style="{ width: `${(step / 5) * 100}%` }"></div>
        </div>
      </div>

      <div class="question-list">
        <div v-for="question in currentQuestions" :key="question.index" class="question">
          <p class="question-text">문항 {{ question.index + 1 }}: 임시 질문 텍스트</p>
          <div class="likert">
            <label v-for="value in 5" :key="value" class="likert-option">
              <input
                type="radio"
                :name="`q-${question.index}`"
                :value="value"
                :checked="answers[question.index] === value"
                @change="setAnswer(question.index, value)"
              />
              <span>{{ value }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="ghost" type="button" :disabled="step === 1" @click="prevStep">
          이전
        </button>
        <PrimaryButton type="button" @click="nextStep">
          {{ step === 5 ? '완료' : '다음' }}
        </PrimaryButton>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { useAnalysisStore } from '../stores/analysisStore';

const router = useRouter();
const analysisStore = useAnalysisStore();
const step = ref(1);

const questions = Array.from({ length: 50 }, (_, index) => ({ index }));

const answers = computed(() => analysisStore.surveyAnswers);

const currentQuestions = computed(() => {
  const start = (step.value - 1) * 10;
  return questions.slice(start, start + 10);
});

const setAnswer = (index: number, value: number) => {
  analysisStore.updateSurvey(index, value);
};

const nextStep = () => {
  if (step.value < 5) {
    step.value += 1;
  } else {
    router.push('/analysis/loading');
  }
};

const prevStep = () => {
  if (step.value > 1) {
    step.value -= 1;
  }
};

const handleBack = () => {
  if (step.value > 1) {
    step.value -= 1;
    return;
  }
  router.push('/analysis/youtube');
};
</script>

<style scoped>
.survey {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.progress {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}

.bar {
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: var(--surface-muted);
  overflow: hidden;
}

.fill {
  height: 100%;
  background: var(--text);
}

.question-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 55vh;
  overflow-y: auto;
  padding-right: 4px;
}

.question {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-text {
  margin: 0;
  font-size: 14px;
}

.likert {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
}

.likert-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px 0;
  border-radius: 8px;
  border: 1px solid var(--border);
  font-size: 12px;
}

.likert-option input {
  margin: 0;
}

.actions {
  display: flex;
  gap: 10px;
}

.ghost {
  flex: 1;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 12px;
  padding: 12px 16px;
}

.ghost:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
