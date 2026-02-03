<template>
  <AppLayout contentWidth="narrow">
    <template #header>
      <AppHeader title="기본 정보" :showBack="true" />
    </template>

    <form class="stack" @submit.prevent="goNext">
      <InputField label="이름" v-model="form.name" />
      <InputField label="나이" v-model="form.age" type="number" />

      <label class="field">
        <span class="label">성별</span>
        <select v-model="form.gender" class="select">
          <option value="">선택</option>
          <option value="남">남</option>
          <option value="여">여</option>
        </select>
      </label>

      <InputField label="취미" v-model="form.hobby" />
      <InputField label="수면 패턴" v-model="form.sleepPattern" />

      <label class="field">
        <span class="label">운동 여부</span>
        <select v-model="form.exercise" class="select">
          <option value="">선택</option>
          <option value="예">예</option>
          <option value="아니오">아니오</option>
        </select>
      </label>

      <label class="field">
        <span class="label">1주 운동 횟수 (1~7)</span>
        <select v-model="form.exerciseFrequency" class="select">
          <option value="">선택</option>
          <option v-for="n in 7" :key="n" :value="String(n)">{{ n }}</option>
        </select>
      </label>

      <label class="field">
        <span class="label">운동 종류</span>
        <select v-model="form.exerciseType" class="select">
          <option value="">선택</option>
          <option value="유산소">유산소</option>
          <option value="무산소">무산소</option>
          <option value="둘 다">둘 다</option>
        </select>
      </label>

      <InputField label="반려동물 종류" v-model="form.petType" />
      <InputField label="MBTI" v-model="form.mbti" />

      <label class="field">
        <span class="label">1주 외출 횟수 (1~7)</span>
        <select v-model="form.outingFrequency" class="select">
          <option value="">선택</option>
          <option v-for="n in 7" :key="n" :value="String(n)">{{ n }}</option>
        </select>
      </label>

      <label class="field">
        <span class="label">말투(대화 음성 파일. 최대 3분)</span>
        <button class="upload" type="button" disabled>업로드</button>
      </label>

      <label class="field">
        <span class="label">자신을 표현할 수 있는 문서</span>
        <button class="upload" type="button" disabled>업로드</button>
      </label>

      <PrimaryButton type="submit">다음</PrimaryButton>
    </form>
  </AppLayout>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import InputField from '../components/InputField.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { useAnalysisStore } from '../stores/analysisStore';

const router = useRouter();
const analysisStore = useAnalysisStore();

const form = reactive({ ...analysisStore.input });

watch(
  form,
  () => {
    analysisStore.updateInput({ ...form });
  },
  { deep: true },
);

const goNext = () => {
  analysisStore.updateInput({ ...form });
  router.push('/analysis/youtube');
};
</script>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
}

.label {
  color: var(--muted);
}

.select {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
}

.upload {
  border: 1px solid var(--border);
  background: var(--surface-muted);
  color: var(--muted);
  padding: 10px 12px;
  border-radius: 12px;
  text-align: left;
}

.upload:disabled {
  cursor: not-allowed;
}
</style>
