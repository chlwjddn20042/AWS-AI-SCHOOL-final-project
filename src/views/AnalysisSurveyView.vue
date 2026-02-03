<template>
  <AppLayout title="설문" :showTabs="true">
    <form class="section" @submit.prevent="goLoading">
      <div v-for="item in questions" :key="item.id" class="section">
        <span>{{ item.text }}</span>
        <div class="radio-row">
          <label v-for="score in scores" :key="score">
            <input
              type="radio"
              :name="item.id"
              :value="score"
              :checked="answers[item.id] === score"
              @change="updateAnswer(item.id, score)"
            />
            {{ score }}
          </label>
        </div>
      </div>
      <PrimaryButton type="submit">완료</PrimaryButton>
    </form>
  </AppLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { useAnalysisStore } from '../stores/analysisStore';

const router = useRouter();
const analysisStore = useAnalysisStore();

const scores = [1, 2, 3, 4, 5];
const questions = [
  { id: 'q1', text: '새로운 자극이 필요해요' },
  { id: 'q2', text: '규칙을 지키는 편이에요' },
  { id: 'q3', text: '감정을 자주 기록해요' },
  { id: 'q4', text: '혼자 있는 시간이 좋아요' },
  { id: 'q5', text: '즉흥적인 선택을 해요' },
  { id: 'q6', text: '루틴이 마음을 편하게 해요' },
  { id: 'q7', text: '사람들과 대화가 즐거워요' },
  { id: 'q8', text: '운동이 에너지를 줘요' },
  { id: 'q9', text: '도전을 즐겨요' },
  { id: 'q10', text: '새로운 목표를 세워요' },
];

const answers = reactive({ ...analysisStore.surveyAnswers });

const updateAnswer = (id: string, score: number) => {
  answers[id] = score;
  analysisStore.updateSurvey(id, score);
};

const goLoading = () => {
  router.push('/analysis/loading');
};
</script>
