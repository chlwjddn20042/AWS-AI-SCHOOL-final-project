<template>
  <AppLayout>
    <template #header>
      <AppHeader title="기본 정보" :showBack="true" backTo="/analysis/start" />
    </template>

    <form class="stack" @submit.prevent="goNext">
      <InputField label="이름" v-model="form.name" />
      <InputField label="나이" v-model="form.age" type="number" />

      <div class="field">
        <span class="label">성별</span>
        <div class="toggle-group">
          <button
            type="button"
            class="toggle"
            :class="{ active: form.gender === '남' }"
            @click="form.gender = '남'"
          >
            남
          </button>
          <button
            type="button"
            class="toggle"
            :class="{ active: form.gender === '여' }"
            @click="form.gender = '여'"
          >
            여
          </button>
        </div>
      </div>

      <InputField label="취미" v-model="form.hobby" />
      <label class="field">
        <span class="label">수면 패턴</span>
        <select v-model="form.sleepPattern" class="select">
          <option value="">선택</option>
          <option value="규칙적">규칙적</option>
          <option value="불규칙">불규칙</option>
          <option value="야행성">야행성</option>
        </select>
      </label>

      <div class="field">
        <span class="label">운동 여부</span>
        <div class="toggle-group">
          <button
            type="button"
            class="toggle"
            :class="{ active: form.exercise === '예' }"
            @click="form.exercise = '예'"
          >
            O
          </button>
          <button
            type="button"
            class="toggle"
            :class="{ active: form.exercise === '아니오' }"
            @click="form.exercise = '아니오'"
          >
            X
          </button>
        </div>
      </div>

      <label v-if="form.exercise === '예'" class="field">
        <span class="label">1주 운동 횟수 (1~7)</span>
        <select v-model="form.exerciseFrequency" class="select">
          <option value="">선택</option>
          <option v-for="n in 7" :key="n" :value="String(n)">{{ n }}</option>
        </select>
      </label>

      <div v-if="form.exercise === '예'" class="field">
        <span class="label">운동 종류</span>
        <div class="toggle-group">
          <button
            type="button"
            class="toggle"
            :class="{ active: form.exerciseType === '유산소' }"
            @click="form.exerciseType = '유산소'"
          >
            유산소
          </button>
          <button
            type="button"
            class="toggle"
            :class="{ active: form.exerciseType === '무산소' }"
            @click="form.exerciseType = '무산소'"
          >
            무산소
          </button>
          <button
            type="button"
            class="toggle"
            :class="{ active: form.exerciseType === '둘 다' }"
            @click="form.exerciseType = '둘 다'"
          >
            둘 다
          </button>
        </div>
      </div>

      <InputField label="반려동물 종류" v-model="form.petType" />
      <InputField label="MBTI" v-model="form.mbti" />

      <label class="field">
        <span class="label">1주당 외침 횟수</span>
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
  if (form.exercise !== '예') {
    form.exerciseFrequency = '';
    form.exerciseType = '';
  }
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

.toggle-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.toggle {
  flex: 1;
  min-width: 72px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 13px;
  color: var(--text);
}

.toggle.active {
  border-color: var(--text);
  background: var(--surface-muted);
  font-weight: 600;
}
</style>
